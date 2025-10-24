---
title: "FDB + MinIO: Metadata (Java)"
date: "2025-09-29"
category: "Engineering"
author: "Fernando Martínez"
cover: "/images/seaweedfs.webp"
excerpt: "We'll build a small HTTP service that registers and retrieves blob metadata stored in MinIO."
---

We’ll build a small **HTTP service** that registers and retrieves **blob metadata** stored in **MinIO**.

The raw bytes live in MinIO; **FoundationDB** stores the **metadata catalog** — owner/tenant, bucket, object key, size, hash, timestamps, tags, etc.

Goal: a minimal MVP to later iterate toward **advanced idempotency**, **presigned URLs**, and **composition with other SNAPs**, etc.

---

## 1. Local Infrastructure (docker-compose)

We’ll create a `docker-compose.yml` for our three base services.

```yaml
version: "3.8"

services:
  fdb:
    image: foundationdb/foundationdb:7.4.0
    container_name: fdb
    command: >
      fdbserver
      --listen_address 0.0.0.0:4500
      --public_address fdb:4500
      --cluster_file /var/fdb/fdb.cluster
      --datadir /var/fdb/data
      --logdir /var/fdb/logs
    volumes:
      - fdb-data:/var/fdb/data
      - ./fdb.cluster:/var/fdb/fdb.cluster:ro
    ports:
      - "4500:4500"
    restart: unless-stopped

  minio:
    image: minio/minio
    container_name: minio
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: minio12345
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio-data:/data
    restart: unless-stopped

  app:
    build:
      context: .
      dockerfile: docker/Dockerfile
    container_name: meta-app
    depends_on:
      - fdb
      - minio
    environment:
      MINIO_ENDPOINT: http://minio:9000
      MINIO_ACCESS_KEY: minio
      MINIO_SECRET_KEY: minio12345
      FDB_CLUSTER_FILE: /etc/foundationdb/fdb.cluster
    volumes:
      - ./fdb.cluster:/etc/foundationdb/fdb.cluster:ro
    ports:
      - "8080:8080"
    restart: unless-stopped

volumes:
  fdb-data:
  minio-data:


```

To obtain the cluster file for the Java client:

```bash
docker cp fdb:/var/fdb/fdb.cluster ./fdb.cluster

```

---

## 2. Key Schema in FDB (Tuple Layer)

**Root:** `("b")`

```
("b", tenant, objId, "meta")  -> JSON { bucket, object, size, sha256, contentType, etag, createdAt, tags: {k:v} }
("b", tenant, objId, "state") -> BYTE (0=pending, 1=committed)

```

For the MVP, we’ll only write `meta` and `state=1`.

Later, you can add prefix indexes, tags, or owner-based lookups.

**Conventions**

- `tenant`: short string (e.g. `"acme"`)
- `objId`: logical identifier within tenant (UUIDv7 recommended)

---

## 3. Minimal API (Javalin)

### **PUT /o/{tenant}/{id}**

Registers or updates metadata for an existing MinIO object.

**Body JSON:**

```json
{
  "bucket": "metas",
  "object": "imgs/networking.png",
  "contentType": "image/png",
  "size": 12345,
  "sha256": "...",
  "tags": { "owner": "you or me", "kind": "img" }
}

```

Validates object existence in MinIO (via `statObject`)

→ stores `meta + state=1` in FDB (transaction).

Idempotent per `(tenant, id)`.

---

### **GET /o/{tenant}/{id}**

Returns JSON metadata.

### **HEAD /o/{tenant}/{id}**

Returns 200 if exists, 404 if not.

### **GET /o/{tenant}?prefix=abc**

Lists object IDs starting with prefix `abc` (range scan).

MVP: fixed limit (e.g. 100).

### **DELETE /o/{tenant}/{id}?deleteBlob=true|false**

Deletes metadata; if `deleteBlob=true`, also attempts MinIO deletion.

---

## 4. Java Project (Gradle)

```groovy
plugins {
    id 'java'
    id 'application'
    id 'com.github.johnrengelman.shadow' version '8.1.1'
}

group = 'org.fmartinez'
version = '1.0-SNAPSHOT'

repositories { mavenCentral() }

java { toolchain { languageVersion = JavaLanguageVersion.of(21) } } // 21 LTS

dependencies {
    implementation "org.foundationdb:fdb-java:7.4.3"
    implementation "io.minio:minio:8.6.0"
    implementation "io.javalin:javalin:6.7.0"
    implementation "com.fasterxml.jackson.core:jackson-databind:2.20.0"
    runtimeOnly   "org.slf4j:slf4j-simple:2.0.16"

    testImplementation platform('org.junit:junit-bom:5.10.0')
    testImplementation 'org.junit.jupiter:junit-jupiter'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

application {
    mainClass = 'Server'
}

tasks.test { useJUnitPlatform() }

```

Repository: https://github.com/fmartinez09/metadata

---

## 5. Containerization (Docker)

Why?

The **Java binding** requires the native **FoundationDB client** installed on the host (or in PATH/LD_LIBRARY_PATH).

On Windows, it tries to load `fdb_java.dll` (JNI) from the JAR and then `fdb_c.dll` from the system.

As of 7.4.x, the published Maven JAR **does not include `fdb_java.dll` for Windows**, so we must run it in **Linux** (Docker image with JDK).

We’ll create a **multi-stage Dockerfile** using **JDK 24** + **foundationdb-clients 7.4**, connecting to FDB and MinIO over Docker network (avoiding DLL headaches).

```docker
# --- Build stage: compile and create fat-jar ---
FROM gradle:8.9-jdk21 AS build
WORKDIR /app
COPY . ./
RUN gradle shadowJar -x test

# --- FDB stage: extract libfdb_c.so ---
FROM foundationdb/foundationdb:7.4.0 AS fdb

# --- Runtime stage: JRE + libfdb_c.so copied ---
FROM eclipse-temurin:21-jre

COPY --from=fdb /usr/lib/libfdb_c.so /usr/lib/libfdb_c.so

ENV MINIO_ENDPOINT=http://minio:9000 \
    MINIO_ACCESS_KEY=minio \
    MINIO_SECRET_KEY=minio12345 \
    FDB_CLUSTER_FILE=/etc/foundationdb/fdb.cluster

COPY --from=build /app/build/libs/*-all.jar /app/app.jar
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && mkdir -p /etc/foundationdb

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]

```

---

### `entrypoint.sh`

This script automates startup tasks. It ensures that the Java app has access to the `fdb.cluster` file.

Steps:

1. Check if `/etc/foundationdb/fdb.cluster` exists.
2. If not, create it with the line `docker:docker@fdb:4500`.
3. Print its contents.
4. Launch the app (`java -jar /app/app.jar`).

```bash
#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "${FDB_CLUSTER_FILE}" ]; then
  echo "docker:docker@fdb:4500" > "${FDB_CLUSTER_FILE}"
fi

echo "Using FDB_CLUSTER_FILE at ${FDB_CLUSTER_FILE}:"
cat "${FDB_CLUSTER_FILE}" || true

echo "Starting app..."
exec java -jar /app/app.jar

```

⚠️ **Notes:**

- Requires the `FDB_CLUSTER_FILE` variable (because of `set -u`).
- Doesn’t overwrite an existing file.
- The JAR must be self-contained (`ShadowJar` or Spring Boot fat-jar).

---

### Directory Layout

```
metadata/                 # Gradle project root
├── build.gradle
├── settings.gradle
├── src/
│   └── main/java/...      # Server.java, FdbStore.java, etc.
├── fdb.cluster            # shared cluster file (1 line: docker:docker@fdb:4500)
├── docker/
│   ├── Dockerfile
│   ├── entrypoint.sh
├── docker-compose.yml

```

---

## 6. Build the Image (generates fat-jar in build stage)

Create `fdb.cluster`:

**PowerShell:**

```powershell
"docker:docker@fdb:4500" | Out-File -NoNewline -Encoding ascii .\fdb.cluster

```

**Bash:**

```bash
echo docker:docker@fdb:4500 > fdb.cluster

```

Build:

```bash
docker compose build

```

Run:

```bash
docker compose up -d

```

Check app logs (confirm cluster file loaded):

```bash
docker compose logs -f app

```

---

## 7. Initialize the FDB Database (first time only)

FoundationDB starts but the cluster is initially “unconfigured”.

```bash
docker compose exec fdb fdbcli --cluster_file /var/fdb/fdb.cluster --exec "configure new single ssd"
docker compose exec fdb fdbcli --cluster_file /var/fdb/fdb.cluster --exec "status minimal"

```

Once you see **Database available**, you’re ready.

---

## 8. Create the MinIO Bucket (once)

The service validates object existence in MinIO, so we need a bucket.

You can create it via the web console (`http://localhost:9001`, user: `minio`, pass: `minio12345`)

or using the **mc** client:

```bash
mc alias set local http://localhost:9000 minio minio12345
mc mb local/metadata
mc ls local

```

---

## 9. Register Metadata in FDB

Access FDB:

```bash
docker compose exec fdb fdbcli --cluster_file /var/fdb/fdb.cluster

```

To inspect key ranges:

```bash
getrangekeys "" \xff

```

---

### PUT

```powershell
$body = @{
  bucket="metadata";
  object="networking.jpg";
  size=(Get-Item .\networking.jpg).Length;
  sha256="DF47E064EFC7A9ABC31E3E556BC0E43CF933738D4C843D9F41139194F28638EC";
  contentType="image/jpeg";
  tags=@{ owner="fernando"; tipo="foto" }
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Method PUT -Uri "http://localhost:8080/o/tenant1/foto-001" -ContentType "application/json" -Body $body

```

### GET (read metadata)

```powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:8080/o/tenant1/foto-001"

```

### HEAD (check existence)

```powershell
$resp = Invoke-WebRequest -Method HEAD -Uri "http://localhost:8080/o/tenant1/foto-001"; $resp.StatusCode  # 200 or 404

```

### LIST (IDs per tenant)

```powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:8080/o/tenant1"

```

### DELETE (metadata only)

```powershell
Invoke-RestMethod -Method DELETE -Uri "http://localhost:8080/o/tenant1/foto-001" -SkipHttpErrorCheck

```

### DELETE (metadata + blob in MinIO)

```powershell
Invoke-RestMethod -Method DELETE -Uri "http://localhost:8080/o/tenant1/foto-001?deleteBlob=true" -SkipHttpErrorCheck

```

---

✅ **Done. You’re working with the most powerful database on the market.**

To clean everything up:

```bash
docker compose down -v

```
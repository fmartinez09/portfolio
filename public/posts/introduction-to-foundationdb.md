# Introduction to FoundationDB

_September 27, 2025 · category: Engineering_

---

Currently, we can run **FoundationDB** from the official Docker mirror published by CI: https://hub.docker.com/r/foundationdb/foundationdb

(There’s a lot of other interesting stuff there, too.)

```bash
docker run -d foundationdb/foundationdb
```

This image comes with many default configurations that save time. Then, if we want to access the container:

```bash
docker exec -it fdb bash
```

Now run:

```bash
fdbcli
```

to open the FoundationDB command-line interface.

You can explicitly point to the cluster file inside the container:

```bash
fdbcli -C /var/fdb/fdb.cluster
```

Check the **status** and see whether it already comes with a database or not — it might say *unavailable*.

> Note: The cluster file is how clients and servers discover the cluster.
> 
> 
> By default, it lives in `/etc/foundationdb/fdb.cluster` on Linux; inside the container it’s usually at `/var/fdb/fdb.cluster`.
> 
> Copying that file is *how* you add new clients or hosts to the cluster — it should not be manually edited except for coordination purposes.
> 

---

## Creating a Database

If there’s no database, refer to the documentation:

[**(Re)creating a database**](https://apple.github.io/foundationdb/administration.html#re-creating-a-database)

> Installing FoundationDB packages usually creates a new database automatically.
> 
> 
> However, if a cluster does not have a database configured (e.g., installation failed, data was deleted, or packages weren’t used),
> 
> you can manually create it with `configure new` in `fdbcli`:
> 

```bash
configure new single memory
```

This command creates a new database ready to use.

Note that package installations — and Docker mirrors — may not include a pre-created database, so it’s best to do it yourself since the default data is usually just for testing.

---

## Checking Contents

You can’t query how many databases or tables exist, like `SELECT * FROM table-name`,

because **FoundationDB is not a relational database** — it has **no tables**.

It’s an **Ordered Key-Value Store (OKVS)**.

All data lives in a single global key-value namespace.

In `fdbcli`:

```bash
getrangekeys "" \xff
```

This iterates from `""` up to `"\xff"` — the typical upper bound of the user keyspace.

Optionally, you can append `LIMIT 50`.

> Note: When querying in fdbcli, use double quotes ("") instead of single quotes.
> 
> 
> Single quotes are not special characters and will not work properly.
> 

---

## FoundationDB Philosophy

FoundationDB doesn’t come with ready-made tables or a dashboard admin panel.

It’s **pure infrastructure** — think of it like a kernel.

If you don’t mount anything on top, it doesn’t do much beyond handling `get` and `set` operations.

The beauty lies in the fact that from here, you can choose *what layer to build above it* — even entire distributed systems.

---

## Comparison Matrix

(placeholder for blog table or chart) [https://en.wikipedia.org/wiki/Ordered_key–value_store](https://en.wikipedia.org/wiki/Ordered_key%E2%80%93value_store)

---

### Pure OKVS (LMDB, RocksDB, LevelDB, Kyoto, BerkeleyDB, WiredTiger, etc.)

- Embedded libraries designed to run **inside a single process**.
- Provide basic operations: `put`, `get`, `range`, and sometimes **local transactions**.
- Example use cases:
    - LevelDB in Chrome for caching
    - RocksDB in Kafka Streams
    - LMDB in OpenLDAP

---

### Distributed OKVS (FoundationDB, TiKV)

- Not just libraries — full **clusters** with **consensus, replication, sharding, and failover**.
- Expose the same KV API but guarantee **cluster-wide ACID transactions**.
- **FoundationDB** uses a **deterministic design** with a **centralized transaction log** for serializing commits.
- **TiKV** implements the **Spanner/Percolator model** (MVCC + Raft).

---

### Higher-Level Distributed Databases

*(Cassandra, Spanner, Aurora, Bigtable, etc.)*

- No longer expose raw KV APIs — they provide **full SQL/NoSQL services**.
- Some (Aurora, PostgreSQL, MySQL, Oracle, Percona, etc.) are traditional **RDBMS** with replication mechanisms.
- Others (Cassandra, Bigtable, MongoDB, Redis) are **NoSQL** systems with different consistency models.
- FoundationDB sits *below* these — it doesn’t offer SQL queries, but provides the **transactional substrate** you could build one on top of (e.g., **Record Layer**).

---

### Collateral Infrastructure

*(BookKeeper, S3/MinIO, ElasticSearch, MeiliSearch)*

- Not core databases but **specialized components**:
    - Durable logs
    - Object storage
    - Search engines
- Yet they all share the same underlying pattern: **data persistence with varying APIs and consistency models**.

---

### Value-Added Layers

*(Record Layer, DeepSeek 3FS, Snowflake FrostDB, Adobe Identity Graph, eBay NuGraph — all built on FDB, though rarely acknowledged)*

- Use a **transactional KV substrate** as a reliable foundation to implement **high-level features**:
    - SQL engines
    - Document stores
    - Streams
    - Machine learning datasets
- The clearest example is **FoundationDB + Record Layer** — Apple built **CloudKit** entirely on top of it.

---

## Final Note

New technologies keep emerging — **TigrisData**, **Neon**, **FaRM**, **FastACS**, **Yugabyte**, **ScyllaDB**, **TigerBeetle**…

FoundationDB is **not NoSQL**, **not NewSQL** —

it is **the distributed storage kernel**.
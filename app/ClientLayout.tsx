"use client";

import Providers from "./providers";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import useLenis from "@/hooks/useLenis";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();

  return (
    <Providers>
      <Sidebar />
      <div>{children}</div>
      <Footer />
    </Providers>
  );
}

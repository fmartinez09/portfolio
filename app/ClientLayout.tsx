"use client";

import Providers from "./providers";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import useLenis from "@/hooks/useLenis";
import MobileTabbar from "@/components/MobileTabbar";
import BackFab from "@/components/BackFab";
import ThemeToggle from "@/components/ThemeToggle";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useLenis();

  return (
    <Providers>
      <Sidebar />

      {/* Un único wrapper; reserva espacio para la tab bar */}
      <div className="min-h-dvh pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
        <BackFab />
        <ThemeToggle className="lg:hidden fixed bottom-20 right-4 z-[70]" />
        {children}
      </div>

      <Footer />
      <MobileTabbar />
    </Providers>
  );
}

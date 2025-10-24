import "./globals.css";
import Providers from "./providers";
import Sidebar from "@/components/Sidebar";

export const metadata = { title: "Fernando · Portfolio" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1) Asegura el modo oscuro con className="dark" (o deja que tu ThemeProvider lo haga)
    <html lang="es" className="dark"> 
      {/* 2) Quita bg/text fijos; deja que globals.css pinte con bg-background/text-foreground */}
      <body className="min-h-dvh antialiased">
        <Providers>
          <Sidebar />
          <div className="md:pl-20">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
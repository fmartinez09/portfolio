import './globals.css'
import Providers from './providers'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export const metadata = { title: 'Fernando · Portfolio' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <Providers>
          <Sidebar />
          {/* Keep main content centered like the footer — remove the left padding that pushed content to the right */}
          <div>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
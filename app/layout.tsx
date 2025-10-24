import './globals.css'
import Providers from './providers'
import Sidebar from '@/components/Sidebar'

export const metadata = { title: 'Fernando · Portfolio' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <Providers>
          <Sidebar />
          <div className="md:pl-20">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
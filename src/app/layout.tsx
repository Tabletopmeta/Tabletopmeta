import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TabletopMeta',
  description: 'Discover and share Warhammer army lists.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-[#0a0e17] text-white ${inter.className}`}>
        {/* Kopfzeile */}
        <header className="flex justify-between items-center px-6 py-4 bg-[#121926] shadow">
          <Link href="/" className="text-xl font-bold text-white hover:underline">
            TabletopMeta – Home
          </Link>
          <div className="space-x-6 text-sm">
            <Link href="/40k" className="hover:underline text-white hover:text-gray-300">
              Warhammer 40k
            </Link>
            <Link href="/aos" className="hover:underline text-white hover:text-gray-300">
              Age of Sigmar
            </Link>
            <Link href="/submit-list" className="hover:underline text-white hover:text-gray-300">
              Submit List
            </Link>
          </div>
        </header>

        {/* Hauptinhalt */}
        <main className="min-h-screen bg-[#0a0e17]">{children}</main>

        {/* Fußzeile */}
        <footer className="bg-[#121926] text-white text-xs text-center mt-10 p-4 border-t border-gray-800">
          <div className="space-x-4">
            <Link href="/impressum" className="hover:underline">
              Impressum
            </Link>
            <Link href="/disclaimer" className="hover:underline">
              Disclaimer
            </Link>
          </div>
        </footer>
      </body>
    </html>
  )
}

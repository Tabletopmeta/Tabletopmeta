'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e17] text-white px-4 sm:px-6 md:px-12">
      {/* Auswahl Spielsystem */}
      <div className="text-center mt-10 mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Choose your game system:
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/40k"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg text-center"
          >
            Warhammer 40k
          </Link>
          <Link
            href="/aos"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded text-lg text-center"
          >
            Age of Sigmar
          </Link>
        </div>
      </div>

      {/* YouTube Video-Empfehlungen */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-4">
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded"
            src="https://www.youtube.com/embed/cAkNp6uc6ds"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded"
            src="https://www.youtube.com/embed/Ln6r-WBAw1Y"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded"
            src="https://www.youtube.com/embed/JKGkKXplRzs"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  )
}

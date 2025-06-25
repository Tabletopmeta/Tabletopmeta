export default function DisclaimerPage() {
  return (
    <main className="p-4 md:p-8 text-white bg-[#0a0e17] min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Disclaimer</h1>
      <div className="space-y-4 max-w-3xl">
        <p>
          This website is an unofficial fan project not affiliated with or endorsed by Games Workshop.
        </p>
        <p>
          All names, logos, and images associated with Warhammer 40,000 and Age of Sigmar are trademarks of Games Workshop.
        </p>
        <p>
          No copyrighted materials, official rules, or proprietary digital content are used or stored on this platform.
        </p>
        <p>
          For official Warhammer content, please visit:{' '}
          <a
            href="https://www.warhammer-community.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white text-blue-400"
          >
            warhammer-community.com
          </a>
        </p>
        <p className="italic text-gray-400">
          This site is purely for educational, non-commercial, and community-sharing purposes.
        </p>
      </div>
    </main>
  )
}

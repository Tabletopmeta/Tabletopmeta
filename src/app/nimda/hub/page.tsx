import Link from 'next/link'

export default function AdminHubPage() {
  return (
    <main className="p-4 md:p-8 text-white bg-[#0a0e17] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Hub</h1>
      <div className="space-y-4 text-center">
        <Link
          href="/nimda/unverified"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white"
        >
          Review Unverified Lists
        </Link>
      </div>
    </main>
  )
}

import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default async function FortyKPage() {
  const { data: factions, error } = await supabase
    .from('factions')
    .select('*')
    .eq('system', '40k')
    .order('name')

  if (error) {
    return <p className="text-red-500 p-4">Error loading data.</p>
  }

  return (
    <main className="min-h-screen bg-[#0a0e17] p-4 md:p-8 text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Factions – Warhammer 40k
      </h1>
      <ul className="flex flex-col gap-4">
        {factions?.map((faction) => (
          <li key={faction.id}>
            <Link
              href={`/40k/${faction.id}`}
              className="block bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg shadow-md text-center md:text-left text-lg md:text-xl"
            >
              {faction.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

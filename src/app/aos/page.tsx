import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default async function AoSPage() {
  const { data: factions, error } = await supabase
    .from('factions')
    .select('*')
    .eq('system', 'aos')
    .order('name')

  if (error) {
    return <p className="text-red-500">Fehler beim Laden: {error.message}</p>
  }

  return (
    <main className="p-4 sm:p-8 text-white bg-[#0a0e17] min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Factions – Age of Sigmar
      </h1>
      <ul className="space-y-4">
        {factions?.map((faction) => (
          <li key={faction.id}>
            <Link
              href={`/aos/${faction.id}`}
              className="block bg-gray-800 hover:bg-gray-700 px-4 py-3 sm:px-6 sm:py-4 rounded-lg shadow-md text-lg sm:text-xl text-center"
            >
              {faction.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

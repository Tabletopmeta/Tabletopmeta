import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default async function FactionPage({ params }: { params: { id: string } }) {
  const { data: faction, error: factionError } = await supabase
    .from('factions')
    .select('*')
    .eq('id', params.id)
    .single()

  const { data: lists, error: listError } = await supabase
    .from('lists')
    .select('*')
    .eq('faction_id', params.id)
    .order('created_at', { ascending: false })

  if (factionError || listError) {
    return <p className="text-red-500 p-4">Error loading data.</p>
  }

  return (
    <main className="p-4 md:p-8 text-white bg-[#0a0e17] min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{faction.name} – Lists</h1>
      <ul className="space-y-4">
        {lists?.map((list) => (
          <li key={list.id}>
            <Link
              href={`/aos/${faction.id}/${list.id}`}
              className="block bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-lg shadow-md"
            >
              <div className="font-semibold text-lg">{list.name}</div>
              <div className="text-sm text-gray-400">
                {list.points}/{list.max_points} Points – {list.country} –{' '}
                {new Date(list.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

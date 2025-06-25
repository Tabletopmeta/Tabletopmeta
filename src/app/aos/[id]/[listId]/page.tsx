import { supabase } from '@/lib/supabaseClient'

interface Props {
  params: {
    id: string
    listId: string
  }
}

export default async function ListDetailPage({ params }: Props) {
  const { data: list, error } = await supabase
    .from('lists')
    .select('*')
    .eq('id', params.listId)
    .single()

  if (error || !list) {
    return <p className="text-red-500 p-4">Error loading list.</p>
  }

  // Formatierung des Datums von ISO auf "02. June 2025"
  const createdAt = new Date(list.created_at)
  const formattedDate = createdAt.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="p-4 md:p-8 text-white bg-[#0a0e17] min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{list.name}</h1>

      <div className="mb-6 space-y-2 text-sm md:text-base text-gray-300">
        <p><strong>Faction:</strong> {params.id}</p>
        <p>
          <strong>Verified:</strong>{' '}
          {list.status === 'geprüft' ? (
            <span className="text-green-500">✔ Yes</span>
          ) : (
            <span className="text-red-500">✗ No</span>
          )}
        </p>
        <p><strong>Points:</strong> {list.points}</p>
        <p><strong>Country:</strong> {list.country}</p>
        <p><strong>Submitted:</strong> {formattedDate}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Description</h2>
          <p className="whitespace-pre-wrap">{list.explanation || 'No description provided.'}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Army List</h2>
          <pre className="whitespace-pre-wrap">{list.army_list || 'No list content provided.'}</pre>
        </div>
      </div>
    </main>
  )
}

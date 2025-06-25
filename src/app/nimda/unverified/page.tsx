'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface List {
  id: string
  name: string
  faction: string
  list: string
  description: string
  points: number
  country: string
  verified: boolean
}

export default function UnverifiedPage() {
  const [lists, setLists] = useState<List[]>([])

  useEffect(() => {
    async function fetchLists() {
      const { data } = await supabase
        .from('lists')
        .select('*')
        .eq('verified', false)
      setLists(data || [])
    }
    fetchLists()
  }, [])

  async function handleVerify(id: string) {
    await supabase.from('lists').update({ verified: true }).eq('id', id)
    setLists((prev) => prev.filter((list) => list.id !== id))
  }

  async function handleDelete(id: string) {
    await supabase.from('lists').delete().eq('id', id)
    setLists((prev) => prev.filter((list) => list.id !== id))
  }

  return (
    <main className="p-4 md:p-8 text-white bg-[#0a0e17] min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Unverified Lists</h1>
      <div className="space-y-6">
        {lists.map((list) => (
          <div key={list.id} className="bg-gray-800 p-4 rounded shadow-md space-y-2">
            <p><strong>Name:</strong> {list.name}</p>
            <p><strong>Faction:</strong> {list.faction}</p>
            <p><strong>Description:</strong> {list.description}</p>
            <p><strong>Points:</strong> {list.points}/2000</p>
            <p><strong>Country:</strong> {list.country}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleVerify(list.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Mark as Verified
              </button>
              <button
                onClick={() => handleDelete(list.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete List
              </button>
            </div>
          </div>
        ))}
        {lists.length === 0 && (
          <p className="text-gray-400">No unverified lists found.</p>
        )}
      </div>
    </main>
  )
}

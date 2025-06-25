'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SubmitListPage() {
  const [system, setSystem] = useState('')
  const [factions, setFactions] = useState<any[]>([])
  const [selectedFaction, setSelectedFaction] = useState('')
  const [name, setName] = useState('')
  const [armyList, setArmyList] = useState('')
  const [explanation, setExplanation] = useState('')
  const [points, setPoints] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    const fetchFactions = async () => {
      if (!system) {
        setFactions([])
        return
      }

      const { data, error } = await supabase
        .from('factions')
        .select('*')
        .eq('system', system)
        .order('name')

      if (error) {
        console.error('Error fetching factions:', error.message)
      } else {
        setFactions(data)
      }
    }

    fetchFactions()
  }, [system])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from('lists').insert([
      {
        faction_id: selectedFaction,
        name: name.trim(),
        army_list: armyList.trim(),
        explanation: explanation.trim(),
        points: Number(points),
        country: country.trim(),
      },
    ])

    if (error) {
      console.error('Submission error:', error.message)
      alert('Failed to submit list.')
    } else {
      window.location.href = '/submit-success'
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 text-white bg-[#0a0e17]">
      <style jsx>{`
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="w-full max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Submit a New List</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Game System</label>
            <select
              value={system}
              onChange={(e) => {
                setSystem(e.target.value)
                setSelectedFaction('')
              }}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            >
              <option value="">-- Select Game System --</option>
              <option value="40k">Warhammer 40k</option>
              <option value="aos">Age of Sigmar</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Faction</label>
            <select
              value={selectedFaction}
              onChange={(e) => setSelectedFaction(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            >
              <option value="">-- Select Faction --</option>
              {factions.map((faction) => (
                <option key={faction.id} value={faction.id}>
                  {faction.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">List Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Army List</label>
            <textarea
              value={armyList}
              onChange={(e) => setArmyList(e.target.value)}
              rows={6}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Description / Notes</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={4}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Points</label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="z. B. 1990 / 2000"
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Submit List
          </button>
        </form>
      </div>
    </main>
  )
}

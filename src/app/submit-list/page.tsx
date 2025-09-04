'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Faction = {
  id: string
  name: string
  system: string
}

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia','Austria',
  'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan',
  'Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi',
  'Cambodia','Cameroon','Canada','Cape Verde','Central African Republic','Chad','Chile','China','Colombia',
  'Comoros','Congo (Republic)','Congo (DRC)','Costa Rica','Côte d’Ivoire','Croatia','Cuba','Cyprus',
  'Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador',
  'Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana',
  'Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland',
  'India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan',
  'Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya',
  'Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta',
  'Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia',
  'Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand',
  'Nicaragua','Niger','Nigeria','North Macedonia','Norway','Oman','Pakistan','Palau','Panama',
  'Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia',
  'Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino',
  'São Tomé and Príncipe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore',
  'Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain',
  'Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand',
  'Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda',
  'Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu',
  'Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
]

export default function SubmitListPage() {
  const [system, setSystem] = useState('')
  const [factions, setFactions] = useState<Faction[]>([])
  const [selectedFaction, setSelectedFaction] = useState('')
  const [name, setName] = useState('')
  const [armyList, setArmyList] = useState('')
  const [explanation, setExplanation] = useState('')
  const [points, setPoints] = useState('')          // keep as string for the input
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
        setFactions(data as Faction[])
      }
    }

    fetchFactions()
  }, [system])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const pts = Number(points)
    if (!Number.isFinite(pts)) {
      alert('Please tpy in a Number (e.g. 2000).')
      return
    }

    const { error } = await supabase.from('lists').insert([
      {
        faction_id: selectedFaction,
        name: name.trim(),
        army_list: armyList.trim(),
        explanation: explanation.trim(),
        points: pts,
        country: country, // already a clean value from the select
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
              inputMode="numeric"
              min={0}
              step={10}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="z. B. 2000"
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            >
              <option value="">-- Select Country --</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
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

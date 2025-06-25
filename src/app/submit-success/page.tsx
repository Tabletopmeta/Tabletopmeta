'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const successMessages40k = [
  'List uploaded – the Tech-Priests approve.',
  'Servitor has filed your data-slate.',
  'Battle protocols updated successfully.',
  'Adeptus Administratum received your submission.',
]

const successMessagesAos = [
  'Scroll sealed and handed to the Grand Conclave.',
  'The Realmgates shimmer in approval.',
  'Sigmar blesses this list!',
  'The scribes of Azyr recorded your army.',
]

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const listId = searchParams.get('id')

  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const allMessages = [...successMessages40k, ...successMessagesAos]
    const random = allMessages[Math.floor(Math.random() * allMessages.length)]
    setMessage(random)
  }, [])

  return (
    <main className="p-4 md:p-8 text-white bg-[#0a0e17] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {message || 'Submitting...'}
      </h1>

      <div className="space-y-4 text-center w-full max-w-xs">
        <Link
          href="/submit-list"
          className="block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded w-full"
        >
          Submit New List
        </Link>

        <Link
          href="/"
          className="block bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded w-full"
        >
          Home
        </Link>

        {listId && (
          <Link
            href={`/list/${listId}`}
            className="block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full"
          >
            View List
          </Link>
        )}
      </div>
    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  ArrowTopRightOnSquareIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { LoadingSpinner } from '@/components/ui'

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [sessionsByRoom, setSessionsByRoom] = useState({})

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/rooms', {
        credentials: 'include',
      }).then((res) => res.json()),

      fetch('/api/sessions').then((res) => res.json()),
    ])
      .then(([roomsData, sessionsData]) => {
        setRooms(Array.isArray(roomsData) ? roomsData : [])

        const grouped = {}

        ;(Array.isArray(sessionsData) ? sessionsData : []).forEach(
          (session) => {
            if (!session.room) return

            if (!grouped[session.room]) {
              grouped[session.room] = []
            }

            grouped[session.room].push(session)
          }
        )

        setSessionsByRoom(grouped)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Erreur de chargement')
        setLoading(false)
      })
  }, [])

  return (
    <div className="pt-20 space-y-6">
      <section className="rounded-lg border border-white/10 bg-[#1F2937] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#10B981]">
              Espaces
            </p>

            <h1 className="mt-1 flex items-center gap-2 text-3xl font-black text-[#F9FAFB]">
              <BuildingOfficeIcon className="h-8 w-8 text-[#10B981]" />
              Salles
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Les salles sont générées automatiquement depuis le
              champ salle des sessions.
            </p>
          </div>

          <Link
            href="/admin/sessions/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <PlusIcon className="h-4 w-4" />
            Créer une session
          </Link>
        </div>
      </section>

      {loading ? (
        <div className="rounded-lg border border-white/10 bg-[#1F2937] shadow-sm">
          <LoadingSpinner />
        </div>
      ) : rooms.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-[#1F2937] p-12 text-center text-gray-400 shadow-sm">
          Aucune salle définie. Créez des sessions avec un champ
          salle pour les voir apparaître ici.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => {
            const sessions = sessionsByRoom[room.name] || []

            return (
              <article
                key={room.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D3DBC4]/35 hover:shadow-[0_22px_55px_rgba(15,37,45,0.28)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D3DBC4] via-[#9AA9A1] to-[#4E6670]" />

                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D3DBC4]/20 bg-[#D3DBC4]/10 text-[#D3DBC4]">
                      <BuildingOfficeIcon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                        Salle
                      </p>
                      <h2 className="truncate text-xl font-black text-[#F9FAFB] transition group-hover:text-[#D3DBC4]">
                        {room.name}
                      </h2>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-gray-400">
                    {sessions.length} session
                    {sessions.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="min-h-[10rem] rounded-xl border border-white/10 bg-[#111827]/45 p-4">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                    <CalendarDaysIcon className="h-4 w-4" />
                    Sessions liées
                  </div>

                  <div className="space-y-2">
                  {sessions.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      Aucune session liée.
                    </p>
                  ) : (
                    sessions.slice(0, 4).map((session) => (
                      <Link
                        key={session.id}
                        href={`/admin/sessions/${session.id}/edit`}
                        className="block truncate rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-gray-400 transition hover:border-[#D3DBC4]/20 hover:bg-[#D3DBC4]/10 hover:text-[#D3DBC4]"
                      >
                        {session.title}
                      </Link>
                    ))
                  )}

                  {sessions.length > 4 && (
                    <p className="px-2 text-xs font-medium text-gray-400">
                      +{sessions.length - 4} autre
                      {sessions.length - 4 > 1 ? 's' : ''}
                    </p>
                  )}
                  </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <Link
                    href={`/rooms/${encodeURIComponent(room.name)}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#D3DBC4]/25 bg-[#D3DBC4]/10 px-3 py-2.5 text-sm font-bold text-[#D3DBC4] transition hover:-translate-y-0.5 hover:bg-[#D3DBC4]/15"
                  >
                    Voir la page publique

                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

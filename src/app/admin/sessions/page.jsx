'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  CalendarDaysIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PencilSquareIcon,
  PlayCircleIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { LoadingSpinner } from '@/components/ui'

function getSessionStatus(session) {
  const now = new Date()
  const start = new Date(session.startTime)
  const end = new Date(session.endTime)

  if (now >= start && now <= end) {
    return {
      label: 'En cours',
      className: 'border-red-400/30 bg-red-500/10 text-red-300',
    }
  }

  if (now < start) {
    return {
      label: 'À venir',
      className: 'border-[#D3DBC4]/30 bg-[#D3DBC4]/10 text-[#D3DBC4]',
    }
  }

  return {
    label: 'Terminé',
    className: 'border-white/15 bg-white/5 text-gray-400',
  }
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })
}

function formatTime(value) {
  return new Date(value).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/sessions')
      .then((res) => res.json())
      .then((data) => {
        setSessions(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        toast.error('Erreur de chargement')
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id, title) => {
    if (!confirm(`Supprimer la session "${title}" ?`)) {
      return
    }

    const toastId = toast.loading('Suppression...')

    const res = await fetch(`/api/admin/sessions/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (res.ok) {
      setSessions((prev) =>
        prev.filter((session) => session.id !== id)
      )

      toast.success('Session supprimée', {
        id: toastId,
      })
    } else {
      toast.error('Erreur lors de la suppression', {
        id: toastId,
      })
    }
  }

  const filtered = useMemo(() => {
    const value = search.toLowerCase()

    return sessions.filter(
      (session) =>
        session.title?.toLowerCase().includes(value) ||
        session.event?.title?.toLowerCase().includes(value) ||
        session.room?.toLowerCase().includes(value)
    )
  }, [sessions, search])

  return (
    <div className="pt-20 space-y-6">
      <section className="rounded-lg border border-white/10 bg-[#1F2937] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#10B981]">
              Programme
            </p>

            <h1 className="mt-1 flex items-center gap-2 text-3xl font-black text-[#F9FAFB]">
              <PlayCircleIcon className="h-8 w-8 text-[#10B981]" />
              Sessions
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              {sessions.length} session
              {sessions.length > 1 ? 's' : ''} configurée
              {sessions.length > 1 ? 's' : ''}
            </p>
          </div>

          <Link
            href="/admin/sessions/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <PlusIcon className="h-4 w-4" />
            Nouvelle session
          </Link>
        </div>

        <div className="relative mt-5 max-w-md">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Rechercher par session, événement ou salle..."
            className="w-full rounded-lg border-white/15 bg-[#1F2937] py-2.5 pl-10 pr-4 text-sm text-[#F9FAFB] placeholder:text-gray-400"
          />
        </div>
      </section>

      {loading ? (
        <div className="rounded-lg border border-white/10 bg-[#1F2937] shadow-sm">
          <LoadingSpinner />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-[#1F2937] p-12 text-center text-gray-400 shadow-sm">
          {search
            ? 'Aucune session ne correspond à cette recherche.'
            : 'Aucune session pour le moment.'}
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((session) => {
            const status = getSessionStatus(session)

            return (
              <article
                key={session.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D3DBC4]/35 hover:shadow-[0_22px_55px_rgba(15,37,45,0.28)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D3DBC4] via-[#9AA9A1] to-[#4E6670]" />

                <div className="mb-5 flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${status.className}`}
                  >
                    {status.label}
                  </span>

                  <span className="inline-flex max-w-[11rem] items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-400">
                    <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">
                      {session.room || 'Salle non définie'}
                    </span>
                  </span>
                </div>

                <h2 className="line-clamp-2 text-xl font-black leading-snug text-[#F9FAFB] transition group-hover:text-[#D3DBC4]">
                  {session.title}
                </h2>

                <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-400">
                  {session.description ||
                    'Aucune description pour cette session.'}
                </p>

                <div className="mt-5 space-y-3 rounded-xl border border-white/10 bg-[#111827]/45 p-4">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D3DBC4]/10 text-[#D3DBC4]">
                      <CalendarDaysIcon className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Événement
                      </p>
                      <p className="line-clamp-1 font-semibold text-[#F9FAFB]">
                        {session.event?.title || 'Non rattachée'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D3DBC4]/10 text-[#D3DBC4]">
                      <ClockIcon className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Horaire
                      </p>
                      <p className="font-semibold text-[#F9FAFB]">
                        {formatDate(session.startTime)} ·{' '}
                        {formatTime(session.startTime)} -{' '}
                        {formatTime(session.endTime)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <Link
                    href={`/admin/sessions/${session.id}/edit`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D3DBC4]/25 bg-[#D3DBC4]/10 px-3 py-2.5 text-sm font-bold text-[#D3DBC4] transition hover:-translate-y-0.5 hover:bg-[#D3DBC4]/15"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                    Modifier
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(session.id, session.title)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/20 px-3 py-2.5 text-sm font-bold text-red-300 transition hover:-translate-y-0.5 hover:bg-red-500/10"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Supprimer
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

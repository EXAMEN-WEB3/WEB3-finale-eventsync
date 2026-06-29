'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  TrashIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { usePersonalPlanning } from '@/hooks/usePersonalPlanning'

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function PersonalPlanningPage() {
  const {
    loaded,
    plannedIds,
    plannedSessions,
    removeFromPlanning,
  } = usePersonalPlanning()

  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loaded) return

    if (plannedIds.length === 0) {
      setSessions([])
      setLoading(false)
      return
    }

    setLoading(true)

    fetch(`/api/sessions?ids=${plannedIds.join(',')}`)
      .then((res) => res.json())
      .then((data) => {
        setSessions(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setSessions(plannedSessions)
        setLoading(false)
      })
  }, [loaded, plannedIds, plannedSessions])

  const sortedSessions = useMemo(
    () =>
      [...sessions].sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      ),
    [sessions]
  )

  return (
    <main className="min-h-screen bg-[#111827] pt-16 text-[#F9FAFB]">
      <section className="soft-section border-b border-white/10">
        <div className="container mx-auto px-4 py-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#10B981]">
            Programme personnel
          </p>

          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-black text-[#F9FAFB] md:text-4xl">
                Mon planning
              </h1>

              <p className="mt-3 max-w-2xl text-gray-400">
                Regroupez les sessions que vous souhaitez suivre. Les conflits
                horaires sont bloqués automatiquement lors de l’ajout.
              </p>
            </div>

            <Link
              href="/sessions"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-emerald-700"
            >
              Ajouter des sessions
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="card-dark rounded-lg px-6 py-14 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-[#10B981] border-t-transparent" />
            <p className="text-gray-400">Chargement de votre planning...</p>
          </div>
        ) : sortedSessions.length === 0 ? (
          <div className="card-dark mx-auto max-w-lg rounded-lg px-6 py-14 text-center">
            <CalendarDaysIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />

            <h2 className="text-2xl font-bold text-[#F9FAFB]">
              Votre planning est vide
            </h2>

            <p className="mt-3 text-gray-400">
              Ajoutez des sessions à votre planning pour organiser votre
              parcours pendant l’événement.
            </p>

            <Link
              href="/sessions"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-5 py-3 font-semibold text-white shadow-glow hover:bg-emerald-700"
            >
              Explorer les sessions
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="quiet-panel px-1 py-4 text-sm text-gray-400">
              {sortedSessions.length} session
              {sortedSessions.length > 1 ? 's' : ''} dans votre planning
            </div>

            {sortedSessions.map((session) => (
              <article
                key={session.id}
                className="quiet-panel rounded-lg px-1 py-6 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    {session.event?.title || session.eventTitle ? (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#10B981]">
                        {session.event?.title || session.eventTitle}
                      </p>
                    ) : null}

                    <h2 className="text-2xl font-bold text-[#F9FAFB]">
                      {session.title}
                    </h2>

                    {session.description && (
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-400">
                        {session.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromPlanning(session.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/10"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Retirer
                  </button>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-gray-400 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-4 w-4 text-[#10B981]" />
                    <span>{formatDate(session.startTime)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-[#10B981]" />
                    <span>
                      {formatTime(session.startTime)} -{' '}
                      {formatTime(session.endTime)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-[#10B981]" />
                    <span>{session.room}</span>
                  </div>
                </div>

                {session.speakers?.length > 0 && (
                  <div className="mt-4 flex items-start gap-2 text-sm text-gray-400">
                    <UsersIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                    <span>
                      {session.speakers.map((speaker) => speaker.name).join(', ')}
                    </span>
                  </div>
                )}

                <div className="mt-5 border-t border-white/10 pt-5">
                  <Link
                    href={`/sessions/${session.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:text-[#10B981]"
                  >
                    Voir la session
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

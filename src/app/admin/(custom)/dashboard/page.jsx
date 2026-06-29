import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRightIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClockIcon,
  MapPinIcon,
  PlayCircleIcon,
  PlusIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

function formatDay(value) {
  return new Date(value).toLocaleDateString('fr-FR', {
    day: '2-digit',
  })
}

function formatMonth(value) {
  return new Date(value).toLocaleDateString('fr-FR', {
    month: 'short',
  })
}

function formatTime(value) {
  return new Date(value).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')

  const [
    eventsCount,
    sessionsCount,
    speakersCount,
    roomsRaw,
    upcomingSessions,
  ] = await Promise.all([
    prisma.event.count(),
    prisma.session.count(),
    prisma.speaker.count(),
    prisma.session.findMany({
      select: { room: true },
      distinct: ['room'],
    }),
    prisma.session.findMany({
      take: 5,
      where: {
        startTime: {
          gte: new Date(),
        },
      },
      orderBy: { startTime: 'asc' },
      include: { event: true },
    }),
  ])

  const roomsCount = roomsRaw.filter((room) => room.room).length

  const stats = [
    {
      label: 'Événements',
      count: eventsCount,
      href: '/admin/events',
      icon: CalendarDaysIcon,
      tone: 'bg-[#10B981]/15 text-[#10B981] ring-[#10B981]/30',
    },
    {
      label: 'Sessions',
      count: sessionsCount,
      href: '/admin/sessions',
      icon: PlayCircleIcon,
      tone: 'bg-[#10B981]/15 text-[#10B981] ring-[#10B981]/30',
    },
    {
      label: 'Intervenants',
      count: speakersCount,
      href: '/admin/speakers',
      icon: UserGroupIcon,
      tone: 'bg-[#10B981]/15 text-[#10B981] ring-[#10B981]/30',
    },
    {
      label: 'Salles',
      count: roomsCount,
      href: '/admin/rooms',
      icon: BuildingOfficeIcon,
      tone: 'bg-[#10B981]/15 text-[#10B981] ring-[#10B981]/30',
    },
  ]

  const actions = [
    {
      href: '/admin/events/new',
      label: 'Nouvel événement',
      tone: 'bg-[#10B981] hover:bg-emerald-700',
    },
    {
      href: '/admin/sessions/new',
      label: 'Nouvelle session',
      tone: 'bg-[#10B981] hover:bg-emerald-700',
    },
    {
      href: '/admin/speakers/new',
      label: 'Nouvel intervenant',
      tone: 'bg-[#10B981] hover:bg-emerald-700',
    },
  ]

  return (
    <div className="space-y-6 pt-20">
      <section className="overflow-hidden rounded-lg border border-white/10 bg-[#1F2937] shadow-sm">
        <div className="flex flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#111827] px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-400">
              <ChartBarIcon className="h-4 w-4" />
              Console administrateur
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#F9FAFB]">
              Tableau de bord
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Connecté avec{' '}
              <span className="font-semibold text-gray-400">
                {session.user.email}
              </span>
            </p>
          </div>

          <Link
            href="/admin/events/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#111827] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243244]"
          >
            <PlusIcon className="h-4 w-4" />
            Créer un événement
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, count, href, icon: Icon, tone }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-lg border border-white/10 bg-[#1F2937] p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400">
                  {label}
                </p>

                <p className="mt-3 text-3xl font-black text-[#F9FAFB]">
                  {count}
                </p>
              </div>

              <div className={`rounded-lg p-2 ring-1 ${tone}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-[#F9FAFB]">
              Gérer
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-white/10 bg-[#1F2937] p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">
            Actions rapides
          </h2>

          <div className="mt-4 grid gap-3">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`inline-flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-white ${action.tone}`}
              >
                {action.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] shadow-2xl shadow-black/10 backdrop-blur-xl">
          <div className="border-b border-white/10 bg-white/5 px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-gray-400">
                  Agenda
                </p>

                <h2 className="mt-1 flex items-center gap-2 text-xl font-black text-[#F9FAFB]">
                  <PlayCircleIcon className="h-5 w-5 text-[#D3DBC4]" />
                  Prochaines sessions
                </h2>
              </div>

              <Link
                href="/admin/sessions"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-gray-300 transition hover:-translate-y-0.5 hover:border-[#D3DBC4]/35 hover:bg-[#D3DBC4]/10 hover:text-[#D3DBC4]"
              >
                Voir tout
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-3 p-5">
            {upcomingSessions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/15 bg-[#111827]/35 px-5 py-8 text-center">
                <CalendarDaysIcon className="mx-auto mb-3 h-10 w-10 text-gray-400" />
                <p className="font-semibold text-[#F9FAFB]">
                  Aucune session à venir
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Les prochaines sessions apparaîtront ici dès qu’elles seront planifiées.
                </p>
              </div>
            ) : (
              upcomingSessions.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/sessions/${item.id}/edit`}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-[#111827]/40 p-4 transition hover:-translate-y-0.5 hover:border-[#D3DBC4]/30 hover:bg-[#243244]/70"
                >
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-[#D3DBC4]/20 bg-[#D3DBC4]/10 text-[#D3DBC4]">
                    <span className="text-lg font-black leading-none">
                      {formatDay(item.startTime)}
                    </span>
                    <span className="mt-1 text-[10px] font-bold uppercase">
                      {formatMonth(item.startTime)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold uppercase tracking-wide text-gray-500">
                      {item.event?.title || 'Sans événement'}
                    </p>

                    <p className="mt-1 truncate font-bold text-[#F9FAFB] group-hover:text-[#D3DBC4]">
                      {item.title}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <ClockIcon className="h-3.5 w-3.5" />
                        {formatTime(item.startTime)}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <MapPinIcon className="h-3.5 w-3.5" />
                        {item.room || 'Salle non définie'}
                      </span>
                    </div>
                  </div>

                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-gray-500 transition group-hover:translate-x-1 group-hover:text-[#D3DBC4]" />
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

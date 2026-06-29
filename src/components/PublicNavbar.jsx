'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  Bars3Icon,
  XMarkIcon,
  CalendarDaysIcon,
  HomeIcon,
  VideoCameraIcon,
  HeartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useParticipant } from '@/context/AuthContext'
import ProfilePhotoButton from '@/components/ProfilePhotoButton'

export default function PublicNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { participant, logoutParticipant, updateParticipantPhoto, loaded } = useParticipant()
  const { data: adminSession, status: adminStatus } = useSession()
  const [mobileOpen, setMobileOpen] =
    useState(false)

  const navigation = [
    {
      name: 'Accueil',
      href: '/',
      icon: HomeIcon,
    },
    {
      name: 'Sessions',
      href: '/sessions',
      icon: VideoCameraIcon,
    },
    {
      name: 'Planning',
      href: '/planning',
      icon: CalendarDaysIcon,
    },
    {
      name: 'Favoris',
      href: '/favourites',
      icon: HeartIcon,
    },
  ]

  const handleParticipantLogout = () => {
    logoutParticipant()
    setMobileOpen(false)
    router.push('/login')
  }

  const handleAdminLogout = () => {
    setMobileOpen(false)
    signOut({ callbackUrl: '/login' })
  }

  const adminConnected = adminStatus === 'authenticated'
  const authLoaded = loaded && adminStatus !== 'loading'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[color-mix(in_srgb,var(--color-surface)_78%,transparent)] shadow-[0_10px_30px_rgba(2,6,23,0.14)] backdrop-blur-xl">
      <nav className="container relative mx-auto flex min-h-16 items-center justify-between px-4 py-3">
        
        <Link
          href="/"
          className="relative z-10 flex items-center gap-3 text-white transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] shadow-lg shadow-emerald-500/20 ring-1 ring-white/15">
            <CalendarDaysIcon className="h-5 w-5 text-white" />
          </div>

          <div className="leading-tight">
            <span className="block text-lg font-black tracking-tight">
              EventSync
            </span>

            <span className="hidden text-xs font-medium text-gray-400 sm:block">
              Live conference hub
            </span>
          </div>
        </Link>

        
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                title={item.name}
                aria-label={item.name}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition hover:-translate-y-0.5 ${
                  active
                    ? 'text-[#10B981]'
                    : 'text-gray-300 hover:text-[#10B981]'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            )
          })}
        </div>

        
        <div className="relative z-10 hidden items-center gap-2 md:flex">
          {authLoaded && participant && (
            <>
              <ProfilePhotoButton
                name={participant.pseudo}
                photoUrl={participant.photoUrl}
                onPhotoChange={updateParticipantPhoto}
                caption="Participant"
                size="sm"
              />
              <button
                type="button"
                onClick={handleParticipantLogout}
                title={`Déconnecter ${participant.pseudo}`}
                aria-label={`Déconnecter ${participant.pseudo}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-300"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="hidden lg:inline">Déconnexion</span>
              </button>
            </>
          )}
          {authLoaded && !participant && adminConnected && (
            <button
              type="button"
              onClick={handleAdminLogout}
              title={`Déconnecter ${adminSession?.user?.email || 'admin'}`}
              aria-label="Déconnecter l'administrateur"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-300"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="hidden lg:inline">Déconnexion</span>
            </button>
          )}
          {authLoaded && !participant && !adminConnected && (
            <Link
              href="/login"
              className="flex min-h-10 items-center gap-2 rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <UserIcon className="h-5 w-5" />
              <span>Connexion</span>
            </Link>
          )}
        </div>

        
        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          type="button"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
          className="rounded-lg p-2 text-gray-300 transition hover:bg-white/5 hover:text-white md:hidden"
        >
          {mobileOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[color-mix(in_srgb,var(--color-surface)_96%,transparent)] shadow-2xl backdrop-blur-xl md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-[#10B981]/15 text-[#10B981]'
                      : 'text-gray-300 hover:bg-[#10B981]/10 hover:text-[#10B981]'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}

            {authLoaded && participant && (
              <>
                <div className="mt-1 px-1">
                  <ProfilePhotoButton
                    name={participant.pseudo}
                    photoUrl={participant.photoUrl}
                    onPhotoChange={updateParticipantPhoto}
                    caption="Participant"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleParticipantLogout}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-300 transition hover:bg-red-500/10 hover:text-red-300"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </>
            )}
            {authLoaded && !participant && adminConnected && (
              <button
                type="button"
                onClick={handleAdminLogout}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-300 transition hover:bg-red-500/10 hover:text-red-300"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Déconnexion admin</span>
              </button>
            )}
            {authLoaded && !participant && !adminConnected && (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex items-center gap-3 rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white shadow-glow"
              >
                <UserIcon className="h-5 w-5" />
                <span>Connexion</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

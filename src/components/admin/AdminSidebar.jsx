'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  BeakerIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  MoonIcon,
  PlayCircleIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from '@/context/ThemeContext'
import ProfilePhotoButton from '@/components/ProfilePhotoButton'

const navItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: ChartBarIcon },
  { href: '/admin/events', label: 'Événements', icon: CalendarDaysIcon },
  { href: '/admin/sessions', label: 'Sessions', icon: PlayCircleIcon },
  { href: '/admin/speakers', label: 'Intervenants', icon: UserGroupIcon },
  { href: '/admin/rooms', label: 'Salles', icon: BuildingOfficeIcon },
  { href: '/admin/ra', label: 'Admin', icon: BeakerIcon },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { isDark, toggleTheme } = useTheme()
  const { data: session } = useSession()
  const [adminPhotoUrl, setAdminPhotoUrl] = useState('')
  const adminEmail = session?.user?.email || ''
  const adminName = useMemo(
      () => adminEmail.split('@')[0] || 'Admin',
      [adminEmail]
  )

  useEffect(() => {
    if (!adminEmail) return

    try {
      setAdminPhotoUrl(localStorage.getItem(`adminPhoto:${adminEmail}`) || '')
    } catch {}
  }, [adminEmail])

  const handleAdminPhotoChange = (photoUrl) => {
    setAdminPhotoUrl(photoUrl)

    try {
      localStorage.setItem(`adminPhoto:${adminEmail}`, photoUrl)
    } catch {}
  }

  return (
      <aside className="admin-surface fixed inset-y-0 left-0 z-40 hidden w-64 flex-col px-5 lg:flex">
        <div className="py-7">
          <p className="text-xs font-semibold uppercase text-gray-400">EventSync</p>
          <h1 className="mt-1 text-2xl font-black text-[#F9FAFB]">Admin</h1>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto py-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`)
            return (
                <Link
                    key={href}
                    href={href}
                    data-active={isActive}
                    className={`admin-nav-link group relative flex items-center gap-3 px-2 py-3 text-sm font-semibold transition-all ${
                        isActive
                            ? 'text-[#10B981]'
                            : 'text-gray-400 hover:translate-x-1 hover:text-[#10B981]'
                    }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                </Link>
            )
          })}
        </nav>

        <div className="space-y-1 py-5">
          {adminEmail && (
              <div className="mb-4 flex items-center gap-3 px-2">
                <ProfilePhotoButton
                  name={adminName}
                  photoUrl={adminPhotoUrl}
                  onPhotoChange={handleAdminPhotoChange}
                  caption="Administrateur"
                  size="sm"
                />
              </div>
          )}

          <button
              type="button"
              onClick={toggleTheme}
              className="group flex w-full items-center gap-3 px-2 py-3 text-sm font-semibold text-gray-400 transition hover:translate-x-1 hover:text-[#10B981]"
          >
            {isDark ? (
                <SunIcon className="h-5 w-5" />
            ) : (
                <MoonIcon className="h-5 w-5" />
            )}
            {isDark ? 'Mode clair' : 'Mode sombre'}
          </button>

          <Link
              href="/"
              className="group flex items-center gap-3 px-2 py-3 text-sm font-semibold text-gray-400 transition hover:translate-x-1 hover:text-[#10B981]"
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            Site public
          </Link>
          <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex w-full items-center gap-3 px-2 py-3 text-sm font-semibold text-gray-400 transition hover:translate-x-1 hover:text-red-300"
          >
            <ArrowLeftEndOnRectangleIcon className="h-5 w-5 shrink-0" />
            Déconnexion
          </button>
        </div>
      </aside>
  )
}

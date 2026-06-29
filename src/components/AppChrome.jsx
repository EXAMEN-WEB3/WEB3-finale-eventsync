'use client'

import { usePathname } from 'next/navigation'
import PublicNavbar from '@/components/PublicNavbar'

export default function AppChrome() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return <PublicNavbar />
}

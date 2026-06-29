'use client'

import dynamic from 'next/dynamic'

const RhAdminApp = dynamic(() => import('@/rh-admin/RhAdminApp'), { ssr: false })

export default function RhAdminCatchAll() {
  return <RhAdminApp />
}

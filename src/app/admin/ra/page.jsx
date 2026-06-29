'use client'

import dynamic from 'next/dynamic'

const RaAdminApp = dynamic(() => import('./RaAdminApp'), { ssr: false })

export default function RaAdminPage() {
  return <RaAdminApp />
}

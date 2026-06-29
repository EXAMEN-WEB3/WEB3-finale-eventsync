'use client'

/**
 * Route catch-all : /rh-admin, /rh-admin/employees, /rh-admin/employees/1, etc.
 * Tout le routing interne est délégué à react-router (intégré dans React Admin).
 * Next.js ne gère que le point d'entrée.
 */
import dynamic from 'next/dynamic'

// Import dynamique pour éviter le SSR (React Admin est 100% client-side)
const RhAdminApp = dynamic(() => import('@/rh-admin/RhAdminApp'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#EEF2F7',
        fontFamily: "'Inter', sans-serif",
        color: '#1E3A5F',
        fontSize: '1rem',
        fontWeight: 500,
      }}
    >
      Chargement de l&apos;espace RH…
    </div>
  ),
})

export default function RhAdminPage() {
  return <RhAdminApp />
}

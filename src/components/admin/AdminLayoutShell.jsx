import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayoutShell({ children }) {
  return (
    <>
      <AdminSidebar />
      <main className="admin-content-shell min-h-screen px-4 py-8 lg:ml-64 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          {children}
        </div>
      </main>
    </>
  )
}

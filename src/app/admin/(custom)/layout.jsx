import AdminSidebar from '@/components/admin/AdminSidebar'

export default function CustomAdminLayout({ children }) {
  return (
    <>
      <AdminSidebar />
      <main className="min-h-screen transition-[margin] duration-150 lg:ml-[var(--admin-sidebar-width,16rem)]">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  )
}

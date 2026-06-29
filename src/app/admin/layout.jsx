import AdminLayoutShell from '@/components/admin/AdminLayoutShell'

export default function AdminLayout({ children }) {
  return (
    <div className="admin-page-shell min-h-screen text-[#F9FAFB]">
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </div>
  )
}

// src/app/(admin)/admin/layout.tsx
import AdminHeader from "@/layouts/admin/AdminHeader";
import AdminSidebar from "@/layouts/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-body">
        <AdminSidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}

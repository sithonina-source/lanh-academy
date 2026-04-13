import Link from 'next/link';
import { cookies } from 'next/headers';
import { logoutAdmin } from './login/actions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session')?.value;
  
  // Nếu không có session (ví dụ đang ở trang /admin/login do middleware thả lỏng), chỉ render children
  if (!sessionCookie) {
    return <>{children}</>;
  }

  const session = JSON.parse(sessionCookie);
  const permissions: string[] = JSON.parse(session.permissions || '[]');
  const hasFullAccess = session.role === 'ADMIN' || permissions.includes('ALL');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#1F2937', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #374151', fontSize: '1.2rem', fontWeight: 800 }}>
          <Link href="/admin" style={{ color: 'white', textDecoration: 'none' }}>🌿 Lành Admin</Link>
        </div>
        <nav style={{ flex: 1, padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          
          {(hasFullAccess || permissions.includes('SYSTEM')) && (
            <Link href="/admin" style={{ padding: '12px 20px', color: '#D1D5DB', textDecoration: 'none', transition: 'background 0.2s' }} className="admin-nav-link">
              Quy mô hệ thống
            </Link>
          )}

          {(hasFullAccess || permissions.includes('COURSES')) && (
            <Link href="/admin/courses" style={{ padding: '12px 20px', color: '#D1D5DB', textDecoration: 'none', transition: 'background 0.2s' }} className="admin-nav-link">
              Quản lý Khóa học
            </Link>
          )}

          {(hasFullAccess || permissions.includes('ORDERS')) && (
            <Link href="/admin/orders" style={{ padding: '12px 20px', color: '#D1D5DB', textDecoration: 'none', transition: 'background 0.2s' }} className="admin-nav-link">
              Đơn Đăng ký
            </Link>
          )}

          {(hasFullAccess || permissions.includes('BLOGS')) && (
            <Link href="/admin/blogs" style={{ padding: '12px 20px', color: '#D1D5DB', textDecoration: 'none', transition: 'background 0.2s' }} className="admin-nav-link">
              Quản lý Blog
            </Link>
          )}
          
          {hasFullAccess && (
            <Link href="/admin/staff" style={{ padding: '12px 20px', color: '#D1D5DB', textDecoration: 'none', transition: 'background 0.2s' }} className="admin-nav-link">
              Phân Quyền Nhân Sự
            </Link>
          )}
        </nav>
        <div style={{ padding: '20px', borderTop: '1px solid #374151', fontSize: '0.9rem', color: '#9CA3AF' }}>
          Đang xem với: <br /><strong style={{ color: 'white' }}>{session.email}</strong>
          <br /><br />
          <form action={logoutAdmin}>
             <button type="submit" style={{ background: 'none', border: 'none', color: '#EF4444', padding: 0, cursor: 'pointer', fontSize: '0.9rem' }}>🚪 Đăng xuất</button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ backgroundColor: 'white', padding: '20px 30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--dark-accent)' }}>Trung Tâm Quản Trị // <span style={{ color: '#10B981', fontSize: '1.2rem' }}>{session.role === 'ADMIN' ? 'SUPER ADMIN' : 'STAFF'}</span></h2>
          <Link href="/" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.9rem' }}>Về Website</Link>
        </header>
        <div style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>

      <style>{`
        .admin-nav-link:hover {
          background-color: #374151;
          color: white !important;
        }
      `}</style>
    </div>
  );
}

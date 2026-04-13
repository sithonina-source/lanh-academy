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
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ backgroundColor: '#1F2937', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #374151', fontSize: '1.2rem', fontWeight: 800 }}>
          <Link href="/admin" style={{ color: 'white', textDecoration: 'none' }}>🌿 Lành Admin</Link>
        </div>
        <nav className="admin-nav" style={{ flex: 1, padding: '20px 0', display: 'flex', gap: '5px' }}>
          
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
        <div className="admin-user-info" style={{ padding: '20px', borderTop: '1px solid #374151', fontSize: '0.9rem', color: '#9CA3AF' }}>
          Đang xem với: <br /><strong style={{ color: 'white', wordBreak: 'break-all' }}>{session.email}</strong>
          <br /><br />
          <form action={logoutAdmin}>
             <button type="submit" style={{ background: 'none', border: 'none', color: '#EF4444', padding: 0, cursor: 'pointer', fontSize: '0.9rem' }}>🚪 Đăng xuất</button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header className="admin-header" style={{ backgroundColor: 'white', padding: '20px 30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--dark-accent)' }}>Trung Tâm Quản Trị <br className="show-on-mobile-break" />// <span style={{ color: '#10B981', fontSize: '1.2rem' }}>{session.role === 'ADMIN' ? 'SUPER ADMIN' : 'STAFF'}</span></h2>
          <Link href="/" className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Về Website</Link>
        </header>
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>

      <style>{`
        .admin-layout {
           display: flex;
           min-height: 100vh;
           background-color: #F3F4F6;
           width: 100%;
           overflow-x: hidden;
        }
        .admin-sidebar {
           width: 250px;
           flex-shrink: 0;
        }
        .admin-nav {
           flex-direction: column;
        }
        .admin-header {
           justify-content: space-between;
        }
        .show-on-mobile-break {
           display: none;
        }
        .admin-nav-link:hover {
          background-color: #374151;
          color: white !important;
        }

        @media (max-width: 800px) {
           .admin-layout {
              flex-direction: column;
           }
           .admin-sidebar {
              width: 100%;
           }
           .admin-nav {
              flex-direction: row !important;
              overflow-x: auto;
              padding: 0 !important;
           }
           .admin-nav-link {
              white-space: nowrap;
              border-bottom: 2px solid transparent;
           }
           .admin-nav-link:hover {
              border-bottom: 2px solid #10B981;
           }
           .admin-user-info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 20px !important;
           }
           .admin-user-info br {
              display: none;
           }
           .admin-header {
              padding: 15px !important;
           }
           .show-on-mobile-break {
              display: block;
           }
        }
      `}</style>
    </div>
  );
}

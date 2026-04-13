import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { logoutUser } from '@/app/dang-nhap/actions';

export default async function Header() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session')?.value;
  let user = null;
  if (sessionCookie) {
    try {
      user = JSON.parse(sessionCookie);
    } catch(e) {}
  }

  return (
    <header className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100px'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Image src="/logo.png" alt="Lành Academy Logo" width={220} height={72} style={{ objectFit: 'contain' }} priority />
        </Link>
        <nav className="hide-on-mobile" style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center' }}>
          <Link href="/" className="nav-link">Trang chủ</Link>
          <Link href="/khoa-hoc" className="nav-link">Khóa học</Link>
          <Link href="/gioi-thieu" className="nav-link">Giới thiệu</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
        </nav>
        <div className="hide-on-mobile" style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', alignItems: 'center' }}>
          {user ? (
            <>
              <Link href="/my-courses" style={{ color: 'var(--primary-green)', fontWeight: 700 }}>📚 Lớp của tôi</Link>
              <form action={logoutUser}>
                <button type="submit" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem', color: '#EF4444', borderColor: '#EF4444' }}>🚪 Đăng xuất</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/dang-nhap" style={{ color: 'var(--text-dark)', fontWeight: 600 }}>Đăng nhập</Link>
              <Link href="/dang-ky" className="btn btn-primary">Tham gia</Link>
            </>
          )}
        </div>
        
        {/* Hamburger Menu Icon (Mobile Only) */}
        <div className="show-on-mobile" style={{ cursor: 'pointer', padding: '10px', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--dark-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>
    </header>
  );
}

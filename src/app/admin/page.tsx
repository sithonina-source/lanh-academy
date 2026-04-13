import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Prevent static generation caching

export default async function AdminDashboard() {
  const courseCount = await prisma.course.count();
  const blogCount = await prisma.blog.count();
  const orderCount = await prisma.order.count();
  const userCount = await prisma.user.count();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--dark-accent)' }}>Tổng quan hệ thống</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {/* Metric Card */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>Tổng Khóa Học</h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-green)' }}>{courseCount}</p>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>Đơn Đăng Ký</h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: '#3B82F6' }}>{orderCount}</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>Bài Viết Blog</h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: '#F59E0B' }}>{blogCount}</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>Người Dùng</h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: '#8B5CF6' }}>{userCount}</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginTop: 0, color: 'var(--dark-accent)' }}>Chào mừng trở lại!</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Cơ sở dữ liệu của bạn đã được kết nối với SQLite thành công. Dữ liệu thật đã được đẩy lên đầy đủ. Hãy chọn các chức năng bên menu trái để bắt đầu quản lý ngay.</p>
        <Link href="/admin/courses" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>
          Quản lý Khóa Học →
        </Link>
      </div>
    </div>
  );
}

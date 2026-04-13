import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Prevent static generation caching

export default async function AdminDashboard() {
  const courseCount = await prisma.course.count();
  const userCount = await prisma.user.count();
  
  // Lấy đơn hàng thành công để tính doanh thu
  const paidOrders = await prisma.order.findMany({
    where: { status: { in: ['PAID', 'COMPLETED'] } },
    include: { course: true }
  });

  const orderCount = paidOrders.length;
  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Thống kê theo tháng: {'2026-04': { count: 5, revenue: 10000000 }}
  const monthlyStats: Record<string, { count: number, revenue: number }> = {};
  
  // Thống kê theo khóa học: {'id': { title: 'Mosaic', count: 5, revenue: 10000000 }}
  const courseStats: Record<string, { title: string, count: number, revenue: number }> = {};

  for (const order of paidOrders) {
    const d = new Date(order.createdAt);
    const monthKey = `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
    
    if (!monthlyStats[monthKey]) monthlyStats[monthKey] = { count: 0, revenue: 0 };
    monthlyStats[monthKey].count += 1;
    monthlyStats[monthKey].revenue += order.totalAmount;

    if (order.course) {
      if (!courseStats[order.courseId]) courseStats[order.courseId] = { title: order.course.title, count: 0, revenue: 0 };
      courseStats[order.courseId].count += 1;
      courseStats[order.courseId].revenue += order.totalAmount;
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--dark-accent)' }}>Báo Cáo Thống Kê</h1>
      
      {/* 4 Chỉ số lớn */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', borderLeft: '4px solid var(--primary-green)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tổng Doanh Thu</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--primary-green)' }}>{formatCurrency(totalRevenue)}</p>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', borderLeft: '4px solid #3B82F6' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Đơn Thành Công</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#3B82F6' }}>{orderCount} <span style={{fontSize: '1rem', color: '#9CA3AF', fontWeight: 500}}>đơn</span></p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', borderLeft: '4px solid #F59E0B' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tổng Khóa Học</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#F59E0B' }}>{courseCount}</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', borderLeft: '4px solid #8B5CF6' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tổng Học Viên</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#8B5CF6' }}>{userCount}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Doanh thu theo tháng */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
          <h2 style={{ marginTop: 0, color: 'var(--dark-accent)', fontSize: '1.25rem', paddingBottom: '15px', borderBottom: '1px solid #F3F4F6' }}>📈 Báo Cáo Theo Tháng</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#6B7280', fontSize: '0.85rem', textAlign: 'left' }}>
                <th style={{ padding: '12px 10px' }}>Thời Gian</th>
                <th style={{ padding: '12px 10px' }}>Số Đơn</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Doanh Thu</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthlyStats).map(([month, stat], idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#374151' }}>{month}</td>
                  <td style={{ padding: '12px 10px', color: '#4B5563' }}>{stat.count}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 700, color: 'var(--primary-green)' }}>{formatCurrency(stat.revenue)}</td>
                </tr>
              ))}
              {Object.keys(monthlyStats).length === 0 && (
                <tr><td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF' }}>Chưa có dữ liệu</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Doanh thu theo khóa học */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
          <h2 style={{ marginTop: 0, color: 'var(--dark-accent)', fontSize: '1.25rem', paddingBottom: '15px', borderBottom: '1px solid #F3F4F6' }}>📚 Hiệu Quả Khóa Học</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#6B7280', fontSize: '0.85rem', textAlign: 'left' }}>
                <th style={{ padding: '12px 10px' }}>Khóa Học</th>
                <th style={{ padding: '12px 10px' }}>Lượt Đăng Ký</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Doanh Thu</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(courseStats).sort((a,b) => b.revenue - a.revenue).map((stat, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#374151' }}>{stat.title}</td>
                  <td style={{ padding: '12px 10px', color: '#4B5563' }}>{stat.count}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 700, color: '#3B82F6' }}>{formatCurrency(stat.revenue)}</td>
                </tr>
              ))}
              {Object.keys(courseStats).length === 0 && (
                <tr><td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF' }}>Chưa có dữ liệu</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

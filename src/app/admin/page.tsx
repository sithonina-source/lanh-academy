import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Prevent static generation caching

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const { month } = await searchParams;

  const courseCount = await prisma.course.count();
  const userCount = await prisma.user.count();
  
  // Lấy tất cả đơn hàng để làm báo cáo
  const allOrders = await prisma.order.findMany({
    include: { course: true },
    orderBy: { createdAt: 'desc' }
  });

  // Tính toán TẤT CẢ các tháng có trong dữ liệu: '2026-04'
  const availableMonths = Array.from(new Set(allOrders.map(o => {
    const d = new Date(o.createdAt);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }))).sort().reverse();

  // Lọc dữ liệu theo tháng đã chọn (nếu có)
  const filteredOrders = month ? allOrders.filter(o => {
    const d = new Date(o.createdAt);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === month;
  }) : allOrders;

  const orderCount = filteredOrders.length;
  const paidOrderCount = filteredOrders.filter(o => o.status === 'PAID' || o.status === 'COMPLETED').length;

  const expectedRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const actualRevenue = filteredOrders.filter(o => o.status === 'PAID' || o.status === 'COMPLETED').reduce((sum, order) => sum + order.totalAmount, 0);

  // Thống kê theo tháng cho bảng: Xây dựng bằng tất cả data (để họ nhìn thấy xu hướng)
  const monthlyStats: Record<string, { count: number, expected: number, actual: number }> = {};
  const courseStats: Record<string, { title: string, count: number, expected: number, actual: number }> = {};

  for (const order of filteredOrders) {
    if (order.course) {
      if (!courseStats[order.courseId]) courseStats[order.courseId] = { title: order.course.title, count: 0, expected: 0, actual: 0 };
      courseStats[order.courseId].count += 1;
      courseStats[order.courseId].expected += order.totalAmount;
      if (order.status === 'PAID' || order.status === 'COMPLETED') {
        courseStats[order.courseId].actual += order.totalAmount;
      }
    }
  }

  for (const order of allOrders) {
    const d = new Date(order.createdAt);
    const mStr = `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
    if (!monthlyStats[mStr]) monthlyStats[mStr] = { count: 0, expected: 0, actual: 0 };
    monthlyStats[mStr].count += 1;
    monthlyStats[mStr].expected += order.totalAmount;
    if (order.status === 'PAID' || order.status === 'COMPLETED') {
      monthlyStats[mStr].actual += order.totalAmount;
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ fontSize: '2.2rem', margin: 0, color: 'var(--dark-accent)' }}>Báo Cáo Thống Kê</h1>
        
        <form method="GET" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select name="month" defaultValue={month || ''} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: 'white', fontWeight: 600, color: '#374151' }}>
            <option value="">Tất cả các tháng</option>
            {availableMonths.map(m => (
              <option key={m} value={m}>Tháng {m.split('-')[1]}/{m.split('-')[0]}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '0.95rem' }}>Lọc</button>
        </form>
      </div>
      
      {/* 4 Chỉ số lớn */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', borderLeft: '5px solid #F59E0B' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Doanh Thu Dự Kiến</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#F59E0B' }}>{formatCurrency(expectedRevenue)}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#9CA3AF' }}>Bao gồm đơn chưa CK</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', borderLeft: '5px solid var(--primary-green)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Thực Nhận (Đã CK) <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--primary-green)', marginLeft: '5px'}}><polyline points="20 6 9 17 4 12"></polyline></svg></h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--primary-green)' }}>{formatCurrency(actualRevenue)}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#9CA3AF' }}>Tiền đã vào tài khoản</p>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', borderLeft: '5px solid #3B82F6' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tổng Đơn Hàng</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#3B82F6' }}>{orderCount} <span style={{fontSize: '1rem', color: '#9CA3AF', fontWeight: 500}}>đơn mới</span></p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>{paidOrderCount} đơn đã thanh toán</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', borderLeft: '5px solid #8B5CF6', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tổng Khóa Học</h3>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#8B5CF6' }}>{courseCount}</p>
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '10px' }}>
            <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tổng Học Viên</h3>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#6366F1' }}>{userCount}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Doanh thu theo tháng */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', overflowX: 'auto' }}>
          <h2 style={{ marginTop: 0, color: 'var(--dark-accent)', fontSize: '1.25rem', paddingBottom: '15px', borderBottom: '1px solid #F3F4F6' }}>📈 Báo Cáo Theo Tháng</h2>
          <table style={{ width: '100%', minWidth: '400px', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#6B7280', fontSize: '0.85rem', textAlign: 'left' }}>
                <th style={{ padding: '12px 10px' }}>Thời Gian</th>
                <th style={{ padding: '12px 10px' }}>Số Đơn</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Dự Kiến</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Thực Nhận</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthlyStats).map(([monthStr, stat], idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s', backgroundColor: month && monthStr.includes(month.split('-')[1]) ? '#F0FDF4' : 'transparent' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#374151' }}>{monthStr}</td>
                  <td style={{ padding: '12px 10px', color: '#4B5563' }}>{stat.count}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 500, color: '#9CA3AF', textDecoration: stat.expected > stat.actual ? 'none' : 'none' }}>{formatCurrency(stat.expected)}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 700, color: 'var(--primary-green)' }}>{formatCurrency(stat.actual)}</td>
                </tr>
              ))}
              {Object.keys(monthlyStats).length === 0 && (
                <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF' }}>Chưa có dữ liệu</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Doanh thu theo khóa học */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', overflowX: 'auto' }}>
          <h2 style={{ marginTop: 0, color: 'var(--dark-accent)', fontSize: '1.25rem', paddingBottom: '15px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between' }}>
             📚 Hiệu Quả Khóa Học
             {month && <span style={{ fontSize: '0.85rem', color: '#10B981', padding: '4px 10px', backgroundColor: '#D1FAE5', borderRadius: '100px' }}>Lọc theo: Tháng {month.split('-')[1]}</span>}
          </h2>
          <table style={{ width: '100%', minWidth: '400px', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#6B7280', fontSize: '0.85rem', textAlign: 'left' }}>
                <th style={{ padding: '12px 10px' }}>Khóa Học</th>
                <th style={{ padding: '12px 10px' }}>Số Đơn</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Thực Nhận</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(courseStats).sort((a,b) => b.actual - a.actual).map((stat, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#374151' }}>{stat.title}</td>
                  <td style={{ padding: '12px 10px', color: '#4B5563' }}>{stat.count} <span style={{fontSize: '0.8rem', color: '#9CA3AF'}}>({formatCurrency(stat.expected)})</span></td>
                  <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 700, color: '#3B82F6' }}>{formatCurrency(stat.actual)}</td>
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

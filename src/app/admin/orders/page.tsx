import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: {
      course: true,
      user: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--dark-accent)' }}>Quản lý Đơn Đăng ký</h1>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Mã Đơn</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Học viên</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Khóa học</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Thanh toán</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>Chưa có đơn đăng ký nào.</td>
              </tr>
            ) : orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--dark-accent)' }}>#{order.id.slice(-6).toUpperCase()}</td>
                <td style={{ padding: '16px 20px', color: 'var(--text-dark)' }}>{order.user?.name || 'Khách Vãng Lai'}</td>
                <td style={{ padding: '16px 20px', color: 'var(--text-dark)' }}>{order.course?.title || 'Khóa đã xóa'}</td>
                <td style={{ padding: '16px 20px', color: 'var(--text-dark)' }}>{order.totalAmount.toLocaleString('vi-VN')} đ</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: order.status === 'COMPLETED' ? '#E8F5E9' : '#FEF3C7', color: order.status === 'COMPLETED' ? 'var(--primary-green)' : '#D97706', padding: '4px 10px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {order.status === 'COMPLETED' ? 'Đã Thanh Toán' : 'Chờ Xử Lý'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateOrder } from '../../../actions';

export default async function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: { user: true, course: true }
  });

  if (!order) notFound();

  const handleUpdate = updateOrder.bind(null, order.id);

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '15px' }}>
        <Link href="/admin/orders" style={{ padding: '8px 12px', backgroundColor: '#E5E7EB', borderRadius: '8px', textDecoration: 'none', color: '#374151', fontWeight: 600 }}>
          ← Quay lại
        </Link>
        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--dark-accent)' }}>Chi Tiết Đơn Hàng</h1>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* Update Form (Left side) */}
        <form action={handleUpdate} style={{ flex: 2, backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ padding: '15px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <p style={{ margin: '0 0 10px 0', color: '#6B7280', fontSize: '0.9rem' }}>Thông tin đơn hàng:</p>
            <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1F2937' }}>Mã: #{order.id.slice(-6).toUpperCase()}</h2>
            <p style={{ margin: '5px 0', fontWeight: 600, color: 'var(--primary-green)' }}>Khóa học: {order.course?.title}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: '#374151' }}>Số Tiền Thanh Toán (đ)</label>
            <input type="number" name="totalAmount" defaultValue={order.totalAmount} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: '#374151' }}>Trạng Thái Đơn Hàng</label>
            <select name="status" defaultValue={order.status} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '1rem', backgroundColor: '#FFFBEB' }}>
              <option value="PENDING">Chờ Xử Lý (Chưa thanh toán)</option>
              <option value="COMPLETED">Đã Thanh Toán (Học viên vào học được ngay)</option>
            </select>
          </div>

          <button type="submit" style={{ marginTop: '10px', padding: '15px', backgroundColor: 'var(--primary-green)', color: 'white', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Lưu Thay Đổi
          </button>
        </form>

        {/* User Info (Right side) */}
        <div style={{ flex: 1, backgroundColor: '#EFF6FF', padding: '24px', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
           <h3 style={{ margin: '0 0 15px 0', color: '#1E40AF', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Tài Khoản Học Viên
           </h3>
           
           <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#3B82F6', fontWeight: 600 }}>Thông tin đăng ký của khách:</p>
           
           <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '8px', marginBottom: '10px', border: '1px solid #DBEAFE', wordBreak: 'break-all' }}>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '3px' }}>Họ Tên:</div>
              <div style={{ fontWeight: 600, color: '#111827' }}>{order.user?.name}</div>
           </div>

           <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '8px', marginBottom: '10px', border: '1px solid #DBEAFE', wordBreak: 'break-all' }}>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '3px' }}>Email đăng nhập:</div>
              <div style={{ fontWeight: 600, color: '#111827' }}>{order.user?.email}</div>
           </div>
           
        </div>
      </div>
    </div>
  );
}

import prisma from '@/lib/prisma';
import Link from 'next/link';
import { createOrder } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function NewOrderPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  const courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '15px' }}>
        <Link href="/admin/orders" style={{ padding: '8px 12px', backgroundColor: '#E5E7EB', borderRadius: '8px', textDecoration: 'none', color: '#374151', fontWeight: 600 }}>
          ← Quay lại
        </Link>
        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--dark-accent)' }}>Thêm Đơn Hàng Mới</h1>
      </div>

      <form action={createOrder} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Course Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, color: '#374151' }}>Chọn Khóa Học (*)</label>
          <select name="courseId" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '1rem' }}>
            <option value="">-- Chọn Khóa Học --</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.title} - {c.price.toLocaleString()}đ</option>
            ))}
          </select>
        </div>

        {/* User Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, color: '#374151' }}>Học Viên (*)</label>
          <select name="userId" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '1rem' }} id="userSelectElement">
            <option value="">-- Chọn Học Viên đã có --</option>
            <option value="NEW_USER" style={{ fontWeight: 'bold', color: 'var(--primary-green)' }}>+ Tạo Học Viên Mới (Điền thông tin bên dưới)</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
            ))}
          </select>
          
          {/* New User Fields (hidden by default unless logic is handled by client component, but we will use CSS / basic JS)*/}
          <div style={{ display: 'none', flexDirection: 'column', gap: '10px', marginTop: '10px', padding: '15px', backgroundColor: '#F9FAFB', border: '1px dashed #D1D5DB', borderRadius: '8px' }}>
             <p style={{ margin: 0, fontSize: '0.9rem', color: '#6B7280', fontWeight: 600 }}>Cấp tài khoản mới cho học viên:</p>
             <input type="text" name="newUserName" placeholder="Tên học viên..." style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
             <input type="email" name="newUserEmail" placeholder="Email học viên..." style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
             <input type="text" name="newUserPassword" placeholder="Mật khẩu (Mặc định: 12345678)" defaultValue="12345678" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
             <p style={{ margin: 0, fontSize: '0.8rem', color: '#EF4444' }}>* Mật khẩu mặc định là 12345678 nếu bỏ trống.</p>
          </div>
          {/* A small inline script to handle select change to show/hide new user UI natively */}
          <script dangerouslySetInnerHTML={{ __html: `
            document.getElementById("userSelectElement").addEventListener("change", function(e) {
               this.nextElementSibling.style.display = e.target.value === "NEW_USER" ? "flex" : "none";
            });
          `}}></script>
        </div>

        {/* Total Amount */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, color: '#374151' }}>Số Tiền Thanh Toán (đ) (*)</label>
          <input type="number" name="totalAmount" defaultValue={0} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '1rem' }} />
        </div>

        {/* Status Option */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, color: '#374151' }}>Trạng Thái Đơn Hàng</label>
          <select name="status" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '1rem' }}>
            <option value="PENDING">Chờ Xử Lý (Chưa thanh toán)</option>
            <option value="COMPLETED">Đã Thanh Toán (Học viên vào học được ngay)</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: '10px', padding: '15px', backgroundColor: 'var(--primary-green)', color: 'white', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
          Lưu Đơn Hàng
        </button>

      </form>
    </div>
  );
}

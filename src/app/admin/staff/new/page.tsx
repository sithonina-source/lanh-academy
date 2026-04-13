'use client';

import { createStaff } from '../actions';
import Link from 'next/link';

export default function NewStaffPage() {
  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '15px' }}>
        <Link href="/admin/staff" style={{ padding: '8px 12px', backgroundColor: '#E5E7EB', borderRadius: '8px', textDecoration: 'none', color: '#374151', fontWeight: 600 }}>
          ← Quay lại
        </Link>
        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--dark-accent)' }}>Thêm Nhân Sự Mới</h1>
      </div>
      
      <form action={createStaff} style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        
        {/* Thông tin tài khoản */}
        <div style={{ flex: '1 1 400px', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: 0, color: 'var(--dark-accent)' }}>Thông tin tài khoản</h3>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Họ và Tên *</label>
            <input type="text" name="name" required placeholder="Nguyễn Văn A" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Email đăng nhập *</label>
            <input type="email" name="email" required placeholder="nhanvien@lanh.com" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
          </div>

          <div style={{ padding: '15px', backgroundColor: '#FEF2F2', border: '1px dashed #F87171', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: '#DC2626', fontSize: '0.9rem', fontWeight: 600 }}>Lưu ý về Mật khẩu:</p>
            <p style={{ margin: '5px 0 0 0', color: '#991B1B', fontSize: '0.85rem' }}>Hệ thống sẽ tự động cấp mật khẩu mặc định là <strong>123456</strong>. Nhân viên có thể tự đổi lại sau khi đăng nhập.</p>
          </div>
        </div>

        {/* Phân Quyền */}
        <div style={{ flex: '1 1 300px', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: 'var(--dark-accent)' }}>Cấp Quyền Truy Cập (Tabs)</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
              <input type="checkbox" name="perm_courses" style={{ width: '20px', height: '20px', accentColor: 'var(--primary-green)' }} />
              <span style={{ fontWeight: 600, color: '#374151' }}>📚 Quản lý Khóa Học</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
              <input type="checkbox" name="perm_orders" style={{ width: '20px', height: '20px', accentColor: 'var(--primary-green)' }} />
              <span style={{ fontWeight: 600, color: '#374151' }}>🛒 Xử lý Đơn Hàng</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
              <input type="checkbox" name="perm_blogs" style={{ width: '20px', height: '20px', accentColor: 'var(--primary-green)' }} />
              <span style={{ fontWeight: 600, color: '#374151' }}>✍️ Viết Bài Blog</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '1.1rem', width: '100%', marginTop: '30px' }}>
            ✅ Tạo Tài Khoản Staff
          </button>
        </div>

      </form>
    </div>
  );
}

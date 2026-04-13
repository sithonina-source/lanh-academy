'use client';

import { useState } from 'react';
import { loginAdmin } from './actions';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const res = await loginAdmin(formData);
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: 'var(--primary-green)', margin: '0 0 10px 0' }}>🌿 Lành Admin</h1>
          <p style={{ color: '#6B7280', margin: 0 }}>Cổng đăng nhập Quản Trị Viên & Nhân Sự</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '10px 15px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>Email đăng nhập</label>
            <input type="email" name="email" required placeholder="admin@lanh.com" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>Mật khẩu</label>
            <input type="password" name="password" required placeholder="••••••" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '1rem', marginTop: '10px' }}>
            Đăng nhập hệ thống
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '0.85rem', color: '#9CA3AF' }}>
           Liên hệ 0909 000 999 nếu quên mật khẩu.
        </p>
      </div>
    </div>
  );
}

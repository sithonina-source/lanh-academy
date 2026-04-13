'use client';

import Link from 'next/link';
import { useState } from 'react';
import { loginUser } from './actions';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const res = await loginUser(formData);
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '50px 40px', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--dark-accent)', marginBottom: '12px', fontWeight: 800 }}>Đăng Nhập</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '25px', fontSize: '1.05rem' }}>Chào mừng bạn trở lại với Lành Academy</p>
        
        {error && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '10px 15px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            name="email"
            required
            placeholder="Email của bạn" 
            style={{ padding: '14px 18px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '1rem', width: '100%', outline: 'none' }} 
          />
          <input 
            type="password" 
            name="password"
            required
            placeholder="Mật khẩu" 
            style={{ padding: '14px 18px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '1rem', width: '100%', outline: 'none' }} 
          />
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', cursor: 'pointer' }}>Quên mật khẩu?</span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '10px', fontSize: '1.1rem', borderRadius: '12px' }}>
            Đăng nhập
          </button>
        </form>

        <p style={{ marginTop: '25px', color: 'var(--text-muted)' }}>
          Chưa có tài khoản? <Link href="/dang-ky" style={{ color: 'var(--primary-green)', fontWeight: 700 }}>Tham gia ngay</Link>
        </p>
        
        <Link href="/" style={{ color: '#9CA3AF', marginTop: '40px', display: 'inline-block', fontSize: '0.95rem', fontWeight: 500 }}>
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}

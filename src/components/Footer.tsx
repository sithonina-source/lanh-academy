import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A202C', color: 'var(--white)', padding: '80px 0 30px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Top Accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--primary-green) 0%, var(--secondary-green) 100%)' }}></div>
      
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', marginBottom: '60px' }}>
          
          {/* Brand Info */}
          <div style={{ paddingRight: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <img src="/logo.png" alt="Lành Academy Logo" style={{ width: '200px', height: 'auto', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p style={{ color: '#A0AEC0', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Nơi ươm mầm sự sáng tạo qua từng sản phẩm mộc mạc. Hành trình thủ công bắt đầu từ đôi bàn tay và trái tim.
            </p>
            {/* Social Icons Placeholder */}
            <div style={{ display: 'flex', gap: '15px' }}>
              {['FB', 'IG', 'YT', 'TT'].map(social => (
                <div key={social} className="footer-icon">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 style={{ color: 'var(--white)', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 600 }}>Khám phá</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Tất cả khóa học', 'Khóa mới nổi bật', 'Workshop Offline', 'Câu chuyện thương hiệu', 'Blog sáng tạo'].map(link => (
                <li key={link}>
                  <Link href="#" className="footer-link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 style={{ color: 'var(--white)', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 600 }}>Hỗ trợ</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Trung tâm trợ giúp', 'Điều khoản dịch vụ', 'Chính sách bảo mật', 'Hướng dẫn thanh toán'].map(link => (
                <li key={link}>
                  <Link href="#" className="footer-link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ color: 'var(--white)', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 600 }}>Đăng ký nhận tin</h3>
            <p style={{ color: '#A0AEC0', fontSize: '0.95rem', marginBottom: '16px', lineHeight: 1.6 }}>
              Nhận ngay ưu đãi 10% cho khóa học đầu tiên khi đăng ký bản tin.
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="email" 
                placeholder="Email của bạn..." 
                style={{ padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', fontSize: '1rem' }}
              />
              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 600 }}
              >
                Đăng ký ngay
              </button>
            </form>
          </div>
        </div>

        {/* Copyright section */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div style={{ color: '#718096', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} Lành Academy. Đã đăng ký bản quyền.
          </div>
          <div style={{ display: 'flex', gap: '20px', color: '#718096', fontSize: '0.9rem' }}>
            <span>Made with 💚 by Lành Workshop</span>
          </div>
        </div>
      </div>
      
      {/* Decorative background blur */}
      <div style={{ position: 'absolute', bottom: '-150px', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(140,198,63,0.15) 0%, rgba(26,32,44,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
    </footer>
  );
}

import Link from 'next/link';

export default function CallToAction() {
  return (
    <section style={{ backgroundColor: 'var(--dark-accent)', color: 'white', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(140, 198, 63, 0.15) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '20px', color: 'white' }}>
          Sẵn sàng bắt đầu hành trình sáng tạo?
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#CBD5E1', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
          Hàng ngàn học viên đã tìm thấy niềm vui và sự chữa lành qua các lớp học mộc mạc của Lành Academy. Đừng bỏ lỡ cơ hội khám phá khả năng của chính bạn.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/khoa-hoc" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(140, 198, 63, 0.4)' }}>
            Khám phá khoá học ngay
          </Link>
          <Link href="/dang-ky" className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '12px', backgroundColor: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
            Đăng ký tài khoản miễn phí
          </Link>
        </div>
      </div>
    </section>
  );
}

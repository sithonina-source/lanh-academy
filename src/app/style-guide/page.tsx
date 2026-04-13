import React from 'react';

export const metadata = {
  title: 'Style Guide | Lành Academy',
};

export default function StyleGuidePage() {
  return (
    <div className="container section">
      <div className="text-center" style={{ marginBottom: '60px' }}>
        <h1>Lành Academy - Design System</h1>
        <p>Phiên bản 1.0 - Hệ thống màu sắc, typography và UI components tĩnh</p>
      </div>

      {/* Colors Section */}
      <section style={{ marginBottom: '60px' }}>
        <h2>1. Màu sắc thương hiệu (Color Palette)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '100%', height: '80px', backgroundColor: 'var(--primary-green)', borderRadius: '8px', marginBottom: '10px' }}></div>
            <strong>Primary</strong>
            <p style={{ fontSize: '14px', margin: 0 }}>#6DC135</p>
          </div>
          <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '100%', height: '80px', backgroundColor: 'var(--secondary-green)', borderRadius: '8px', marginBottom: '10px' }}></div>
            <strong>Secondary</strong>
            <p style={{ fontSize: '14px', margin: 0 }}>#4CAF50</p>
          </div>
          <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '100%', height: '80px', backgroundColor: 'var(--dark-accent)', borderRadius: '8px', marginBottom: '10px' }}></div>
            <strong>Dark Accent</strong>
            <p style={{ fontSize: '14px', margin: 0 }}>#2D7A1F</p>
          </div>
          <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '100%', height: '80px', backgroundColor: 'var(--background-mint)', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px' }}></div>
            <strong>BG Mint</strong>
            <p style={{ fontSize: '14px', margin: 0 }}>#F5F9F0</p>
          </div>
          <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '100%', height: '80px', backgroundColor: 'var(--text-dark)', borderRadius: '8px', marginBottom: '10px' }}></div>
            <strong>Text Dark</strong>
            <p style={{ fontSize: '14px', margin: 0 }}>#3A3A3A</p>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section style={{ marginBottom: '60px' }}>
        <h2>2. Nghệ thuật chữ (Typography)</h2>
        <p>Font chính: <strong>Be Vietnam Pro</strong> (Sáng tạo, gần gũi, truyền cảm hứng).</p>
        <div className="card" style={{ padding: '30px', marginTop: '20px' }}>
          <h1>Heading 1 - Khám phá Workshop DIY</h1>
          <h2>Heading 2 - Lành Academy</h2>
          <h3>Heading 3 - Khóa học nổi bật</h3>
          <p>
            Đoạn văn cơ bản (Body text) - Lành Academy cần một website bán khóa học online chuyên về workshop DIY thủ công — nơi người học có thể khám phá, đăng ký và theo học các khóa làm đồ thủ công (macrame, candle making, resin art, pressed flower, v.v.). Website phải truyền được cảm giác xanh lành, sáng tạo, gần gũi — đúng với tinh thần thương hiệu.
          </p>
        </div>
      </section>

      {/* Buttons Section */}
      <section style={{ marginBottom: '60px' }}>
        <h2>3. Nút bấm (Buttons)</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px', alignItems: 'center' }}>
          <button className="btn btn-primary">Khám phá khóa học</button>
          <button className="btn btn-primary btn-lg">Tham gia ngay hôm nay</button>
          <button className="btn btn-outline">Xem chi tiết</button>
        </div>
      </section>

      {/* Inputs & Cards Section */}
      <section style={{ marginBottom: '60px' }}>
        <h2>4. Thẻ & Form (Cards & Forms)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '20px' }}>
          
          <div className="card">
            <div style={{ backgroundColor: '#e0e0e0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span>[Course Image placeholder]</span>
            </div>
            <div style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Candle Making</span>
              <h3 style={{ fontSize: '1.25rem', marginTop: '5px' }}>Làm Nến Thơm - Cơ Bản</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>12 bài học • 350.000đ</p>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Đăng ký học</button>
            </div>
          </div>

          <div className="card" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>Đăng ký nhận Newsletter</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Tên của bạn</label>
                <input type="text" className="input-field" placeholder="VD: Lan Anh" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}>Email</label>
                <input type="email" className="input-field" placeholder="lananh@example.com" />
              </div>
              <button className="btn btn-primary">Gửi ngay</button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}

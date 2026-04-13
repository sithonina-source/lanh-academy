import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import CallToAction from '@/components/CallToAction';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section className="section" style={{ padding: '80px 0', textAlign: 'center', backgroundColor: '#ECFDF5' }}>
          <div className="container">
            <span style={{ color: 'var(--primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>Về Lành Academy</span>
            <h1 style={{ fontSize: '3rem', margin: '0 0 20px 0', color: 'var(--dark-accent)' }}>Câu chuyện của chúng tôi</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
              Bắt đầu từ một xưởng thủ công nhỏ, Lành Workshop mong muốn mang lại sự bình yên và không gian chữa lành qua từng sản phẩm thủ công mộc mạc nhất.
            </p>
          </div>
        </section>
        
        <section className="section" style={{ padding: '80px 0' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
              <Image src="/472988478_122204505116040203_2103331358923584371_n.jpg" alt="Câu chuyện Lành Workshop" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--dark-accent)', marginBottom: '20px', fontWeight: 800 }}>Hành trình thủ công</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px' }}>
                Chúng tôi tin rằng, khi tự tay làm ra một món đồ thủ công, bạn không chỉ tạo ra một sản phẩm đẹp mà còn gửi trọn tâm huyết và sự tĩnh lặng của tâm hồn vào đó.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Lành Academy được sinh ra để trở thành cầu nối, giúp bất kỳ ai cũng có thể tiếp cận với hoa đất sét, resin art hay làm nến thơm một cách dễ dàng và đầy cảm hứng nhất. Trải qua những ngày làm việc mệt mỏi, nghệ thuật thủ công chính là liều thuốc chữa lành mọi mệt nhọc của bạn.
              </p>
            </div>
          </div>
        </section>

        <section className="section" style={{ padding: '80px 0', backgroundColor: 'white' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--dark-accent)', marginBottom: '50px', fontWeight: 800 }}>Giá trị cốt lõi</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              {[
                { title: '🌱 Tận tâm', desc: 'Mọi khóa học đều được thiết kế chi tiết, tỷ mỉ từ góc quay đến âm thanh, tận tình hướng dẫn bạn từng bước nhỏ nhất.' },
                { title: '🎨 Sáng tạo', desc: 'Không giới hạn khả năng sáng tạo. Mỗi học viên là một nghệ sĩ độc bản với những tác phẩm mang dấu ấn riêng.' },
                { title: '🪴 Mộc mạc', desc: 'Trân trọng sự tinh tế của nguyên liệu tự nhiên và những điều giản đơn để tạo nên những rung cảm đẹp đẽ nhất.' },
              ].map(item => (
                <div key={item.title} style={{ padding: '40px 30px', backgroundColor: '#F9FAFB', borderRadius: '16px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-green)', marginBottom: '15px', fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CallToAction />
      <Footer />
    </div>
  );
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma'; // Kết nối Database
import CallToAction from '@/components/CallToAction';

export default async function BlogPage() {
  // Lấy các bài viết mới nhất từ Database
  let blogs = [];
  try {
    blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error(error);
  }

  // Fallback bài viết mẫu (nếu chưa có bài nào trong DB)
  const displayBlogs = blogs.length > 0 ? blogs : [
    { id: '1', title: '5 Bí quyết nhào đất sét Polymer không bị nứt', excerpt: 'Đất sét polymer rất dễ nứt nếu bạn nhào chưa đủ nhiệt. Cùng xem bí quyết...', tag: 'Đất sét', imageUrl: '/472988478_122204505116040203_2103331358923584371_n.jpg' },
    { id: '2', title: 'Gợi ý phối màu nến thơm chuẩn phong cách Rustic', excerpt: 'Phong cách Rustic yêu cầu sự hài hòa của màu sắc tự nhiên. Hãy khám phá...', tag: 'Nến thơm', imageUrl: '/476632834_122149501028393433_2815148235107927880_n.jpg' },
    { id: '3', title: 'Làm thế nào để bắt đầu với Resin Art lấp lánh?', excerpt: 'Hướng dẫn cho người mới từ việc chọn loại keo phù hợp đến cách pha trộn hiệu ứng...', tag: 'Resin', imageUrl: '/473997559_122146957868393433_3798468804797401311_n.jpg' }
  ];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section className="section" style={{ padding: '80px 0', textAlign: 'center', backgroundColor: '#ECFDF5' }}>
          <div className="container">
            <span style={{ color: 'var(--primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>Góc Cảm Hứng</span>
            <h1 style={{ fontSize: '3rem', margin: '0 0 20px 0', color: 'var(--dark-accent)', fontWeight: 800 }}>Chuyện nhà Lành</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
              Chia sẻ những bí quyết DIY, mẹo chế tác thú vị và các câu chuyện làm nghề để mang đến cho bạn niềm vui nhỏ bé mỗi ngày.
            </p>
          </div>
        </section>

        <section className="section" style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              {displayBlogs.map(blog => (
                <div key={blog.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'all 0.3s ease', cursor: 'pointer' }} className="blog-card">
                  <div style={{ position: 'relative', height: '240px', width: '100%', borderBottom: '1px solid #F3F4F6' }}>
                    <Image src={blog.imageUrl.startsWith('/') ? blog.imageUrl : `/${blog.imageUrl}`} alt={blog.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: 'var(--primary-green)', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                      {blog.tag}
                    </div>
                  </div>
                  <div style={{ padding: '30px' }}>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-accent)', marginBottom: '12px', lineHeight: 1.4, fontWeight: 700 }}>{blog.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '25px' }}>{blog.excerpt}</p>
                    <Link href={`#`} style={{ color: 'var(--primary-green)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
                      Đọc tiếp <span>→</span>
                    </Link>
                  </div>
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

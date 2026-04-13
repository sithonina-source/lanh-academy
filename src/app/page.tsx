import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import CallToAction from '@/components/CallToAction';
import { testimonials } from '../data/mock';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dbCourses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6
  });

  const coursesToRender = dbCourses.map(course => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    category: course.category,
    instructor: course.instructor,
    duration: course.duration,
    level: course.level,
    lessonsCount: course.lessonsCount,
    quizzesCount: 10,
    studentsCount: 234,
    description: course.description,
    price: course.discountPrice ? course.discountPrice : course.price,
    originalPrice: course.discountPrice ? course.price : undefined,
    discountEndsAt: course.discountEndsAt?.toISOString(),
    imageUrl: course.imageUrl,
  }));

  return (
    <>
      <Header />
      <main>
        {/* Modern Premium Hero Banner */}
        <section style={{ backgroundColor: '#F9FAFB', padding: '20px 0 30px 0', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
            <div style={{ flex: '1 1 min(100%, 500px)', paddingRight: '20px' }}>
              <span style={{ color: 'var(--primary-green)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '16px', display: 'block' }}>
                Tinh hoa đồ thủ công
              </span>
              <h1 style={{ fontSize: '3.5rem', lineHeight: 1.15, marginBottom: '24px', color: 'var(--dark-accent)' }}>
                Nghệ thuật Sáng tạo <br/>
                <span style={{ color: 'var(--primary-green)' }}>Từ Đôi Bàn Tay</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: 1.6, maxWidth: '90%' }}>
                Tìm lại sự cân bằng qua từng món đồ thủ công. Nơi cảm hứng gặp gỡ nghệ thuật, và những thiết kế mộc mạc làm bừng sáng không gian sống của bạn.
              </p>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/khoa-hoc" className="btn btn-primary btn-lg">Khám phá lớp học</Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--secondary-green)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</div>
                  <span style={{ fontWeight: 700, color: 'var(--dark-accent)' }}>Xem Video</span>
                </div>
              </div>
            </div>
            
            {/* Premium Floating Image Feature */}
            <div style={{ flex: '1 1 min(100%, 500px)', position: 'relative', height: '480px' }}>
              <div style={{ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)', width: '100%', height: '440px', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                 <Image src="/hero_workshop_banner_1775803632274.png" alt="Lành Academy Workshop" fill style={{ objectFit: 'cover' }} priority />
              </div>
              <div style={{ position: 'absolute', bottom: '40px', left: '-30px', backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '20px', zIndex: 10 }}>
                <div style={{ backgroundColor: '#E8F5E9', padding: '16px', borderRadius: '50%' }}>✨</div>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 800 }}>+5.000</h4>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Học viên hài lòng</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decorative blob */}
          <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(140,198,63,0.08) 0%, rgba(255,255,255,0) 70%)', zIndex: 1 }}></div>
        </section>

        {/* Statistics Banner */}
        <section style={{ backgroundColor: 'var(--primary-green)', padding: '50px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '30px', textAlign: 'center', color: 'white' }}>
              <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px 0' }}>2,000+</h3>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>Học viên đã tham gia</p>
              </div>
              <div style={{ borderRight: '1px solid rgba(255,255,255,0.2)' }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px 0' }}>20+</h3>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>Khóa học DIY</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px 0' }}>30+</h3>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>Tỉnh thành toàn quốc</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px 0' }}>4.9 ★</h3>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>Đánh giá trung bình</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="section" style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span style={{ 
                display: 'inline-block', 
                backgroundColor: '#F0F8E8', 
                color: 'var(--primary-green)', 
                padding: '6px 20px', 
                borderRadius: '100px', 
                fontWeight: 600, 
                fontSize: '0.9rem', 
                marginBottom: '16px' 
              }}>
                Khóa học nổi bật
              </span>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--dark-accent)', marginBottom: '12px', fontWeight: 800 }}>Chọn workshop yêu thích của bạn</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Tất cả khóa học đều có video hướng dẫn chi tiết, học mọi lúc mọi nơi</p>
            </div>
            
            {/* Nav Filter Pills & Down Arrow */}
            <div style={{ position: 'relative', marginBottom: '70px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
                 <button style={{ padding: '8px 24px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', fontWeight: 600, color: 'var(--text-dark)', cursor: 'pointer' }}>Tất cả</button>
                 <button style={{ padding: '8px 24px', backgroundColor: 'transparent', border: '1px solid #E5E7EB', borderRadius: '8px', fontWeight: 600, color: 'var(--text-dark)', cursor: 'pointer' }}>Macrame</button>
                 <button style={{ padding: '8px 24px', backgroundColor: 'transparent', border: '1px solid #E5E7EB', borderRadius: '8px', fontWeight: 600, color: 'var(--text-dark)', cursor: 'pointer' }}>Nến thơm</button>
                 <button style={{ padding: '8px 24px', backgroundColor: 'transparent', border: '1px solid #E5E7EB', borderRadius: '8px', fontWeight: 600, color: 'var(--text-dark)', cursor: 'pointer' }}>Resin Art</button>
                 <button style={{ padding: '8px 24px', backgroundColor: 'transparent', border: '1px solid #E5E7EB', borderRadius: '8px', fontWeight: 600, color: 'var(--text-dark)', cursor: 'pointer' }}>Hoa khô</button>
                 <button style={{ padding: '8px 24px', backgroundColor: 'transparent', border: '1px solid #E5E7EB', borderRadius: '8px', fontWeight: 600, color: 'var(--text-dark)', cursor: 'pointer' }}>Terrarium</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15px', position: 'absolute', left: 0, right: 0, zIndex: 3 }}>
                 <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', color: 'var(--dark-accent)', fontWeight: 'bold' }}>
                   ↓
                 </div>
              </div>
            </div>
            
            <div className="grid-courses">
              {coursesToRender.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="section" style={{ backgroundColor: '#F0F8E8', padding: '60px 0', overflow: 'hidden' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '80px', flexWrap: 'wrap' }}>
            
            {/* Image Side */}
            <div style={{ flex: '1 1 min(100%, 400px)', position: 'relative', minHeight: '400px' }}>
              <div style={{ position: 'relative', width: '100%', height: '550px', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <Image src="/about_lanh_academy_workshop.png" alt="Lành Academy Workspace" fill style={{ objectFit: 'cover' }} />
              </div>
              
              {/* Decorative elements */}
              <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '120px', height: '120px', backgroundImage: 'radial-gradient(var(--primary-green) 20%, transparent 20%)', backgroundSize: '15px 15px', zIndex: -1 }}></div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '140px', height: '140px', backgroundColor: 'var(--secondary-green)', borderRadius: '50%', zIndex: -1, opacity: 0.2 }}></div>
            </div>

            {/* Content Side */}
            <div style={{ flex: '1 1 min(100%, 400px)' }}>
              <span style={{ color: 'var(--primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>Về Lành Academy</span>
              <h2 style={{ fontSize: '3rem', margin: '0 0 24px 0', color: 'var(--dark-accent)', lineHeight: 1.2 }}>
                Thắp sáng nghệ thuật <br />
                <span style={{ color: 'var(--primary-green)' }}>từ sự mộc mạc</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '30px' }}>
                Chúng tôi tin rằng trong mỗi con người đều ẩn chứa một người nghệ sĩ. Lành Academy không chỉ là nơi chia sẻ kỹ năng, mà là "nơi trú ẩn" ấm áp để bạn <strong>sống chậm lại</strong> và tìm thấy niềm vui trong việc tự tay làm nên một món đồ thủ công.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  '100% Nguyên vật liệu tự nhiên, thân thiện với môi trường.',
                  'Đội ngũ giáo viên lành nghề, tận tâm "cầm tay chỉ việc".',
                  'Cộng đồng sáng tạo văn minh, chia sẻ đam mê bất tận.',
                  'Bảo hành chất lượng sản phẩm & Đồng hành trọn đời.'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, marginTop: '2px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ fontSize: '1.05rem', color: 'var(--text-dark)', fontWeight: 500 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/gioi-thieu" className="btn btn-primary btn-lg" style={{ padding: '16px 36px', display: 'inline-block' }}>
                Tìm hiểu câu chuyện của Lành
              </Link>
            </div>

          </div>
        </section>

        {/* Post-Course Support / Benefits Section */}
        <section className="section" style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '60px' }}>
              <span style={{ color: 'var(--primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>Quyền Lợi Độc Quyền</span>
              <h2 style={{ fontSize: '2.5rem', margin: '0 0 15px 0' }}>Đồng Hành Cùng Bạn Trọn Đời</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                Hành trình sáng tạo không dừng lại khi video bài giảng kết thúc. Lành Academy cam kết sát cánh bên bạn từ những mũi đan đầu tiên cho đến khi có thể tự mở thương hiệu riêng.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              {[
                { 
                  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, 
                  title: 'Cộng đồng riêng tư', 
                  desc: 'Truy cập vào Group kín của các thành viên cực chất để khoe thành phẩm và chia sẻ bí kíp DIY.' 
                },
                { 
                  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>, 
                  title: 'Nhập vật liệu Giá Sỉ', 
                  desc: 'Học viên của Lành được tận hưởng đặc quyền mua Len, Sáp, Khuôn... với bảng giá chiết khấu từ NPP đối tác.' 
                },
                { 
                  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>, 
                  title: 'Chứng nhận hoàn thành', 
                  desc: 'Nhận ngay chứng chỉ xinh xắn từ Lành Academy để tự tin bắt đầu dự án kinh doanh đồ thủ công của riêng bạn.' 
                }
              ].map((feature, idx) => (
                <div key={idx} style={{ padding: '30px', backgroundColor: '#F9FAFB', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.3s ease, boxShadow 0.3s ease' }} className="feature-card">
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#E8F5E9', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--dark-accent)' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Premium Testimonial */}
        <section className="section" style={{ backgroundColor: '#F9FAFB', padding: '60px 0' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '60px' }}>
              <h2 style={{ fontSize: '2.5rem' }}>Cảm nhận từ Học viên</h2>
              <p style={{ color: 'var(--text-muted)' }}>Dấu ấn và kỷ niệm đáng quý từ những người cùng chung đam mê</p>
            </div>
            
            <div className="mobile-carousel" style={{ padding: '0 5px' }}>
              {testimonials.map(t => (
                <div key={t.id} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid #f0f0f0' }}>
                  <div style={{ color: '#FCD34D', fontSize: '1.5rem', marginBottom: '20px' }}>★★★★★</div>
                  <p style={{ fontSize: '1.15rem', fontStyle: 'italic', marginBottom: '30px', color: 'var(--text-dark)', lineHeight: 1.7 }}>{t.content}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid var(--primary-green)' }}>
                      {(t as any).avatarUrl ? (
                        <Image src={(t as any).avatarUrl} alt={t.name} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                          {t.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--dark-accent)' }}>{t.name}</h4>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog / Inspiration Section */}
        <section className="section" style={{ backgroundColor: '#ffffff', padding: '60px 0', borderTop: '1px solid #F3F4F6' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <span style={{ color: 'var(--primary-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>Góc Cảm Hứng</span>
                <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--dark-accent)' }}>Chuyện nhà Lành</h2>
              </div>
              <Link href="/blog" className="btn btn-outline">Xem tất cả bài viết →</Link>
            </div>

            <div className="mobile-carousel">
              {[
                {
                  title: 'Top 5 loại sáp làm nến thơm an toàn cho sức khỏe',
                  excerpt: 'Mùi hương định hình không gian sống, nhưng độ an toàn của sáp nến mới là yếu tố quan trọng nhất. Cùng Lành tìm hiểu nhé.',
                  date: '10 Tháng 4, 2026',
                  tag: 'Nến thơm',
                  imageUrl: '491271846_122221522208040203_9122635507575025973_n.jpg'
                },
                {
                  title: 'Hướng dẫn đan Macrame trang trí tường phong cách Boho',
                  excerpt: 'Chỉ với chiếc dây thừng cotton và vài nút thắt cơ bản, bạn có thể biến bức tường trống trải thành điểm nhấn nghệ thuật.',
                  date: '05 Tháng 4, 2026',
                  tag: 'Macrame',
                  imageUrl: '491920804_122221522262040203_6298781457854458016_n.jpg'
                },
                {
                  title: 'Bí quyết pha màu Resin Art trong suốt như pha lê',
                  excerpt: 'Lỗi thường gặp nhất của người mới chơi Resin Art là bọt khí và màu bị đục. Bài viết này sẽ giúp bạn khắc phục triệt để.',
                  date: '28 Tháng 3, 2026',
                  tag: 'Resin',
                  imageUrl: '528557863_122179504916393433_3501995056418838829_n.jpg'
                }
              ].map((blog, idx) => (
                <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #F3F4F6', transition: 'transform 0.3s ease', cursor: 'pointer', backgroundColor: 'white' }}>
                  {/* Image Element */}
                  <div style={{ width: '100%', paddingTop: '65%', position: 'relative' }}>
                    <Image src={`/${blog.imageUrl}`} alt={blog.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'white', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--dark-accent)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      {blog.tag}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div style={{ padding: '24px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '12px', display: 'block', fontWeight: 500 }}>{blog.date}</span>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--dark-accent)', lineHeight: 1.4 }}>{blog.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>{blog.excerpt}</p>
                    <span style={{ color: 'var(--primary-green)', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Đọc tiếp <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CallToAction />
      <Footer />
    </>
  );
}

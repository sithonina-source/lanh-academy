import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import CourseCard from '@/components/CourseCard';

export default async function CourseDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  
  const decodedSlug = decodeURIComponent(slug);
  
  const course = await prisma.course.findUnique({
    where: { slug: decodedSlug },
    include: {
      modules: {
        include: { lessons: { orderBy: { createdAt: 'asc' } } },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!course) {
    notFound();
  }

  // Fetch 3 recommended courses (excluding the current one)
  const recommendedCourses = await prisma.course.findMany({
    where: { slug: { not: decodedSlug } },
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: {
      modules: { include: { lessons: true } }
    }
  });

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      {/* Top Breadcrumb & Title Area */}
      <div style={{ backgroundColor: '#F3F4F6', padding: '40px 0', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container" style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '20px' }}>
             <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Trang chủ</Link>
             <span style={{ margin: '0 8px' }}>›</span>
             <Link href="/khoa-hoc" style={{ color: '#6B7280', textDecoration: 'none' }}>Khóa học</Link>
          </div>

          <h1 style={{ fontSize: '2.5rem', color: '#111827', margin: '0 0 15px 0', fontWeight: 700, lineHeight: 1.2, maxWidth: '800px' }}>
            {course.title}
          </h1>

          <div style={{ fontSize: '1.1rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '10px' }}>
             by <span style={{ fontWeight: 600, color: '#111827' }}>{course.instructor}</span>
          </div>

          <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#6B7280' }}>
            Cập nhật lần cuối: {new Date(course.updatedAt).toLocaleDateString('vi-VN')}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Left Column: Details */}
        <div style={{ flex: '1 1 600px', backgroundColor: 'white', padding: '40px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          
          <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#374151', marginBottom: '40px', whiteSpace: 'pre-line' }}>
             {course.description}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '40px 0' }} />

          {/* Curriculum / Chương trình giáo dục */}
          <h2 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '10px', fontWeight: 700 }}>Chương trình giáo dục</h2>
          <div style={{ fontSize: '0.95rem', color: '#6B7280', marginBottom: '20px', display: 'flex', gap: '15px' }}>
             <span>{course.modules.length} Chương</span>
             <span>•</span>
             <span>{course.lessonsCount} Bài học</span>
             <span>•</span>
             <span>{course.duration}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
             {course.modules.length > 0 ? course.modules.map((m, idx) => (
                <details key={m.id} style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }} open={idx === 0}>
                  <summary style={{ padding: '16px 20px', backgroundColor: '#F9FAFB', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: '#374151', listStyle: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      {m.title}
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 400 }}>{m.lessons.length} bài</span>
                  </summary>
                  <div style={{ backgroundColor: 'white', borderTop: '1px solid #E5E7EB', padding: '0 20px' }}>
                    {m.lessons.map((l, lIdx) => (
                      <div key={l.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '15px 0', borderBottom: lIdx === m.lessons.length - 1 ? 'none' : '1px solid #F3F4F6' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                        <span style={{ fontSize: '0.95rem', color: '#4B5563', flex: 1 }}>{l.title}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      </div>
                    ))}
                  </div>
                </details>
             )) : (
               <div style={{ padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '8px', color: '#6B7280', textAlign: 'center' }}>
                 Chương trình đang được cập nhật
               </div>
             )}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '40px 0' }} />

          {/* Instructor Area */}
          <h2 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '20px', fontWeight: 700 }}>Giảng viên:</h2>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#E5E7EB', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
              {/* Replace with actual avatar if available */}
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
            </div>
            <div>
               <h3 style={{ fontSize: '1.2rem', color: '#111827', margin: '0 0 5px 0' }}>{course.instructor}</h3>
               <p style={{ margin: 0, fontSize: '0.9rem', color: '#6B7280' }}>89 Sinh viên  |  2 Khóa học</p>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Widget */}
        <div style={{ width: '380px', flexShrink: 0, position: 'sticky', top: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
             
             {/* Thumbnail Wrapper */}
             <div style={{ width: '100%', height: '220px', position: 'relative', backgroundColor: '#F3F4F6' }}>
                <Image src={course.imageUrl.startsWith('/') ? course.imageUrl : `/${course.imageUrl}`} alt={course.title} fill style={{ objectFit: 'cover' }} />
             </div>

             <div style={{ padding: '24px' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>
                  {course.price === 0 ? 'Miễn phí' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                </div>

                {/* Metadata details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem', color: '#4B5563', marginBottom: '25px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <span style={{ color: '#F59E0B' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg></span>
                     Sinh viên: {course.studentsCount} Sinh viên
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <span style={{ color: '#F59E0B' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg></span>
                     Bài học: {course.lessonsCount} bài học
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <span style={{ color: '#F59E0B' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                     Thời gian: {course.duration}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <span style={{ color: '#F59E0B' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="18" y="3" width="4" height="18"></rect><rect x="10" y="8" width="4" height="13"></rect><rect x="2" y="13" width="4" height="8"></rect></svg></span>
                     Cấp độ: {course.level}
                   </div>
                </div>

                <Link href={`/checkout/${course.id}`} className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '8px', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', fontWeight: 700, backgroundColor: '#F59E0B', color: 'white', border: 'none', textAlign: 'center' }}>
                  Mua Ngay
                </Link>

                <button style={{ width: '100%', marginTop: '15px', padding: '10px', backgroundColor: 'transparent', border: 'none', color: '#6B7280', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                   Chia sẻ
                </button>
             </div>
          </div>
        </div>

      </div>

      {/* Recommended Courses Section */}
      {recommendedCourses.length > 0 && (
         <div style={{ backgroundColor: 'white', padding: '60px 0', borderTop: '1px solid #E5E7EB', marginTop: 'auto' }}>
           <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
             <h2 style={{ fontSize: '1.8rem', color: '#111827', marginBottom: '30px', fontWeight: 700, textAlign: 'center' }}>Khóa Học Đề Xuất</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
               {recommendedCourses.map(rc => (
                 <CourseCard key={rc.id} course={rc as any} />
               ))}
             </div>
           </div>
         </div>
      )}

      <Footer />
    </div>
  );
}

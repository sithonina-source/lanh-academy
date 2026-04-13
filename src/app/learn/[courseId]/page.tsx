import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function LearningPlayerPage({
  params,
  searchParams
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lessonId?: string }>;
}) {
  const { courseId } = await params;
  const { lessonId } = await searchParams;
  
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session')?.value;
  const adminCookie = cookieStore.get('admin_session')?.value;
  
  if (!sessionCookie && !adminCookie) {
    redirect('/dang-nhap');
  }

  let hasAccess = false;
  if (adminCookie) {
    hasAccess = true; // Admin luôn được xem
  } else if (sessionCookie) {
    const user = JSON.parse(sessionCookie);
    const order = await prisma.order.findFirst({
      where: { userId: user.id, courseId: courseId, status: 'PAID' }
    });
    if (order) hasAccess = true;
  }

  if (!hasAccess) {
    redirect('/'); // Quay về trang chủ nếu nhầm link
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: { lessons: { orderBy: { createdAt: 'asc' } } },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!course) notFound();

  // Xác định bài học đang chọn
  let activeLesson = null;
  if (lessonId) {
    // Tìm bài có ID khớp
    activeLesson = course.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);
  }
  
  // Mặc định bài đầu tiên nếu chưa chọn
  if (!activeLesson && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
    activeLesson = course.modules[0].lessons[0];
  }

  return (
    <div className="learning-layout">
      
      {/* Mobile Top Bar */}
      <div className="show-on-mobile" style={{ display: 'none', flexDirection: 'column', backgroundColor: 'white', borderBottom: '1px solid #E5E7EB', width: '100%' }}>
         <div style={{ display: 'flex', padding: '15px 20px', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <Link href={`/khoa-hoc/${course.slug || course.id}`} style={{ color: '#4B5563', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
             </Link>
             <h2 style={{ fontSize: '1.2rem', color: 'var(--primary-green)', fontWeight: 800, margin: 0 }}>LÀNH ACADEMY</h2>
           </div>
           
           <button id="mobileMenuBtn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563', padding: '5px' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
           </button>
         </div>

         {/* Dropdown Menu */}
         <div id="mobileMenuDropdown" style={{ display: 'none', flexDirection: 'column', padding: '0 20px 10px 20px', borderTop: '1px solid #F3F4F6' }}>
            {[
              { name: 'Trang chủ', path: '/', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg> },
              { name: 'Tổng quan', path: `/khoa-hoc/${course.slug || course.id}`, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
              { name: 'Khoá học của tôi', path: '/my-courses', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg> },
              { name: 'Các khoá học', path: '/khoa-hoc', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> },
              { name: 'Group Zalo hỗ trợ', path: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg> }
            ].map((item, idx) => (
              <Link key={idx} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #F3F4F6', color: '#4B5563', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>
                <span style={{ color: '#9CA3AF' }}>{item.icon}</span>
                {item.name}
              </Link>
            ))}
         </div>
         <script dangerouslySetInnerHTML={{ __html: `
            document.getElementById('mobileMenuBtn').addEventListener('click', function() {
               var menu = document.getElementById('mobileMenuDropdown');
               menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
            });
         `}}></script>
      </div>

      {/* Left Sidebar (Navigation) */}
      <nav className="learning-nav">
        <div style={{ padding: '0 20px', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--primary-green)', fontWeight: 800, margin: 0 }}>LÀNH ACADEMY</h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[
            { name: 'Trang chủ', path: '/', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
            { name: 'Tổng quan', path: `/khoa-hoc/${course.slug || course.id}`, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
            { name: 'Khoá học của tôi', path: '/my-courses', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg> },
            { name: 'Các khoá học', path: '/khoa-hoc', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> },
            { name: 'Group Zalo hỗ trợ', path: '#', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> }
          ].map((item, idx) => (
            <Link 
              key={idx} 
              href={item.path} 
              style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 24px', textDecoration: 'none', color: '#4B5563', fontWeight: 500, transition: 'background 0.2s', fontSize: '0.95rem' }} 
            >
              <div style={{ color: '#4B5563' }}>{item.icon}</div>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content (Video Area) */}
      <main className="learning-main">
        <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Video Player */}
          <div className="mobile-video-container" style={{ width: '100%', flex: 1, backgroundColor: 'black', position: 'relative' }}>
            {activeLesson ? (
              activeLesson.videoUrl ? (
                <iframe 
                  src={(function(url) {
                    if (!url) return '';
                    try {
                      const urlObj = new URL(url);
                      let embedUrl = url;
                      if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.get('v')) {
                        embedUrl = `https://www.youtube.com/embed/${urlObj.searchParams.get('v')}`;
                      } else if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/shorts/')) {
                        embedUrl = `https://www.youtube.com/embed/${urlObj.pathname.split('/shorts/')[1]}`;
                      } else if (urlObj.hostname.includes('youtu.be')) {
                        embedUrl = `https://www.youtube.com/embed${urlObj.pathname}`;
                      }
                      
                      // Nếu là YouTube, thêm các tham số tối giản giao diện
                      if (embedUrl.includes('youtube.com/embed')) {
                        return `${embedUrl}?rel=0&modestbranding=1&showinfo=0`;
                      }
                      return embedUrl;
                    } catch(e) {}
                    return url;
                  })(activeLesson.videoUrl)}
                  style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9CA3AF' }}>Bài học này chưa có Video</div>
              )
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9CA3AF' }}>Không tìm thấy bài học nào</div>
            )}
          </div>
          
          {/* Info & Button Below Video */}
          <div className="learning-info-bar">
            <div>
              <p style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#4B5563' }}>
                Module: {course.title}
              </p>
              <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600, color: '#111827' }}>
                 Bài học: {activeLesson?.title || 'Đang tải...'}
                 {activeLesson?.documentUrl && (
                   <a href={activeLesson.documentUrl} target="_blank" rel="noreferrer" style={{ marginLeft: '15px', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', padding: '4px 10px', backgroundColor: '#EFF6FF', color: '#3B82F6', borderRadius: '100px', textDecoration: 'none' }}>
                     📄 Tải PDF
                   </a>
                 )}
              </h2>
            </div>
            
            {(() => {
              const allLessons = course.modules.flatMap(m => m.lessons);
              const activeIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
              const nextLesson = activeIndex >= 0 && activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1] : null;

              if (nextLesson) {
                return (
                  <Link href={`/learn/${course.id}?lessonId=${nextLesson.id}`} style={{ backgroundColor: 'var(--primary-green)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', flexShrink: 0, textDecoration: 'none' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Xác nhận hoàn thành
                  </Link>
                );
              } else {
                return (
                  <Link href={`/khoa-hoc/${course.slug || course.id}`} style={{ backgroundColor: '#F59E0B', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', flexShrink: 0, textDecoration: 'none' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Hoàn thành khóa học
                  </Link>
                );
              }
            })()}
          </div>
        </div>
      </main>

      {/* Right Sidebar (Curriculum) */}
      <aside className="learning-aside">
        
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-green)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            BÀI HỌC TRONG MODULE
          </div>

          {/* Just displaying the first module's header for the general view, as in screenshot */}
          {course.modules.length > 0 && (
            <div>
               <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#111827', display: 'flex', justifyContent: 'space-between' }}>
                 CHƯƠNG 1: MỞ ĐẦU
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
               </h3>
               <div style={{ fontSize: '0.9rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                 <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary-green)', borderRadius: '50%' }}></div>
                 Số lượng: {course.modules[0].lessons.length} bài
               </div>
            </div>
          )}
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
          {course.modules.flatMap(m => m.lessons).map((l, globalIndex) => {
            const isActive = activeLesson?.id === l.id;
            
            const getYoutubeId = (url: string) => {
               try {
                 if (!url) return null;
                 const urlObj = new URL(url);
                 if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.get('v')) return urlObj.searchParams.get('v');
                 if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/shorts/')) return urlObj.pathname.split('/shorts/')[1];
                 if (urlObj.hostname.includes('youtu.be')) return urlObj.pathname.replace('/','');
               } catch(e) { return null; }
               return null;
            };
            const yId = getYoutubeId(l.videoUrl || '');
            const thumbUrl = yId ? `https://img.youtube.com/vi/${yId}/mqdefault.jpg` : `url('/hero_workshop_banner_1775803632274.png')`;

            return (
              <Link 
                key={l.id} 
                href={`/learn/${course.id}?lessonId=${l.id}`} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '12px', 
                  gap: '15px', 
                  backgroundColor: isActive ? '#F0F8E8' : 'white', 
                  textDecoration: 'none',
                  borderRadius: '12px',
                  marginBottom: '10px',
                  border: isActive ? '1px solid var(--primary-green)' : '1px solid transparent'
                }}
              >
                {/* Thumbnail Side */}
                <div style={{ 
                    width: '100px', 
                    height: '65px', 
                    borderRadius: '8px', 
                    backgroundColor: '#E5E7EB', 
                    position: 'relative', 
                    overflow: 'hidden',
                    flexShrink: 0
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: yId ? `url(${thumbUrl})` : thumbUrl, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  
                  {isActive && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(140, 198, 63, 0.4)' }}></div>}
                  
                  {isActive && (
                    <div style={{ position: 'absolute', top: '5px', left: '5px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '4px', padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                       <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary-green)', borderRadius: '50%' }}></div>
                       <span style={{ fontSize: '0.65rem', color: 'white', fontWeight: 600 }}>Đang xem</span>
                    </div>
                  )}

                  <div style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, borderTopLeftRadius: '8px' }}>
                    {globalIndex + 1}
                  </div>
                </div>
                
                {/* Title Side */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.95rem', lineHeight: 1.4, fontWeight: isActive ? 600 : 500, color: isActive ? 'var(--primary-green)' : '#4B5563' }}>
                    Bài {globalIndex + 1}: {l.title}
                  </div>
                </div>
              </Link>
            );
          })}
          {course.modules.length === 0 && (
            <div style={{ padding: '15px 20px', fontSize: '0.9rem', color: '#64748B', textAlign: 'center' }}>Khóa học đang được cập nhật</div>
          )}
        </div>
      </aside>

    </div>
  );
}

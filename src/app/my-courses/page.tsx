import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default async function MyCoursesPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session')?.value;
  
  if (!sessionCookie) {
    redirect('/dang-nhap');
  }

  const user = JSON.parse(sessionCookie);

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
      status: 'PAID'
    },
    include: {
      course: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ backgroundColor: 'white', padding: '40px 0', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.2rem', margin: '0 0 10px 0', color: 'var(--dark-accent)' }}>Góc Học Tập Của Tôi</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>Chào mừng {user.name} trở lại với khoảng trời nghệ thuật riêng tư.</p>
        </div>
      </div>

      <main className="container" style={{ flex: 1, padding: '50px 20px' }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎨</div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--dark-accent)', marginBottom: '15px' }}>Chưa có khóa học nào</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>Hãy chọn cho mình một Workshop phù hợp và bắt đầu đam mê nhé.</p>
            <Link href="/" className="btn btn-primary">Khám phá khóa học ngay</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {orders.map(order => {
              const { course } = order;
              return (
                <div key={order.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s' }}>
                  <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <Image src={course.imageUrl.startsWith('/') ? course.imageUrl : `/${course.imageUrl}`} alt={course.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'var(--primary-green)', color: 'white', padding: '6px 14px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600 }}>
                      Đã Sở Hữu
                    </div>
                  </div>
                  
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px 0', color: 'var(--dark-accent)' }}>{course.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px' }}>Cấp độ: {course.level}</p>
                    
                    {/* Tiến độ (Giả lập) */}
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#6B7280' }}>
                        <span>Tiến độ học tập</span>
                        <span>0%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '5%', height: '100%', backgroundColor: 'var(--primary-green)' }}></div>
                      </div>
                    </div>

                    <Link href={`/learn/${course.id}`} className="btn btn-outline" style={{ display: 'block', textAlign: 'center', width: '100%', padding: '12px', borderRadius: '8px' }}>
                      Vào lớp học ngay ▶
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

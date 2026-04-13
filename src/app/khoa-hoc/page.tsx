import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CourseCard from '../../components/CourseCard';
import prisma from '@/lib/prisma';
import CallToAction from '@/components/CallToAction';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tất cả Khóa học | Lành Academy',
};

export default async function CoursesPage() {
  const dbCourses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' }
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
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>
        {/* Course Header Banner */}
        <div style={{ backgroundColor: '#FDF8F0', padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '15px', color: 'var(--dark-accent)', fontWeight: 800 }}>Đào tạo</h1>
          <p style={{ color: 'var(--text-dark)', maxWidth: '800px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Mang đến giá trị sống xanh và sự thư thái tinh tế qua từng sản phẩm tự tay làm ra. Lành Academy không chỉ là nơi chuyên đào tạo các khóa học Workshop DIY Handmade, mà còn là hành trình lan tỏa tình yêu nghệ thuật và đánh thức sự sáng tạo bên trong bạn.
          </p>
        </div>

        <div className="container" style={{ paddingTop: '50px' }}>
          
          {/* Search and Filter Bar */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '50px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto 50px auto' }}>
            
            {/* Search Input */}
            <div style={{ flex: '1', minWidth: '350px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <input 
                type="text" 
                placeholder="Tìm tên khóa học..." 
                style={{ width: '100%', padding: '15px 20px 15px 50px', borderRadius: '100px', border: '1px solid #D1D5DB', fontSize: '1.05rem', outline: 'none', color: 'var(--text-dark)' }} 
              />
            </div>

            {/* Dropdown Select */}
            <div style={{ width: '250px', position: 'relative' }}>
              <select style={{ width: '100%', padding: '15px 45px 15px 25px', borderRadius: '100px', border: '1px solid #D1D5DB', fontSize: '1.05rem', appearance: 'none', backgroundColor: 'white', outline: 'none', cursor: 'pointer', color: 'var(--text-dark)' }}>
                <option>Tất cả danh mục</option>
                <option>Khóa học Cơ bản</option>
                <option>Khóa học Chuyên sâu</option>
                <option>Workshop Sự kiện</option>
              </select>
              <div style={{ position: 'absolute', top: '50%', right: '25px', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

          </div>

          {/* Courses List */}
          <div className="grid-courses">
            {coursesToRender.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </main>
      <CallToAction />
      <Footer />
    </>
  );
}

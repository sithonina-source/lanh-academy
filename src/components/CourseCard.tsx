import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Countdown from './Countdown';

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  level: string;
  lessonsCount: number;
  quizzesCount: number;
  studentsCount: number;
  description: string;
  price: number;
  originalPrice?: number;
  discountEndsAt?: string;
  imageUrl: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // We use CSS container queries or flex to simulate the horizontal list layout as requested.
  // Wait, the screenshot is specifically a Horizontal layout (List View) with image on the left.
  
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', border: '1px solid #f0f0f0', backgroundColor: 'var(--white)', paddingBottom: '20px' }}>
      
      {/* Real Image */}
      <Link href={`/khoa-hoc/${course.slug}`} style={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden', display: 'block' }}>
        <Image 
          src={course.imageUrl} 
          alt={course.title} 
          fill 
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} 
          className="course-img"
        />
      </Link>
      
      {/* Content Side */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '24px 24px 0 24px' }}>
        <h3 style={{ fontSize: '1.4rem', margin: 0, marginBottom: '10px', color: 'var(--dark-accent)' }}>
          <Link href={`/khoa-hoc/${course.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {course.title}
          </Link>
        </h3>
        
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '12px' }}>
          by <span style={{ fontWeight: 600, color: '#1E40AF' }}>{course.instructor}</span>
        </p>

        {/* Metadata Row with Outline Vector Icons */}
        <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px', flexWrap: 'wrap', lineHeight: 1.5 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {course.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="18" y="3" width="4" height="18"></rect><rect x="10" y="8" width="4" height="13"></rect><rect x="2" y="13" width="4" height="8"></rect></svg>
            {course.level}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            {course.lessonsCount} Bài Học
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.4 7.8A3 3 0 0 0 22 10.9v2.2A3 3 0 0 0 19.4 16c-.7-2-3.1-2-3.8 0A3 3 0 0 1 12 18.5V20c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4c0-.7.9-1.3 1.5-1.9A3 3 0 0 0 6.6 9c-.6-2 1.8-3.1 3.5-2C10.8 7.5 12 6.6 12 5V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2a3 3 0 0 1-2.6 3Z"/></svg>
            {course.quizzesCount} Câu Hỏi
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            {course.studentsCount} Sinh Viên
          </span>
        </div>

        {/* Description snippet */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {course.description}
        </p>
        
        {/* Pricing & Read More Row */}
        <div className="course-footer">
          <div style={{ flex: 1, minWidth: 0, paddingRight: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, color: course.price === 0 ? 'var(--primary-green)' : 'var(--dark-accent)', fontSize: '1.25rem' }}>
                {course.price === 0 ? 'Miễn phí' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
              </span>
              
              {course.originalPrice && course.originalPrice > course.price && (
                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1rem' }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.originalPrice)}
                </span>
              )}
            </div>

            {/* Countdown timer if it's on sale */}
            {course.discountEndsAt && course.originalPrice && (
              <div style={{ maxWidth: '100%' }}>
                <Countdown endsAt={course.discountEndsAt} />
              </div>
            )}
          </div>
          
          <Link href={`/khoa-hoc/${course.slug}`} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '6px', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 4px 6px rgba(140, 198, 63, 0.2)', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

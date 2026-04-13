import { updateCourse } from '../../../actions';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ImagePicker from '@/components/ImagePicker';

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const course = await prisma.course.findUnique({
    where: { id }
  });

  if (!course) notFound();

  const handleUpdate = updateCourse.bind(null, course.id);

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--dark-accent)' }}>Chỉnh Sửa: {course.title}</h1>
      
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <form action={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Tên Khóa Học *</label>
              <input type="text" name="title" required defaultValue={course.title} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Slug (Đường dẫn) *</label>
              <input type="text" name="slug" required defaultValue={course.slug} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Phân Loại</label>
              <input type="text" name="category" defaultValue={course.category} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 0.5 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Thời Lượng</label>
              <input type="text" name="duration" defaultValue={course.duration} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 0.5 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Cấp Độ</label>
              <input type="text" name="level" defaultValue={course.level} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Giá Gốc (VNĐ) *</label>
              <input type="number" name="price" required defaultValue={course.price} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#EF4444' }}>Giá Giảm (Nếu Có)</label>
              <input type="number" name="discountPrice" defaultValue={course.discountPrice || ''} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#EF4444' }}>Hạn cuối Sale (Y-M-D HH:mm)</label>
              <input type="datetime-local" name="discountEndsAt" defaultValue={course.discountEndsAt ? new Date(course.discountEndsAt.getTime() - course.discountEndsAt.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Link Hình Ảnh Bìa</label>
            <ImagePicker name="imageUrl" defaultValue={course.imageUrl} />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 0.3 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Số lượng bài học</label>
              <input type="number" name="lessonsCount" defaultValue={course.lessonsCount} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Mô tả khóa học</label>
              <textarea name="description" rows={3} defaultValue={course.description} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}></textarea>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
             <Link href={`/admin/courses/${course.id}/modules`} className="btn btn-outline" style={{ padding: '14px 24px', fontSize: '1.1rem', backgroundColor: '#F3F4F6', color: '#374151', textDecoration: 'none', borderRadius: '8px', fontWeight: 600 }}>
               📚 Quản lý Giáo Trình (Modules & Videos)
             </Link>
             <button type="submit" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1.1rem' }}>💾 Lưu Thay Đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
}

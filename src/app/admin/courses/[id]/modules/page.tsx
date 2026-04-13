import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createModule, deleteModule, createLesson, deleteLesson, updateLesson } from '../../../actions';
import InlineLesson from './InlineLesson';

export default async function CurriculumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        include: { lessons: true }
      }
    }
  });

  if (!course) notFound();

  const handleCreateModule = createModule.bind(null, course.id);

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '15px' }}>
        <Link href={`/admin/courses/${course.id}/edit`} style={{ padding: '8px 12px', backgroundColor: '#E5E7EB', borderRadius: '8px', textDecoration: 'none', color: '#374151', fontWeight: 600 }}>
          ← Quay lại
        </Link>
        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--dark-accent)' }}>Giáo Trình: {course.title}</h1>
      </div>

      {course.modules.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px dashed #D1D5DB', marginBottom: '30px' }}>
           <p style={{ color: 'var(--text-muted)' }}>Khóa học này chưa có Chương (Module) nào.</p>
        </div>
      )}

      {course.modules.map(mod => {
        const handleDeleteMod = deleteModule.bind(null, course.id, mod.id);
        const handleCreateLes = createLesson.bind(null, course.id, mod.id);

        return (
          <div key={mod.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px', border: '1px solid #E5E7EB' }}>
            
            {/* Module Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #F3F4F6', paddingBottom: '15px', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#1F2937' }}>{mod.title}</h2>
              <form action={handleDeleteMod}>
                <button type="submit" style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Xóa Chương</button>
              </form>
            </div>

            {/* Lessons List */}
            <div style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              {mod.lessons.map(les => {
                const handleDeleteLes = deleteLesson.bind(null, course.id, les.id);
                const handleUpdateLes = updateLesson.bind(null, course.id, les.id);
                return (
                  <InlineLesson 
                    key={les.id} 
                    lesson={les} 
                    updateAction={handleUpdateLes} 
                    deleteAction={handleDeleteLes} 
                  />
                );
              })}
            </div>

            {/* Add Lesson Form */}
            <form action={handleCreateLes} style={{ display: 'flex', gap: '10px', backgroundColor: '#F9FAFB', padding: '15px', borderRadius: '8px', flexWrap: 'wrap' }}>
               <input type="text" name="title" required placeholder="Tên bài học..." style={{ flex: '1 1 30%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
               <input type="text" name="videoUrl" required placeholder="Link Video..." style={{ flex: '1 1 30%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
               <input type="text" name="documentUrl" placeholder="Link Tài liệu (Không bắt buộc)..." style={{ flex: '1 1 30%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
               <button type="submit" className="btn btn-outline" style={{ padding: '10px 16px', fontWeight: 600, width: '100%' }}>+ Thêm Bài Học / Tài Liệu</button>
            </form>

          </div>
        )
      })}

      {/* Add Module Form */}
      <form action={handleCreateModule} style={{ marginTop: '40px', padding: '24px', backgroundColor: '#F0F8E8', borderRadius: '12px', border: '1px solid #D1D5DB', display: 'flex', gap: '15px', alignItems: 'center' }}>
         <h4 style={{ margin: 0, color: 'var(--primary-green)' }}>Tạo Chương Mới:</h4>
         <input type="text" name="title" required placeholder="Ví dụ: Phần 1: Giới thiệu dụng cụ..." style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
         <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>+ Tạo Chương</button>
      </form>

    </div>
  );
}

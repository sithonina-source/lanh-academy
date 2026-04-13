'use client';
import { useState } from 'react';

export default function InlineLesson({ lesson, updateAction, deleteAction }: any) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
     return (
        <form action={(formData) => { updateAction(formData); setIsEditing(false); }} style={{ display: 'flex', gap: '10px', backgroundColor: '#FEF3C7', padding: '15px', borderRadius: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
           <input type="text" name="title" defaultValue={lesson.title} required placeholder="Tên bài học" style={{ flex: '1 1 20%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
           <input type="text" name="videoUrl" defaultValue={lesson.videoUrl} required placeholder="Link Video" style={{ flex: '1 1 30%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
           <input type="text" name="documentUrl" defaultValue={lesson.documentUrl || ''} placeholder="Link Tài liệu..." style={{ flex: '1 1 25%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
           <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Lưu</button>
           <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '8px 16px', backgroundColor: '#9CA3AF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Hủy</button>
        </form>
     )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.2rem' }}>🎥</span>
        <div>
          <div style={{ fontWeight: 600, color: '#374151' }}>{lesson.title}</div>
          <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem' }}>
            <a href={lesson.videoUrl} target="_blank" rel="noreferrer" style={{ color: '#3B82F6', textDecoration: 'none' }}>▶ Video</a>
            {lesson.documentUrl && (
              <a href={lesson.documentUrl} target="_blank" rel="noreferrer" style={{ color: '#10B981', textDecoration: 'none' }}>📄 Tài liệu</a>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button type="button" onClick={() => setIsEditing(true)} style={{ color: '#F59E0B', background: 'none', border: 'none', cursor: 'pointer', padding: '5px', fontWeight: 600 }}>Sửa</button>
        <form action={deleteAction}>
          <button type="submit" style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '5px', fontWeight: 600 }}>Xóa</button>
        </form>
      </div>
    </div>
  );
}

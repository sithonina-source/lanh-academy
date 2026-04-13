import { updateBlog } from '../../../actions';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ImagePicker from '@/components/ImagePicker';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const blog = await prisma.blog.findUnique({
    where: { id }
  });

  if (!blog) notFound();

  const handleUpdate = updateBlog.bind(null, blog.id);

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--dark-accent)' }}>Chỉnh sửa Bài Viết</h1>
      
      <form action={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Tiêu đề bài viết *</label>
          <input type="text" name="title" required defaultValue={blog.title} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Chuyên mục (Tag) *</label>
            <input type="text" name="tag" required defaultValue={blog.tag} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Link Ảnh Bìa (URL)</label>
            <ImagePicker name="imageUrl" defaultValue={blog.imageUrl} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Đoạn môt tả ngắn (Excerpt)</label>
          <textarea name="excerpt" rows={3} defaultValue={blog.excerpt} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px', resize: 'vertical' }}></textarea>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Nội dung chi tiết (HTML/Text)</label>
          <textarea name="content" rows={15} required defaultValue={blog.content} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px', resize: 'vertical', fontFamily: 'monospace' }}></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
           <button type="submit" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1.1rem' }}>💾 Lưu Thay Đổi</button>
        </div>
      </form>
    </div>
  );
}

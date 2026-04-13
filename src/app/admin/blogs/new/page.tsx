import { createBlog } from '../../actions';
import ImagePicker from '@/components/ImagePicker';
export default function NewBlogPage() {
  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--dark-accent)' }}>Thêm Bài Viết Mới</h1>
      
      <form action={createBlog} style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Tiêu đề bài viết *</label>
          <input type="text" name="title" required placeholder="Nhập tiêu đề hấp dẫn..." style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Chuyên mục (Tag) *</label>
            <input type="text" name="tag" required placeholder="VD: Resin, Nến thơm..." style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Link Ảnh Bìa (URL)</label>
            <ImagePicker name="imageUrl" />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Đoạn môt tả ngắn (Excerpt)</label>
          <textarea name="excerpt" rows={3} placeholder="Tóm tắt ngắn gọn nội dung bài viết..." style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px', resize: 'vertical' }}></textarea>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Nội dung chi tiết (HTML/Text)</label>
          <textarea name="content" rows={15} required placeholder="Viết nội dung hoàn chỉnh của bạn tại đây..." style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px', resize: 'vertical', fontFamily: 'monospace' }}></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
           <button type="submit" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1.1rem' }}>Xóa Bản Nháp & Đăng Bài</button>
        </div>
      </form>
    </div>
  );
}

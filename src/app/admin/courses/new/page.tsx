import { createCourse } from '../../actions';
import ImagePicker from '@/components/ImagePicker';
export default function NewCoursePage() {
  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--dark-accent)' }}>+ Thêm Khóa Học Mới</h1>
      
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <form action={createCourse} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Tên Khóa Học *</label>
              <input type="text" name="title" required style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Slug (Đường dẫn) *</label>
              <input type="text" name="slug" required placeholder="vd: dat-set-co-ban" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Phân Loại Nghệ Thuật</label>
              <input type="text" name="category" placeholder="vd: Nến thơm, Đất sét" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 0.5 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Thời Lượng</label>
              <input type="text" name="duration" placeholder="vd: 4 Tuần" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 0.5 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Cấp Độ</label>
              <input type="text" name="level" placeholder="Cơ bản / Nâng cao" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Giá Gốc (VNĐ) *</label>
              <input type="number" name="price" required placeholder="1000000" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#EF4444' }}>Giá Giảm (Nếu Có)</label>
              <input type="number" name="discountPrice" placeholder="500000" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#EF4444' }}>Hạn cuối Sale</label>
              <input type="datetime-local" name="discountEndsAt" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Link Hình Ảnh Bìa</label>
            <ImagePicker name="imageUrl" />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 0.3 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Số lượng bài học</label>
              <input type="number" name="lessonsCount" style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Mô tả khóa học</label>
              <textarea name="description" rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }}></textarea>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
             <button type="submit" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1.1rem' }}>🛒 Xuất bản Khóa học</button>
          </div>
        </form>
      </div>
    </div>
  );
}

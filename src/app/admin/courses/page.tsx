import prisma from '@/lib/prisma';
import Link from 'next/link';
import { deleteCourse } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminCourses() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--dark-accent)' }}>Quản lý Khóa Học</h1>
        <Link href="/admin/courses/new" className="btn btn-primary">
          + Thêm khóa mới
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Tên khóa học</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Danh mục</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Giá bán</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Giá Sale</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>Chưa có khóa học nào trong cơ sở dữ liệu.</td>
              </tr>
            ) : courses.map((course) => (
              <tr key={course.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--dark-accent)' }}>{course.title}</td>
                <td style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>
                  <span style={{ backgroundColor: '#E8F5E9', color: 'var(--primary-green)', padding: '4px 10px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {course.category}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', color: 'var(--text-dark)' }}>{course.price.toLocaleString('vi-VN')} đ</td>
                <td style={{ padding: '16px 20px', color: '#EF4444', fontWeight: 600 }}>
                  {course.discountPrice ? `${course.discountPrice.toLocaleString('vi-VN')} đ` : '-'}
                </td>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center' }}>
                  <Link href={`/admin/courses/${course.id}/edit`} style={{ color: '#3B82F6', fontWeight: 500, marginRight: '15px', textDecoration: 'none' }}>
                    Sửa
                  </Link>
                  <form action={deleteCourse.bind(null, course.id)} style={{ margin: 0 }}>
                    <button type="submit" style={{ color: '#EF4444', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      Xóa
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

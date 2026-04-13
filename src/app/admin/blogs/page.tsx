import prisma from '@/lib/prisma';
import Link from 'next/link';
import { deleteBlog } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminBlogs() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--dark-accent)' }}>Quản lý Bài Viết Blog</h1>
        <Link href="/admin/blogs/new" className="btn btn-primary">
          + Thêm bài mới
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Tiêu đề</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Chuyên mục</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Ngày đăng</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem', textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>Chưa có bài viết nào.</td>
              </tr>
            ) : blogs.map((blog) => {
              const handleDelete = deleteBlog.bind(null, blog.id);
              return (
                <tr key={blog.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--dark-accent)' }}>{blog.title}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>
                    <span style={{ backgroundColor: '#E0E7FF', color: '#4338CA', padding: '4px 10px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>
                      {blog.tag}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-dark)' }}>{new Date(blog.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <Link href={`/admin/blogs/${blog.id}/edit`} style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 500 }}>Sửa</Link>
                      <form action={handleDelete}>
                        <button type="submit" style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                          Xóa
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

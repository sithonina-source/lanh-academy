import prisma from '@/lib/prisma';
import Link from 'next/link';
import { deleteStaff } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminStaffPage() {
  const staff = await prisma.user.findMany({
    where: {
      role: {
        in: ['ADMIN', 'STAFF']
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--dark-accent)' }}>Quản lý Phân Quyền & Nhân Sự</h1>
        <Link href="/admin/staff/new" className="btn btn-primary">
          + Thêm nhân sự mới
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Tài khoản</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Vai trò</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem' }}>Quyền hạn truy cập</th>
              <th style={{ padding: '16px 20px', color: '#6B7280', fontWeight: 600, fontSize: '0.9rem', textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((user) => {
              const handleDelete = deleteStaff.bind(null, user.id);
              const perms = user.permissions ? JSON.parse(user.permissions) : [];
              
              let permLabels = [];
              if (user.role === 'ADMIN') permLabels.push('Toàn Quyền Hệ Thống');
              else {
                if (perms.includes('COURSES')) permLabels.push('Khóa Học');
                if (perms.includes('ORDERS')) permLabels.push('Đơn Hàng');
                if (perms.includes('BLOGS')) permLabels.push('Viết Blog');
              }

              return (
                <tr key={user.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--dark-accent)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{user.email}</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ backgroundColor: user.role === 'ADMIN' ? '#FEF2F2' : '#EFF6FF', color: user.role === 'ADMIN' ? '#DC2626' : '#2563EB', padding: '4px 10px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {permLabels.length === 0 ? <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Không có quyền</span> : 
                        permLabels.map(lbl => (
                          <span key={lbl} style={{ backgroundColor: '#F3F4F6', color: '#374151', fontSize: '0.8rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid #E5E7EB' }}>
                            {lbl}
                          </span>
                        ))
                      }
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    {user.role !== 'ADMIN' && (
                      <form action={handleDelete}>
                        <button type="submit" style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                          Vô hiệu hóa (Xóa)
                        </button>
                      </form>
                    )}
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

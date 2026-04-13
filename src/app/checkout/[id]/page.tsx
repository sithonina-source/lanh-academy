import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '../CheckoutForm';

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session')?.value;
  
  if (!sessionCookie) {
    redirect('/dang-nhap'); // Chưa đăng nhập -> đá ra cổng
  }

  const user = JSON.parse(sessionCookie);

  const course = await prisma.course.findUnique({
    where: { id }
  });

  if (!course) notFound();

  // Kiểm tra xem đã mua hay chưa
  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: user.id,
      courseId: course.id,
      status: 'PAID'
    }
  });

  if (existingOrder) {
    redirect(`/learn/${course.id}`); // Đã có rồi thì chuyển hướng thẳng vô luôn
  }

  const displayPrice = course.discountPrice || course.price;

  // Tìm hoặc Tạo đơn hàng PENDING cho lượt thanh toán này
  let pendingOrder = await prisma.order.findFirst({
    where: {
      userId: user.id,
      courseId: course.id,
      status: 'PENDING'
    }
  });

  if (!pendingOrder) {
    pendingOrder = await prisma.order.create({
      data: {
        userId: user.id,
        courseId: course.id,
        status: 'PENDING',
        totalAmount: displayPrice
      }
    });
  }

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main className="container" style={{ flex: 1, padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '900px', width: '100%', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Thông tin Mua Hàng */}
          <div style={{ flex: '1 1 500px', backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--dark-accent)', marginBottom: '30px', fontWeight: 800 }}>Xác Nhận Đơn Khóa Học</h1>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #E5E7EB' }}>
               <div style={{ width: '140px', height: '100px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                  <Image src={course.imageUrl.startsWith('/') ? course.imageUrl : `/${course.imageUrl}`} alt={course.title} fill style={{ objectFit: 'cover' }} />
               </div>
               <div>
                  <h3 style={{ fontSize: '1.2rem', margin: '0 0 10px 0', color: 'var(--dark-accent)' }}>{course.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Cấp độ: {course.level}</p>
               </div>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>Tạm tính</span>
               <span style={{ fontWeight: 600 }}>{course.price.toLocaleString('vi-VN')} đ</span>
            </div>

            {course.discountPrice && (
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ color: '#EF4444', fontWeight: 600 }}>Giảm giá Flash Sale</span>
                 <span style={{ fontWeight: 600, color: '#EF4444' }}>-{(course.price - course.discountPrice).toLocaleString('vi-VN')} đ</span>
              </div>
            )}

             <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '2px dashed #E5E7EB' }}>
               <span style={{ color: 'var(--dark-accent)', fontWeight: 800, fontSize: '1.2rem' }}>TỔNG CỘNG</span>
               <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary-green)' }}>{displayPrice.toLocaleString('vi-VN')} đ</span>
            </div>

            <CheckoutForm courseId={course.id} amount={displayPrice} orderId={pendingOrder.id} />
          </div>

          {/* Cột Cam Kết */}
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', marginBottom: '20px' }}>
               <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Quyền lợi đi kèm</h3>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, gap: '15px', display: 'flex', flexDirection: 'column' }}>
                 <li style={{ display: 'flex', gap: '10px' }}>✅ <span>Truy cập trọn đời bài giảng</span></li>
                 <li style={{ display: 'flex', gap: '10px' }}>✅ <span>Tài liệu PDF PDF giáo trình</span></li>
                 <li style={{ display: 'flex', gap: '10px' }}>✅ <span>Support 1-1 từ giảng viên</span></li>
                 <li style={{ display: 'flex', gap: '10px' }}>✅ <span>Hoàn tiền 100% nếu không mua được nguyên liệu</span></li>
               </ul>
            </div>
            
            <div style={{ backgroundColor: '#F0FDF4', color: '#166534', padding: '20px', borderRadius: '16px', border: '1px solid #BBF7D0' }}>
              <span style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>🔒 Mua sắm bảo mật</span>
              <span style={{ fontSize: '0.9rem' }}>Thanh toán này là giả lập Mocking cho Demo. Mọi thông tin thẻ không bị sao lưu.</span>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}

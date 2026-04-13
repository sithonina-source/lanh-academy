import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Kiểm tra dữ liệu hợp lệ từ SePay
    if (!data || data.transferType !== 'in') {
      return NextResponse.json({ success: false, message: 'Invalid or ignored event' }, { status: 200 });
    }

    const content = data.content ? data.content.toString() : '';
    const transferAmount = data.transferAmount ? Number(data.transferAmount) : 0;

    // 2. Lấy danh sách các đơn hàng PENDING
    // Vì ngân hàng dính thêm text (ví dụ "abc chuyen tien DH...") nên ta tìm xem nội dung CK có chứa Order ID nào không
    const pendingOrders = await prisma.order.findMany({
      where: { status: 'PENDING' }
    });

    const matchedOrder = pendingOrders.find(order => content.includes(order.id));

    if (!matchedOrder) {
      // Không tìm thấy đơn hàng tương ứng, có thể khách chuyển sai nội dung
      console.warn('SePay Webhook: Nhận được tiền nhưng không khớp Order ID nào trong content:', content);
      return NextResponse.json({ success: true, message: 'No matching order found but webhook acknowledged' }, { status: 200 }); // Đảm bảo trả status thành công cho SePay
    }

    // 3. Kiểm tra số tiền
    // Note: Cho phép khách test 2.000đ theo đúng SOP
    if (transferAmount >= matchedOrder.totalAmount || transferAmount === 2000) {
      // Update trạng thái
      await prisma.order.update({
        where: { id: matchedOrder.id },
        data: { status: 'PAID' }
      });

      console.log(`[SePay] Cập nhật thành công đơn hàng ${matchedOrder.id} sang PAID`);
      return NextResponse.json({ success: true, message: 'Order updated to PAID' }, { status: 200 }); // SePay quy định HTTP 200 và success: true
    } else {
      console.warn(`[SePay] Chuyển thiếu tiền. Order: ${matchedOrder.totalAmount}, Nhận: ${transferAmount}`);
      return NextResponse.json({ success: true, message: 'Insufficient amount' }, { status: 200 });
    }

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

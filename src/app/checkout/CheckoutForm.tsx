'use client';

import { useEffect, useState } from 'react';
import { checkOrderStatus } from './actions';
import { useRouter } from 'next/navigation';

export default function CheckoutForm({ courseId, amount, orderId }: { courseId: string, amount: number, orderId: string }) {
  const router = useRouter();
  const [bankingStatus, setBankingStatus] = useState<string>('Đang chờ thanh toán...');

  // Tạm để tài khoản demo, bạn thay bằng số tài khoản thật sau nhé.
  const bankName = "Vietcombank"; 
  const accountNumber = "0010000000355";
  
  // Cấu trúc nội dung thanh toán CHÍNH XÁC LÀ ORDER ID ĐỂ SEPAY TRẢ VỀ VÀ NHẬN DIỆN
  const description = orderId;

  // Tạo URL QR Code từ hệ thống của SePay
  const qrUrl = `https://qr.sepay.vn/img?acc=${accountNumber}&bank=${bankName}&amount=${amount}&des=${encodeURIComponent(description)}`;

  useEffect(() => {
    // Tự động tải lại và kiểm tra trạng thái hoá đơn mỗi 5 giây
    const interval = setInterval(async () => {
      const res = await checkOrderStatus(orderId);
      if (res.success) {
        setBankingStatus('Thanh toán thành công! Đang chuyển hướng...');
        clearInterval(interval);
        setTimeout(() => {
          router.push(`/learn/${courseId}`);
        }, 1500);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, courseId, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3 style={{ marginBottom: '15px', color: 'var(--dark-accent)' }}>Quét mã QR để thanh toán</h3>
      
      <div style={{ 
        display: 'inline-block', 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        border: '2px solid var(--primary-green)',
        boxShadow: 'var(--shadow-md)' 
      }}>
        {/* Hiển thị QR Code */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={qrUrl} 
          alt="QR Code Thanh Toán" 
          style={{ width: '100%', maxWidth: '250px', borderRadius: '8px' }} 
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#F3F4F6', borderRadius: '12px', textAlign: 'left', display: 'inline-block', width: '100%', maxWidth: '350px', wordBreak: 'break-all' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem' }}><strong>Ngân hàng:</strong> {bankName}</p>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem' }}><strong>Số tài khoản:</strong> {accountNumber}</p>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem' }}><strong>Số tiền:</strong> {amount.toLocaleString('vi-VN')} đ</p>
        <p style={{ margin: '0', fontSize: '0.95rem' }}><strong>Nội dung:</strong> {description}</p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', borderRadius: '12px', backgroundColor: bankingStatus.includes('thành công') ? '#D1FAE5' : '#FFFBEB', color: bankingStatus.includes('thành công') ? '#059669' : '#D97706', fontWeight: 600 }}>
        {bankingStatus.includes('Đang chờ') && <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid currentColor', borderRightColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', verticalAlign: 'middle' }}></span>}
        {bankingStatus}
      </div>

      <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Sử dụng App ngân hàng để quét mã. <br/> Sau khi thanh toán thành công, hệ thống sẽ tự động duyệt đơn cho bạn.
      </p>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

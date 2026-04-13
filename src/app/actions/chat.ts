"use server";

import { GoogleGenAI } from "@google/genai";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithBeLanh(message: string, history: {role: 'user'|'model', parts: {text: string}[]}[] = []) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session')?.value;
    
    let isStudent = false;
    let studentContext = "";
    
    const currentDate = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    
    if (sessionCookie) {
       const user = JSON.parse(sessionCookie);
       const orders = await prisma.order.findMany({
          where: { userId: user.id },
          include: { course: true },
          orderBy: { createdAt: 'desc' }
       });
       
       isStudent = true;
       // Ngăn bot bê nguyên tên công ty ra chào
       studentContext = `Học viên đăng ký tên là: "${user.name}". Tên này có thể là tên công ty. LƯU Ý: Tuyệt đối KHÔNG BÊ NGUYÊN TÊN CÔNG TY VÀO LỜI CHÀO. Chỉ xưng hô "Anh/Chị" chung chung cho thân thiện. `;
       if (orders.length > 0) {
           const paidOrders = orders.filter(o => o.status === 'PAID' || o.status === 'COMPLETED');
           const pendingOrders = orders.filter(o => o.status === 'PENDING');
           if (paidOrders.length > 0) {
               studentContext += `Đã đăng ký THÀNH CÔNG các khóa học: ${paidOrders.map(o => o.course.title).join(', ')}. Nếu họ gặp khó khăn chỗ nào, hãy đóng vai chuyên gia và hướng dẫn nhẹ nhàng từng bước. `;
           }
           if (pendingOrders.length > 0) {
               studentContext += `Đang CHỜ THANH TOÁN khóa học: ${pendingOrders.map(o => o.course.title).join(', ')}. Hãy nhắc nhở họ thanh toán nhẹ nhàng để truy cập bài học. `;
           }
       } else {
           studentContext += `Học viên này vừa mới tạo tài khoản nhưng chưa đăng ký khóa nào. Hãy tư vấn lộ trình và CHỐT SALE cực mạnh.`;
       }
    } else {
       studentContext += `Đây là Khách lạ vãng lai, chưa đăng nhập, chưa là học viên. Trọng tâm: Nổi bật vai trò Tư Vấn, giới thiệu trung tâm uy tín, giới thiệu khóa học, mời đăng ký tài khoản và CHỐT SALE nhé!`;
    }

    const systemInstruction = `Bạn là Trợ lý AI tên là "Bé Lành" (Bé Lành Chatbot) của Trung tâm Lành Academy (chuyên đạo tạo làm đồ thủ công tinh xảo, cắt ghép đá Mosaic chuyên nghiệp).
Thời điểm hiện tại đang là: ${currentDate} (Giờ Việt Nam).
Tính cách: Dễ thương, lanh lợi, cực kỳ nhiệt huyết, luôn xưng hô là "Bé Lành" và gọi người dùng là "Anh/Chị" hoặc "Bạn". Luôn dùng biểu cảm emoji đáng yêu ❤️✨🌱.
Mục tiêu tuyệt đối: 
1. Giải đáp thắc mắc liên quan tới thủ công.
2. Nắm bắt được Khách lạ hay Học viên cũ (Xem tại phần CONTEXT) để xoay chuyển thái độ: với Khách mới thì phải Sale bất chấp nhiệt tình; với học viên cũ thì Support ân cần.

[CONTEXT BẮT BỘC] 
${studentContext}

[THÔNG TIN DỊCH VỤ ĐỂ SALE NẾU CẦN] 
Hiện tại Lành Academy có khoá "Tự Tay Ghép Đá Mosaic Từ A-Z" (Làm tranh đá, lót ly, khay gỗ).
Nếu chưa biết tư vấn khóa gì, hãy mớm họ mua khóa này.

[QUY TẮC CỐT LÕI]
Luôn trả lời ngắn gọn, súc tích (dưới 80 chữ cho mỗi tin nhắn), ngắt dòng rõ ràng, không để khách bị mỏi mắt. Đọc kỹ câu hỏi trước khi trả lời.`;

    const formattedHistory = history.map(h => ({
        role: h.role, 
        parts: h.parts 
    }));

    const response = await ai.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: [...formattedHistory, { role: 'user', parts: [{text: message}] }],
       config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
       }
    });

    return { 
       text: response.text,
       error: null 
    };

  } catch (error: any) {
    console.error("Gemini Error:", error);
    return { text: "", error: "Ui da! Bé Lành đang chóng mặt một chút, bạn chờ Bé xíu nha! (" + error.message + ")" };
  }
}

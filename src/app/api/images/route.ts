import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const uploadsDir = path.join(publicDir, 'uploads');

    // Mảng lưu danh sách file img
    let images: string[] = [];

    // Helper kiểm tra file ảnh
    const isImage = (filename: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);

    // Đọc thư mục public
    const publicFiles = await fs.readdir(publicDir, { withFileTypes: true });
    for (const file of publicFiles) {
      if (file.isFile() && isImage(file.name)) {
        images.push(`/${file.name}`);
      }
    }

    // Đọc thư mục public/uploads (nếu có)
    try {
      const uploadFiles = await fs.readdir(uploadsDir, { withFileTypes: true });
      for (const file of uploadFiles) {
        if (file.isFile() && isImage(file.name)) {
          images.push(`/uploads/${file.name}`);
        }
      }
    } catch (e) {
      // Bỏ qua nếu thư mục uploads chưa được tạo
    }

    // Sắp xếp ngày tạo (đơn giản hoá bằng cách sắp thứ tự tên chữ thường)
    images.sort((a, b) => b.localeCompare(a));

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi tải danh sách ảnh' }, { status: 500 });
  }
}

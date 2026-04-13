import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Tự động thêm đuôi timestamp để tránh trùng lặp
    const ext = path.extname(file.name);
    const basename = path.basename(file.name, ext);
    const filename = `${basename}-${Date.now()}${ext}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Đảm bảo thư mục uploads tồn tại
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    const filepath = path.join(uploadsDir, filename);

    // Gán file vào Local Storage
    await fs.writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi upload ảnh' }, { status: 500 });
  }
}

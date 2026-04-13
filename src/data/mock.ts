import { Course } from '../components/CourseCard';

export const mockCourses: Course[] = [
  {
    id: '1',
    slug: 'dat-set-nghe-thuat',
    title: 'Đất Sét Nghệ Thuật',
    category: 'Đất sét',
    instructor: 'Lành Workshop',
    duration: '4 Tuần',
    level: 'Cơ bản',
    lessonsCount: 24,
    quizzesCount: 3,
    studentsCount: 154,
    description: 'Tạo hình nhân vật, phụ kiện, decor từ đất sét polymer — từ cơ bản đến tạo hình chi tiết.',
    price: 1290000,
    imageUrl: '/472988478_122204505116040203_2103331358923584371_n.jpg'
  },
  {
    id: '2',
    slug: 'resin-art',
    title: 'Resin Art Toàn Diện',
    category: 'Resin Art',
    instructor: 'Lành Workshop',
    duration: '5 Tuần',
    level: 'Mọi cấp độ',
    lessonsCount: 30,
    quizzesCount: 5,
    studentsCount: 210,
    description: 'Làm khay, tranh, phụ kiện từ nhựa resin — kỹ thuật đổ màu, ép hoa, tạo hiệu ứng ấn tượng.',
    price: 1590000,
    imageUrl: '/473997559_122146957868393433_3798468804797401311_n.jpg'
  },
  {
    id: '3',
    slug: 'mosaic-thu-cong',
    title: 'Mosaic Thủ Công Độc Đáo',
    category: 'Mosaic',
    instructor: 'Lành Workshop',
    duration: '3 Tuần',
    level: 'Cơ bản',
    lessonsCount: 20,
    quizzesCount: 2,
    studentsCount: 98,
    description: 'Ghép gạch mosaic tạo tranh, khung gương, chậu cây — nghệ thuật ghép mảnh độc đáo.',
    price: 1190000,
    imageUrl: '/474575795_122146957844393433_3851454737920078026_n.jpg'
  },
  {
    id: '4',
    slug: 'nen-thom-soy-wax',
    title: 'Nến Thơm Soy Wax & Kinh Doanh',
    category: 'Nến thơm',
    instructor: 'Lành Workshop',
    duration: '3 Tuần',
    level: 'Mọi cấp độ',
    lessonsCount: 18,
    quizzesCount: 4,
    studentsCount: 340,
    description: 'Làm nến soy wax, nến trang trí, phối mùi hương — kèm kiến thức kinh doanh cơ bản.',
    price: 990000,
    imageUrl: '/476632834_122149501028393433_2815148235107927880_n.jpg'
  },
  {
    id: '5',
    slug: 'diorama-miniature',
    title: 'Diorama Miniature: Thế Giới Nhỏ',
    category: 'Mô hình',
    instructor: 'Lành Workshop',
    duration: '6 Tuần',
    level: 'Nâng cao',
    lessonsCount: 28,
    quizzesCount: 0,
    studentsCount: 76,
    description: 'Dựng mô hình thu nhỏ (phòng mini, cảnh thiên nhiên) bằng vật liệu thủ công vô cùng tinh xảo.',
    price: 1490000,
    imageUrl: '/488849144_122221522322040203_3023132075756377350_n.jpg'
  },
  {
    id: '6',
    slug: 'phu-kien-handmade',
    title: 'Trang Trí Phụ Kiện Handmade',
    category: 'Phụ kiện',
    instructor: 'Lành Workshop',
    duration: '4 Tuần',
    level: 'Cơ bản',
    lessonsCount: 22,
    quizzesCount: 1,
    studentsCount: 205,
    description: 'Làm kẹp tóc, móc khóa, hoa tai từ đất sét, resin, vải — phong cách cá nhân hóa thời trang.',
    price: 890000,
    imageUrl: '/490382301_122221522286040203_4772887799529056120_n.jpg'
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Phương Linh',
    role: 'Học viên khóa Macrame',
    avatarUrl: '/z7586001823571_c03eae734c0354d69aaa84072995aaeb.jpg',
    content: '"Nhờ Lành Academy, mình tìm thấy sự bình yên sau những giờ làm việc căng thẳng. Cảm giác tự tay làm ra một món đồ trang trí nhà cửa thực sự tuyệt vời."'
  },
  {
    id: '2',
    name: 'Hoàng Oanh',
    role: 'Học viên Nến Thơm',
    avatarUrl: '/z7586001824369_b74b210dce8299b7865ce3b2109c5606.jpg',
    content: '"Mình đã học từ con số 0 nhưng bài giảng rất chi tiết và dễ hiểu. Giáo viên cực kỳ nhiệt tình và giọng nói truyền cảm lắm."'
  },
  {
    id: '3',
    name: 'Thanh Trúc',
    role: 'Học viên Resin Art',
    avatarUrl: '/z7586001829765_0ab7881c75a082a609ce9e112597d4bf.jpg',
    content: '"Mình đã làm thành công chiếc khay gỗ Resin ngay lần thử đầu tiên! Môi trường học tập trên website cực kỳ mượt mà, hỗ trợ cực kỳ nhanh chóng."'
  }
];

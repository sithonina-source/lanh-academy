import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "Lành Academy | Nền tảng Khóa Học DIY & Workshop",
  description: "Học workshop DIY sáng tạo, gần gũi: macrame, candle making, resin art, nến thơm, hoa khô... Khám phá và đánh thức niềm vui qua đồ thủ công tại Lành Academy.",
  openGraph: {
    title: "Lành Academy | Nền tảng Khóa Học DIY & Workshop",
    description: "Khám phá và đánh thức niềm vui qua đồ thủ công tại Lành Academy.",
    type: "website",
    locale: "vi_VN"
  }
};

import Chatbot from "@/components/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}

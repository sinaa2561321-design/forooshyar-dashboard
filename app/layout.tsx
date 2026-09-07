import "./globals.css";

export const metadata = {
  title: "فروش‌یار | پنل مدیریت سفارش",
  description: "نمونه‌کار شخصی توسعه وب فارسی و RTL"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
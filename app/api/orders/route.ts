import { NextResponse } from "next/server";

const orders = [
  { id: "F-1048", customer: "علی رضایی", amount: 4850000, status: "پرداخت‌شده", date: "امروز، 09:42" },
  { id: "F-1047", customer: "سارا احمدی", amount: 2750000, status: "در حال ارسال", date: "امروز، 08:15" },
  { id: "F-1046", customer: "محمد کریمی", amount: 1290000, status: "در انتظار", date: "دیروز، 18:30" },
  { id: "F-1045", customer: "نگار محمدی", amount: 6420000, status: "پرداخت‌شده", date: "دیروز، 16:05" },
  { id: "F-1044", customer: "رضا اکبری", amount: 980000, status: "لغوشده", date: "دیروز، 12:20" }
];

export async function GET() {
  return NextResponse.json({ data: orders });
}
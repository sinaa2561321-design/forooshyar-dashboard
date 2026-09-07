"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell, ChevronDown, LayoutDashboard, Package, Search, ShoppingCart,
  TrendingUp, Users, MoreHorizontal, Menu, X, RefreshCw
} from "lucide-react";

type Order = {
  id: string; customer: string; amount: number; status: string; date: string;
};

const money = (n: number) => new Intl.NumberFormat("fa-IR").format(n) + " تومان";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("همه");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const loadOrders = async () => {
    setLoading(true); setError(false);
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      if (!res.ok) throw new Error("request failed");
      const json = await res.json();
      setOrders(json.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const filtered = useMemo(() => orders.filter(o => {
    const matchesText = `${o.id} ${o.customer}`.includes(query.trim());
    const matchesStatus = status === "همه" || o.status === status;
    return matchesText && matchesStatus;
  }), [orders, query, status]);

  return (
    <main className="shell">
      <aside className={`sidebar ${openMenu ? "show" : ""}`}>
        <div className="brand"><div className="brand-mark">ف</div><div><b>فروش‌یار</b><span>مدیریت فروش</span></div></div>
        <nav>
          <a className="active"><LayoutDashboard size={19}/>داشبورد</a>
          <a><ShoppingCart size={19}/>سفارش‌ها <em>12</em></a>
          <a><Package size={19}/>محصولات</a>
          <a><Users size={19}/>مشتریان</a>
        </nav>
        <div className="side-note"><TrendingUp size={18}/><div><b>رشد این ماه</b><span>+۱۸.۴٪</span></div></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setOpenMenu(!openMenu)} aria-label="منو">{openMenu ? <X/> : <Menu/>}</button>
          <div><h1>داشبورد فروش</h1><p>خلاصه وضعیت فروشگاه در یک نگاه</p></div>
          <div className="top-actions"><button aria-label="اعلان‌ها" className="icon-btn"><Bell size={19}/><i/></button><button className="profile"><span>سینا</span><ChevronDown size={16}/></button></div>
        </header>

        <div className="stats">
          <Stat title="فروش امروز" value="۱۲.۸ میلیون" change="+۱۲.۵٪" icon={<TrendingUp/>}/>
          <Stat title="سفارش‌های امروز" value="۳۶" change="+۸.۱٪" icon={<ShoppingCart/>}/>
          <Stat title="مشتریان فعال" value="۱,۲۸۴" change="+۵.۶٪" icon={<Users/>}/>
          <Stat title="محصولات" value="۲۴۸" change="+۳.۲٪" icon={<Package/>}/>
        </div>

        <section className="card">
          <div className="card-head">
            <div><h2>سفارش‌های اخیر</h2><p>آخرین تراکنش‌های فروشگاه</p></div>
            <button className="refresh" onClick={loadOrders} aria-label="به‌روزرسانی"><RefreshCw size={17}/> به‌روزرسانی</button>
          </div>

          <div className="filters">
            <div className="search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="جست‌وجو بر اساس شماره یا مشتری..." aria-label="جست‌وجو"/></div>
            <select value={status} onChange={e => setStatus(e.target.value)} aria-label="فیلتر وضعیت">
              <option>همه</option><option>پرداخت‌شده</option><option>در حال ارسال</option><option>در انتظار</option><option>لغوشده</option>
            </select>
          </div>

          {loading ? <div className="state">در حال دریافت سفارش‌ها...</div> :
           error ? <div className="state error">دریافت اطلاعات ناموفق بود. <button onClick={loadOrders}>تلاش دوباره</button></div> :
           filtered.length === 0 ? <div className="state">سفارشی مطابق فیلتر شما پیدا نشد.</div> :
           <div className="table-wrap"><table><thead><tr><th>شماره سفارش</th><th>مشتری</th><th>مبلغ</th><th>وضعیت</th><th>زمان</th><th/></tr></thead>
           <tbody>{filtered.map(o => <tr key={o.id}><td><b>{o.id}</b></td><td>{o.customer}</td><td>{money(o.amount)}</td><td><span className={`badge ${badge(o.status)}`}>{o.status}</span></td><td>{o.date}</td><td><button className="more" aria-label={`گزینه‌های ${o.id}`}><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>}
        </section>

        <footer>فروش‌یار · نمونه‌کار شخصی توسعه وب · طراحی واکنش‌گرا و RTL</footer>
      </section>
    </main>
  );
}

function badge(s: string) {
  if (s === "پرداخت‌شده") return "ok";
  if (s === "لغوشده") return "bad";
  if (s === "در حال ارسال") return "warn";
  return "neutral";
}

function Stat({ title, value, change, icon }: { title:string; value:string; change:string; icon:React.ReactNode }) {
  return <div className="stat"><div className="stat-icon">{icon}</div><div><span>{title}</span><strong>{value}</strong><small>{change} نسبت به هفته قبل</small></div></div>;
}
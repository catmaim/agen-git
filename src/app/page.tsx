"use client";

import { useMemo, useState } from "react";

type Tx = {
  account: string;
  bank: string;
  region: string;
  atmId: string;
  amount: number;
  velocity: number;
  risk: "critical" | "high" | "medium";
  timestamp: string;
};

const transactions: Tx[] = [
  { account: "A-890211", bank: "Bank A", region: "กรุงเทพฯ", atmId: "ATM-BKK-302", amount: 245000, velocity: 8, risk: "critical", timestamp: "08:12" },
  { account: "A-890211", bank: "Bank A", region: "กรุงเทพฯ", atmId: "ATM-BKK-988", amount: 220000, velocity: 6, risk: "high", timestamp: "09:03" },
  { account: "C-121934", bank: "Bank C", region: "ชลบุรี", atmId: "ATM-CHB-114", amount: 198000, velocity: 7, risk: "high", timestamp: "09:21" },
  { account: "D-883119", bank: "Bank D", region: "เชียงใหม่", atmId: "ATM-CNX-040", amount: 68000, velocity: 3, risk: "medium", timestamp: "10:09" },
  { account: "Z-713442", bank: "Bank Z", region: "ภูเก็ต", atmId: "ATM-HKT-091", amount: 310000, velocity: 11, risk: "critical", timestamp: "10:26" },
  { account: "K-330923", bank: "Bank K", region: "ขอนแก่น", atmId: "ATM-KKN-223", amount: 121000, velocity: 4, risk: "medium", timestamp: "11:10" },
  { account: "Q-552110", bank: "Bank Q", region: "กรุงเทพฯ", atmId: "ATM-BKK-120", amount: 264000, velocity: 9, risk: "critical", timestamp: "11:44" },
  { account: "C-121934", bank: "Bank C", region: "ระยอง", atmId: "ATM-RYG-007", amount: 179000, velocity: 6, risk: "high", timestamp: "12:22" },
];

const hourlyFlow = [42, 58, 76, 88, 61, 73, 95, 87, 62, 79, 54, 68];

const riskTone = {
  critical: "from-rose-500/30 to-red-600/20 border-rose-400/40 text-rose-100",
  high: "from-orange-500/30 to-amber-600/20 border-orange-400/40 text-orange-100",
  medium: "from-sky-500/30 to-cyan-600/20 border-sky-400/40 text-sky-100",
};

export default function Home() {
  const [selectedRisk, setSelectedRisk] = useState<"all" | Tx["risk"]>("all");

  const filtered = useMemo(
    () => transactions.filter((tx) => (selectedRisk === "all" ? true : tx.risk === selectedRisk)),
    [selectedRisk],
  );

  const totalAmount = filtered.reduce((sum, tx) => sum + tx.amount, 0);
  const avgVelocity = filtered.reduce((sum, tx) => sum + tx.velocity, 0) / (filtered.length || 1);
  const suspiciousAccounts = new Set(filtered.map((tx) => tx.account)).size;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-52 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-[120px]" />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
        <header className="glass-panel mb-6 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                Live Monitoring • ATM Mule Account Intelligence
              </p>
              <h1 className="text-2xl font-semibold leading-tight sm:text-4xl">Fraud Withdrawals Command Center</h1>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">แดชบอร์ดวิเคราะห์พฤติกรรมการถอนเงินผิดปกติของบัญชีม้า พร้อมมุมมองความเสี่ยงแบบ Real-time</p>
            </div>

            <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
              {(["all", "critical", "high", "medium"] as const).map((risk) => (
                <button
                  key={risk}
                  type="button"
                  onClick={() => setSelectedRisk(risk)}
                  className={`rounded-xl px-4 py-2 text-sm capitalize transition ${
                    selectedRisk === risk ? "bg-white text-slate-900 shadow-lg" : "text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {risk === "all" ? "ทั้งหมด" : risk}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard title="ยอดถอนที่ตรวจจับ" value={`฿${totalAmount.toLocaleString()}`} desc="รวมจากธุรกรรมที่ถูกกรอง" icon="💸" trend="+18.7%" />
          <KpiCard title="บัญชีต้องสงสัย" value={String(suspiciousAccounts)} desc="บัญชีที่มีพฤติกรรมเข้าข่าย" icon="🧷" trend="+6 บัญชี" />
          <KpiCard title="ความเร็วเฉลี่ย" value={`${avgVelocity.toFixed(1)} ครั้ง/ชม.`} desc="frequency per account" icon="⚡" trend="สูงกว่าปกติ 2.3x" />
          <KpiCard title="ATM Hotspot" value="17 จุด" desc="พื้นที่เสี่ยงสูงในวันนี้" icon="📍" trend="BKK, HKT, CHB" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="glass-panel rounded-3xl p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold sm:text-xl">Withdrawal Pressure Timeline</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Last 12 hours</span>
            </div>
            <div className="grid h-52 grid-cols-12 items-end gap-2">
              {hourlyFlow.map((level, idx) => (
                <div key={idx} className="group relative h-full rounded-xl bg-white/5 p-1">
                  <div
                    style={{ height: `${level}%`, animationDelay: `${idx * 70}ms` }}
                    className="bar-rise rounded-lg bg-gradient-to-t from-fuchsia-500 via-violet-400 to-cyan-300"
                  />
                  <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-slate-900 px-2 py-0.5 text-[10px] text-slate-100 group-hover:block">
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel rounded-3xl p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold sm:text-xl">Risk Composition</h2>
            <div className="space-y-3">
              {[{ label: "Critical", value: 47, color: "from-rose-500 to-red-500" }, { label: "High", value: 34, color: "from-orange-500 to-amber-500" }, { label: "Medium", value: 19, color: "from-cyan-500 to-sky-500" }].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-sm text-slate-300">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-gradient-to-r ${item.color} shimmer`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-400/10 p-4 text-sm text-violet-100">
              🔍 Insight: พบรูปแบบ “ถอนถี่ + เปลี่ยน ATM หลายจุด” ในช่วง 09:00–12:00 มากที่สุด
            </div>
          </article>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-panel rounded-3xl p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold sm:text-xl">บัญชีและธุรกรรมต้องสงสัย</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="pb-3">บัญชี</th>
                    <th className="pb-3">ธนาคาร</th>
                    <th className="pb-3">ATM</th>
                    <th className="pb-3">ยอดถอน</th>
                    <th className="pb-3">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tx) => (
                    <tr key={`${tx.account}-${tx.timestamp}`} className="border-t border-white/10 text-slate-200">
                      <td className="py-3">{tx.account}</td>
                      <td className="py-3">{tx.bank}</td>
                      <td className="py-3">{tx.atmId}</td>
                      <td className="py-3 font-medium">฿{tx.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`inline-flex rounded-full border bg-gradient-to-r px-3 py-1 text-xs capitalize ${riskTone[tx.risk]}`}>{tx.risk}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="glass-panel rounded-3xl p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold sm:text-xl">ATM Activity Radar</h2>
            <div className="relative grid h-[320px] place-items-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle,_rgba(99,102,241,0.25)_0%,_rgba(15,23,42,0.2)_40%,_rgba(2,6,23,0.8)_100%)]">
              <div className="radar-ping absolute h-40 w-40 rounded-full border border-cyan-300/50" />
              <div className="radar-ping absolute h-56 w-56 rounded-full border border-fuchsia-300/30" style={{ animationDelay: "1s" }} />
              <div className="absolute left-[30%] top-[38%] h-3 w-3 rounded-full bg-rose-400 shadow-[0_0_16px_rgba(251,113,133,0.9)]" />
              <div className="absolute left-[62%] top-[28%] h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.9)]" />
              <div className="absolute left-[50%] top-[62%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
              <p className="absolute bottom-4 rounded-full bg-black/40 px-3 py-1 text-xs text-slate-200">Hotspot: กรุงเทพฯ / ภูเก็ต / ชลบุรี</p>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

function KpiCard({ title, value, desc, icon, trend }: { title: string; value: string; desc: string; icon: string; trend: string }) {
  return (
    <article className="glass-panel float-in rounded-2xl p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-300">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-xs text-slate-400">{desc}</p>
      <p className="mt-2 text-xs text-emerald-300">▲ {trend}</p>
    </article>
  );
}

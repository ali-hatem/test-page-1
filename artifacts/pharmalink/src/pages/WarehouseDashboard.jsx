import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { StatSkeleton, TableRowSkeleton } from "../components/Skeleton";
import { Badge } from "../components/Badge";
import {
  Package, Truck, CheckCircle2, Clock, MapPin,
  BarChart3, ArrowUpRight, ArrowDownRight,
} from "lucide-react";

const stockItems = [
  { name: "Amoxicillin 500mg", total: 12500, allocated: 9800, available: 2700, zone: "A1", capacity: 78 },
  { name: "Metformin 1000mg", total: 8400, allocated: 4200, available: 4200, zone: "B3", capacity: 50 },
  { name: "Vitamin D3 5000IU", total: 6000, allocated: 5800, available: 200, zone: "C2", capacity: 97 },
  { name: "Atorvastatin 20mg", total: 9100, allocated: 3000, available: 6100, zone: "A4", capacity: 33 },
  { name: "Lisinopril 10mg", total: 4500, allocated: 4490, available: 10, zone: "D1", capacity: 99 },
];

const deliveryRequests = [
  { id: "#DLV-001", pharmacy: "City Pharmacy", medicine: "Amoxicillin 500mg", qty: "500 boxes", status: "pending", priority: "high", date: "May 16, 2025" },
  { id: "#DLV-002", pharmacy: "MedPlus", medicine: "Metformin 1000mg", qty: "300 boxes", status: "dispatched", priority: "normal", date: "May 15, 2025" },
  { id: "#DLV-003", pharmacy: "HealthHub", medicine: "Vitamin D3 5000IU", qty: "200 bottles", status: "pending", priority: "urgent", date: "May 16, 2025" },
  { id: "#DLV-004", pharmacy: "Pharma Express", medicine: "Lisinopril 10mg", qty: "100 boxes", status: "delivered", priority: "normal", date: "May 14, 2025" },
];

const priorityVariant = { urgent: "error", high: "warning", normal: "info" };
const deliveryStatus = { pending: "gray", dispatched: "info", delivered: "success" };

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }) };

export default function WarehouseDashboard() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState(deliveryRequests);

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(timer); }, []);

  const dispatch = (id) => setRequests((r) => r.map((x) => x.id === id ? { ...x, status: "dispatched" } : x));

  const stats = [
    { label: t("warehouse.total_stock"), value: "40,500", icon: Package, color: "text-[#F59E0B]", bg: "bg-amber-50", sub: "+2,400 this week" },
    { label: t("warehouse.delivery_requests"), value: requests.filter((r) => r.status === "pending").length.toString(), icon: Truck, color: "text-[#2563EB]", bg: "bg-blue-50", sub: "3 urgent" },
    { label: t("warehouse.in_transit"), value: "7", icon: Clock, color: "text-[#14B8A6]", bg: "bg-teal-50", sub: "ETA today" },
    { label: t("warehouse.dispatched_today"), value: "12", icon: CheckCircle2, color: "text-[#22C55E]", bg: "bg-green-50", sub: "On time" },
  ];

  const analytics = [
    { label: "Total Dispatched", value: "1,248", change: "+18%", up: true },
    { label: "On-time Delivery Rate", value: "96.4%", change: "+2.1%", up: true },
    { label: "Average Delivery Time", value: "4.2h", change: "-0.8h", up: true },
    { label: "Stock Turnover Rate", value: "82%", change: "-3%", up: false },
  ];

  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" variants={{ visible: {} }}>
        <motion.div variants={fadeUp} custom={0} className="mb-8">
          <h1 className={`text-2xl font-bold text-[#0F172A] ${dir === "rtl" ? "text-right" : ""}`}>{t("warehouse.dashboard_title")}</h1>
          <p className={`text-gray-500 text-sm mt-1 ${dir === "rtl" ? "text-right" : ""}`}>{t("warehouse.dashboard_subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? [1,2,3,4].map((i) => <StatSkeleton key={i} />) : stats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`flex items-center justify-between mb-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
              <p className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <motion.div variants={fadeUp} custom={4} className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <h2 className="font-semibold text-[#0F172A]">{t("warehouse.deliveries_title")}</h2>
              <Badge variant="warning">{requests.filter((r) => r.status === "pending").length} pending</Badge>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? [1,2,3].map((i) => <div key={i} className="p-4"><TableRowSkeleton /></div>) :
                requests.map((req) => (
                  <div key={req.id} className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-2 flex-wrap mb-0.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                        <span className="text-sm font-semibold text-[#0F172A]">{req.id}</span>
                        <Badge variant={priorityVariant[req.priority]}>{req.priority}</Badge>
                        <Badge variant={deliveryStatus[req.status]}>{req.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-700">{req.pharmacy}</p>
                      <p className="text-xs text-gray-500">{req.medicine} · {req.qty}</p>
                      <div className={`flex items-center gap-1 mt-1 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{req.date}</span>
                      </div>
                    </div>
                    {req.status === "pending" && (
                      <button
                        onClick={() => dispatch(req.id)}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#F59E0B] text-white rounded-lg text-xs font-semibold hover:bg-amber-500 transition-colors"
                      >
                        <Truck className="w-3 h-3" />
                        {t("warehouse.dispatch")}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className={`font-semibold text-[#0F172A] mb-4 flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse text-right" : ""}`}>
              <BarChart3 className="w-4 h-4 text-[#F59E0B]" />
              {t("warehouse.analytics_title")}
            </h2>
            <div className="space-y-4">
              {analytics.map((item) => (
                <div key={item.label} className={`flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <div className={dir === "rtl" ? "text-right" : ""}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-lg font-bold text-[#0F172A]">{item.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${item.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"} ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    {item.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {item.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={6} className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className={`px-6 py-4 border-b border-gray-100 ${dir === "rtl" ? "text-right" : ""}`}>
            <h2 className="font-semibold text-[#0F172A]">{t("warehouse.stock_title")}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Medicine", t("warehouse.zone"), "Total", "Allocated", "Available", t("warehouse.utilization")].map((h) => (
                    <th key={h} className={`px-4 py-3 text-xs font-medium text-gray-500 ${dir === "rtl" ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? [1,2,3].map((i) => <TableRowSkeleton key={i} />) :
                  stockItems.map((item) => (
                    <tr key={item.name} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className={`px-4 py-3 text-sm font-medium text-gray-800 ${dir === "rtl" ? "text-right" : ""}`}>{item.name}</td>
                      <td className={`px-4 py-3 ${dir === "rtl" ? "text-right" : ""}`}>
                        <div className={`flex items-center gap-1 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs font-mono text-gray-600">{item.zone}</span>
                        </div>
                      </td>
                      <td className={`px-4 py-3 text-sm text-gray-700 ${dir === "rtl" ? "text-right" : ""}`}>{item.total.toLocaleString()}</td>
                      <td className={`px-4 py-3 text-sm text-gray-700 ${dir === "rtl" ? "text-right" : ""}`}>{item.allocated.toLocaleString()}</td>
                      <td className={`px-4 py-3 text-sm font-semibold ${item.available < 500 ? "text-red-600" : "text-gray-800"} ${dir === "rtl" ? "text-right" : ""}`}>
                        {item.available.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 ${dir === "rtl" ? "text-right" : ""}`}>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden" style={{ minWidth: 60 }}>
                            <div
                              className={`h-full rounded-full transition-all ${item.capacity >= 90 ? "bg-red-400" : item.capacity >= 70 ? "bg-amber-400" : "bg-green-400"}`}
                              style={{ width: `${item.capacity}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-600">{item.capacity}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

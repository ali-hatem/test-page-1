import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { StatSkeleton, TableRowSkeleton } from "../components/Skeleton";
import { Badge } from "../components/Badge";
import {
  Package, ClipboardList, AlertTriangle, CheckCircle2,
  TrendingUp, DollarSign, RefreshCw, Check, X,
} from "lucide-react";

const inventoryItems = [
  { name: "Amoxicillin 500mg", sku: "AMX-500", stock: 145, reorder: 50, unit: "boxes", status: "healthy" },
  { name: "Metformin 1000mg", sku: "MET-1000", stock: 23, reorder: 50, unit: "boxes", status: "low" },
  { name: "Lisinopril 10mg", sku: "LIS-010", stock: 8, reorder: 30, unit: "boxes", status: "critical" },
  { name: "Vitamin D3 5000IU", sku: "VIT-D3", stock: 210, reorder: 80, unit: "bottles", status: "healthy" },
  { name: "Ibuprofen 400mg", sku: "IBU-400", stock: 67, reorder: 60, unit: "strips", status: "healthy" },
  { name: "Cetirizine 10mg", sku: "CET-010", stock: 12, reorder: 40, unit: "boxes", status: "low" },
];

const incomingOrders = [
  { id: "#PH-001", patient: "Sarah M.", medicine: "Amoxicillin 500mg", qty: 2, total: "$25.00", status: "pending", time: "5 min ago" },
  { id: "#PH-002", patient: "John D.", medicine: "Metformin 1000mg", qty: 1, total: "$8.90", status: "pending", time: "12 min ago" },
  { id: "#PH-003", patient: "Fatima A.", medicine: "Vitamin D3 5000IU", qty: 3, total: "$44.97", status: "processing", time: "1 hr ago" },
  { id: "#PH-004", patient: "Omar H.", medicine: "Lisinopril 10mg", qty: 1, total: "$6.40", status: "fulfilled", time: "2 hr ago" },
];

const stockStatus = { healthy: "success", low: "warning", critical: "error" };

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }) };

export default function PharmacyDashboard() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(incomingOrders);

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1100); return () => clearTimeout(timer); }, []);

  const fulfill = (id) => setOrders((o) => o.map((x) => x.id === id ? { ...x, status: "fulfilled" } : x));
  const decline = (id) => setOrders((o) => o.map((x) => x.id === id ? { ...x, status: "declined" } : x));

  const stats = [
    { label: t("pharmacy.total_inventory"), value: inventoryItems.length.toString(), icon: Package, color: "text-[#14B8A6]", bg: "bg-teal-50" },
    { label: t("pharmacy.incoming_orders"), value: orders.filter((o) => o.status === "pending").length.toString(), icon: ClipboardList, color: "text-[#2563EB]", bg: "bg-blue-50" },
    { label: t("pharmacy.low_stock_items"), value: inventoryItems.filter((i) => i.status !== "healthy").length.toString(), icon: AlertTriangle, color: "text-[#F59E0B]", bg: "bg-amber-50" },
    { label: t("pharmacy.fulfilled_today"), value: "18", icon: CheckCircle2, color: "text-[#22C55E]", bg: "bg-green-50" },
  ];

  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" variants={{ visible: {} }}>
        <motion.div variants={fadeUp} custom={0} className="mb-8">
          <h1 className={`text-2xl font-bold text-[#0F172A] ${dir === "rtl" ? "text-right" : ""}`}>{t("pharmacy.dashboard_title")}</h1>
          <p className={`text-gray-500 text-sm mt-1 ${dir === "rtl" ? "text-right" : ""}`}>{t("pharmacy.dashboard_subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? [1,2,3,4].map((i) => <StatSkeleton key={i} />) : stats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <motion.div variants={fadeUp} custom={4} className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <h2 className="font-semibold text-[#0F172A]">{t("pharmacy.orders_title")}</h2>
              <span className="text-xs bg-blue-50 text-[#2563EB] px-2.5 py-1 rounded-full font-medium border border-blue-100">
                {orders.filter((o) => o.status === "pending").length} pending
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? [1,2,3].map((i) => <div key={i} className="p-4"><TableRowSkeleton /></div>) :
                orders.map((order) => (
                  <div key={order.id} className={`flex items-start gap-3 p-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-2 mb-0.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                        <span className="text-sm font-semibold text-[#0F172A]">{order.id}</span>
                        <Badge variant={order.status === "fulfilled" ? "success" : order.status === "declined" ? "error" : order.status === "processing" ? "warning" : "info"}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{order.medicine} × {order.qty}</p>
                      <p className="text-xs text-gray-400">{order.patient} · {order.time}</p>
                    </div>
                    <div className={`flex items-center gap-2 shrink-0 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                      <span className="text-sm font-bold text-[#0F172A]">{order.total}</span>
                      {order.status === "pending" && (
                        <>
                          <button onClick={() => fulfill(order.id)} className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => decline(order.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="space-y-4">
            <div className="bg-gradient-to-br from-[#14B8A6] to-[#0891b2] rounded-2xl p-6 text-white">
              <div className={`flex items-start justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <div className={dir === "rtl" ? "text-right" : ""}>
                  <p className="text-teal-100 text-sm mb-1">{t("pharmacy.revenue_today")}</p>
                  <p className="text-4xl font-extrabold">$1,842</p>
                  <div className={`flex items-center gap-1 mt-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <TrendingUp className="w-4 h-4 text-teal-200" />
                    <span className="text-teal-100 text-sm">+12.5% vs yesterday</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className={`font-semibold text-[#0F172A] mb-3 ${dir === "rtl" ? "text-right" : ""}`}>{t("pharmacy.low_stock_title")}</h3>
              <div className="space-y-2.5">
                {inventoryItems.filter((i) => i.status !== "healthy").map((item) => (
                  <div key={item.sku} className={`flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className={dir === "rtl" ? "text-right" : ""}>
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.stock} {item.unit} left</p>
                    </div>
                    <div className={`flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                      <Badge variant={stockStatus[item.status]}>{item.status}</Badge>
                      <button className="text-xs px-2.5 py-1 bg-teal-50 text-[#14B8A6] rounded-lg font-medium hover:bg-teal-100 transition-colors flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> {t("pharmacy.restock")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={6} className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className={`px-6 py-4 border-b border-gray-100 ${dir === "rtl" ? "text-right" : ""}`}>
            <h2 className="font-semibold text-[#0F172A]">{t("pharmacy.inventory_title")}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Medicine", "SKU", t("pharmacy.stock_level"), t("pharmacy.reorder_point"), "Unit", "Status"].map((h) => (
                    <th key={h} className={`px-4 py-3 text-xs font-medium text-gray-500 ${dir === "rtl" ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? [1,2,3,4].map((i) => <TableRowSkeleton key={i} />) :
                  inventoryItems.map((item) => (
                    <tr key={item.sku} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className={`px-4 py-3 text-sm font-medium text-gray-800 ${dir === "rtl" ? "text-right" : ""}`}>{item.name}</td>
                      <td className={`px-4 py-3 text-xs text-gray-500 font-mono ${dir === "rtl" ? "text-right" : ""}`}>{item.sku}</td>
                      <td className={`px-4 py-3 text-sm font-semibold ${item.status === "critical" ? "text-red-600" : item.status === "low" ? "text-amber-600" : "text-gray-800"} ${dir === "rtl" ? "text-right" : ""}`}>
                        {item.stock}
                      </td>
                      <td className={`px-4 py-3 text-sm text-gray-500 ${dir === "rtl" ? "text-right" : ""}`}>{item.reorder}</td>
                      <td className={`px-4 py-3 text-sm text-gray-500 ${dir === "rtl" ? "text-right" : ""}`}>{item.unit}</td>
                      <td className={`px-4 py-3 ${dir === "rtl" ? "text-right" : ""}`}>
                        <Badge variant={stockStatus[item.status]}>{item.status}</Badge>
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

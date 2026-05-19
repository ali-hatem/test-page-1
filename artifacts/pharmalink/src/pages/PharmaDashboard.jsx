import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { StatSkeleton, TableRowSkeleton } from "../components/Skeleton";
import { Badge } from "../components/Badge";
import {
  FlaskConical, Truck, Warehouse, ShieldCheck,
  ArrowUpRight, ArrowDownRight, BarChart3, Clock,
} from "lucide-react";

const productionBatches = [
  { id: "BTH-2025-041", name: "Amoxicillin 500mg", qty: "50,000 units", startDate: "May 10", endDate: "May 18", status: "in_production", progress: 75 },
  { id: "BTH-2025-042", name: "Metformin 1000mg", qty: "30,000 units", startDate: "May 12", endDate: "May 16", status: "quality_check", progress: 90 },
  { id: "BTH-2025-043", name: "Lisinopril 10mg", qty: "20,000 units", startDate: "May 14", endDate: "May 17", status: "ready", progress: 100 },
  { id: "BTH-2025-044", name: "Atorvastatin 20mg", qty: "40,000 units", startDate: "May 15", endDate: "May 22", status: "in_production", progress: 30 },
  { id: "BTH-2025-045", name: "Vitamin D3 5000IU", qty: "80,000 units", startDate: "May 8", endDate: "May 14", status: "shipped", progress: 100 },
];

const warehouseSupply = [
  { warehouse: "Central Hub – Zone A", region: "Northeast", stock: 92, lastDelivery: "May 14", status: "healthy" },
  { warehouse: "Regional Hub – Zone B", region: "Southeast", stock: 34, lastDelivery: "May 12", status: "low" },
  { warehouse: "West Distribution Center", region: "West", stock: 67, lastDelivery: "May 15", status: "healthy" },
  { warehouse: "North Depot", region: "North", stock: 12, lastDelivery: "May 10", status: "critical" },
];

const distributionStats = [
  { label: "Batches Shipped (MTD)", value: "28", change: "+6", up: true },
  { label: "Units Distributed", value: "1.2M", change: "+18%", up: true },
  { label: "Quality Pass Rate", value: "99.2%", change: "+0.4%", up: true },
  { label: "Avg Batch Time", value: "7.3 days", change: "-0.9d", up: true },
  { label: "Active Warehouses", value: "12", change: "+1", up: true },
  { label: "Distribution Cost/unit", value: "$0.42", change: "-8%", up: true },
];

const batchStatus = { in_production: "info", quality_check: "warning", ready: "teal", shipped: "success" };
const stockStatus = { healthy: "success", low: "warning", critical: "error" };

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }) };

export default function PharmaDashboard() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1100); return () => clearTimeout(timer); }, []);

  const stats = [
    { label: t("pharma.production_batches"), value: productionBatches.filter((b) => b.status !== "shipped").length.toString(), icon: FlaskConical, color: "text-[#22C55E]", bg: "bg-green-50" },
    { label: t("pharma.warehouses_supplied"), value: warehouseSupply.length.toString(), icon: Warehouse, color: "text-[#2563EB]", bg: "bg-blue-50" },
    { label: t("pharma.active_distribution"), value: "7", icon: Truck, color: "text-[#14B8A6]", bg: "bg-teal-50" },
    { label: t("pharma.quality_passed"), value: "99.2%", icon: ShieldCheck, color: "text-[#F59E0B]", bg: "bg-amber-50" },
  ];

  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" variants={{ visible: {} }}>
        <motion.div variants={fadeUp} custom={0} className="mb-8">
          <h1 className={`text-2xl font-bold text-[#0F172A] ${dir === "rtl" ? "text-right" : ""}`}>{t("pharma.dashboard_title")}</h1>
          <p className={`text-gray-500 text-sm mt-1 ${dir === "rtl" ? "text-right" : ""}`}>{t("pharma.dashboard_subtitle")}</p>
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

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <motion.div variants={fadeUp} custom={4} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className={`font-semibold text-[#0F172A] mb-4 flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse text-right" : ""}`}>
              <BarChart3 className="w-4 h-4 text-[#22C55E]" />
              {t("pharma.distribution_title")}
            </h2>
            <div className="space-y-3">
              {distributionStats.map((item) => (
                <div key={item.label} className={`flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <div className={dir === "rtl" ? "text-right" : ""}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-base font-bold text-[#0F172A]">{item.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${item.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"} ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    {item.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {item.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className={`px-6 py-4 border-b border-gray-100 ${dir === "rtl" ? "text-right" : ""}`}>
              <h2 className="font-semibold text-[#0F172A]">{t("pharma.supply_title")}</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {loading ? [1,2,3,4].map((i) => <div key={i} className="p-4"><TableRowSkeleton /></div>) :
                warehouseSupply.map((wh) => (
                  <div key={wh.warehouse} className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <Warehouse className="w-5 h-5 text-[#22C55E]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-2 mb-1 flex-wrap ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                        <p className="text-sm font-semibold text-[#0F172A]">{wh.warehouse}</p>
                        <Badge variant={stockStatus[wh.status]}>{wh.status}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">{wh.region} · Last delivery: {wh.lastDelivery}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${wh.stock >= 70 ? "bg-green-400" : wh.stock >= 40 ? "bg-amber-400" : "bg-red-400"}`}
                            style={{ width: `${wh.stock}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 shrink-0">{wh.stock}%</span>
                      </div>
                    </div>
                    {wh.status !== "healthy" && (
                      <button className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-[#22C55E] border border-green-200 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                        <Truck className="w-3 h-3" />
                        Resupply
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={6} className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <h2 className="font-semibold text-[#0F172A]">{t("pharma.production_title")}</h2>
            <Badge variant="info">{productionBatches.filter((b) => b.status === "in_production").length} in production</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {[t("pharma.batch"), "Medicine", "Quantity", "Timeline", "Progress", "Status"].map((h) => (
                    <th key={h} className={`px-4 py-3 text-xs font-medium text-gray-500 ${dir === "rtl" ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? [1,2,3,4].map((i) => <TableRowSkeleton key={i} />) :
                  productionBatches.map((batch) => (
                    <tr key={batch.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className={`px-4 py-3 text-xs font-mono text-[#22C55E] ${dir === "rtl" ? "text-right" : ""}`}>{batch.id}</td>
                      <td className={`px-4 py-3 text-sm font-medium text-gray-800 ${dir === "rtl" ? "text-right" : ""}`}>{batch.name}</td>
                      <td className={`px-4 py-3 text-sm text-gray-600 ${dir === "rtl" ? "text-right" : ""}`}>{batch.qty}</td>
                      <td className={`px-4 py-3 ${dir === "rtl" ? "text-right" : ""}`}>
                        <div className={`flex items-center gap-1 text-xs text-gray-500 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                          <Clock className="w-3 h-3" />
                          {batch.startDate} → {batch.endDate}
                        </div>
                      </td>
                      <td className={`px-4 py-3 ${dir === "rtl" ? "text-right" : ""}`}>
                        <div className="flex items-center gap-2" style={{ minWidth: 100 }}>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${batch.progress === 100 ? "bg-green-400" : batch.progress >= 80 ? "bg-amber-400" : "bg-blue-400"}`}
                              style={{ width: `${batch.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{batch.progress}%</span>
                        </div>
                      </td>
                      <td className={`px-4 py-3 ${dir === "rtl" ? "text-right" : ""}`}>
                        <Badge variant={batchStatus[batch.status]}>
                          {t(`pharma.status_${batch.status}`)}
                        </Badge>
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

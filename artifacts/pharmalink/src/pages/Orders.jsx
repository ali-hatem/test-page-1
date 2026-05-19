import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { TableRowSkeleton } from "../components/Skeleton";
import { Badge } from "../components/Badge";
import { MapPin, RefreshCw, Package } from "lucide-react";

const allOrders = [
  { id: "#PL-2025-001", medicine: "Amoxicillin 500mg", pharmacy: "City Pharmacy", date: "May 14, 2025", status: "delivered", total: "$12.50", items: 2 },
  { id: "#PL-2025-002", medicine: "Metformin 1000mg", pharmacy: "MedPlus", date: "May 13, 2025", status: "transit", total: "$8.90", items: 1 },
  { id: "#PL-2025-003", medicine: "Lisinopril 10mg", pharmacy: "HealthHub", date: "May 12, 2025", status: "processing", total: "$6.40", items: 3 },
  { id: "#PL-2025-004", medicine: "Atorvastatin 20mg", pharmacy: "Pharma Express", date: "May 11, 2025", status: "pending", total: "$15.20", items: 1 },
  { id: "#PL-2025-005", medicine: "Vitamin D3 5000IU", pharmacy: "HealthHub", date: "May 10, 2025", status: "delivered", total: "$14.99", items: 2 },
  { id: "#PL-2025-006", medicine: "Ibuprofen 400mg", pharmacy: "City Pharmacy", date: "May 9, 2025", status: "cancelled", total: "$6.50", items: 1 },
  { id: "#PL-2025-007", medicine: "Cetirizine 10mg", pharmacy: "MedPlus", date: "May 7, 2025", status: "delivered", total: "$11.20", items: 2 },
];

const statusVariant = {
  delivered: "success", transit: "info", processing: "warning", pending: "gray", cancelled: "error",
};

export default function Orders() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const tabs = ["all", "active", "delivered", "cancelled"];

  const filtered = allOrders.filter((o) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return ["transit", "processing", "pending"].includes(o.status);
    return o.status === activeTab;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={`text-2xl font-bold text-[#0F172A] ${dir === "rtl" ? "text-right" : ""}`}>{t("orders.title")}</h1>
          <p className={`text-gray-500 text-sm mt-1 ${dir === "rtl" ? "text-right" : ""}`}>{t("orders.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: t("orders.all"), value: allOrders.length, color: "text-[#2563EB]", bg: "bg-blue-50" },
            { label: t("orders.active"), value: allOrders.filter(o => ["transit","processing","pending"].includes(o.status)).length, color: "text-[#F59E0B]", bg: "bg-amber-50" },
            { label: t("orders.delivered"), value: allOrders.filter(o => o.status === "delivered").length, color: "text-[#22C55E]", bg: "bg-green-50" },
            { label: t("orders.cancelled"), value: allOrders.filter(o => o.status === "cancelled").length, color: "text-red-500", bg: "bg-red-50" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
            >
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className={`flex gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-[#2563EB]"
              }`}
            >
              {t(`orders.${tab}`)}
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          {!loading && filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">{t("orders.empty")}</p>
              <p className="text-gray-400 text-sm mt-1">{t("orders.empty_sub")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {[t("orders.order_id"), t("orders.items"), "Pharmacy", t("orders.date"), t("orders.status"), t("orders.total"), "Actions"].map((h) => (
                      <th key={h} className={`px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap ${dir === "rtl" ? "text-right" : "text-left"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? [1, 2, 3, 4, 5].map((i) => <TableRowSkeleton key={i} />)
                    : filtered.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className={`px-4 py-3.5 text-sm font-medium text-[#2563EB] whitespace-nowrap ${dir === "rtl" ? "text-right" : ""}`}>{order.id}</td>
                          <td className={`px-4 py-3.5 ${dir === "rtl" ? "text-right" : ""}`}>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{order.medicine}</p>
                              <p className="text-xs text-gray-500">{order.items} item{order.items > 1 ? "s" : ""}</p>
                            </div>
                          </td>
                          <td className={`px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap ${dir === "rtl" ? "text-right" : ""}`}>{order.pharmacy}</td>
                          <td className={`px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap ${dir === "rtl" ? "text-right" : ""}`}>{order.date}</td>
                          <td className={`px-4 py-3.5 ${dir === "rtl" ? "text-right" : ""}`}>
                            <Badge variant={statusVariant[order.status]}>{t(`dashboard.order_${order.status}`)}</Badge>
                          </td>
                          <td className={`px-4 py-3.5 text-sm font-semibold text-gray-800 ${dir === "rtl" ? "text-right" : ""}`}>{order.total}</td>
                          <td className={`px-4 py-3.5 ${dir === "rtl" ? "text-right" : ""}`}>
                            <div className={`flex items-center gap-1.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                              {["transit", "processing", "pending"].includes(order.status) && (
                                <Link to={`/tracking/${order.id.replace("#", "")}`}
                                  className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-blue-50 text-[#2563EB] hover:bg-blue-100 transition-colors font-medium"
                                >
                                  <MapPin className="w-3 h-3" />
                                  {t("orders.track")}
                                </Link>
                              )}
                              {order.status === "delivered" && (
                                <button className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium">
                                  <RefreshCw className="w-3 h-3" />
                                  {t("orders.reorder")}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

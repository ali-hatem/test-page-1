import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { StatSkeleton, TableRowSkeleton } from "../components/Skeleton";
import { Badge } from "../components/Badge";
import {
  ShoppingBag, Pill, Bookmark, RefreshCw,
  Search, Plus, Upload, ArrowRight, TrendingUp, Clock,
} from "lucide-react";

const mockOrders = [
  { id: "#PL-001", medicine: "Amoxicillin 500mg", date: "May 14, 2025", status: "delivered", total: "$12.50" },
  { id: "#PL-002", medicine: "Metformin 1000mg", date: "May 13, 2025", status: "transit", total: "$8.90" },
  { id: "#PL-003", medicine: "Lisinopril 10mg", date: "May 12, 2025", status: "processing", total: "$6.40" },
  { id: "#PL-004", medicine: "Atorvastatin 20mg", date: "May 11, 2025", status: "pending", total: "$15.20" },
];

const statusVariant = {
  delivered: "success",
  transit: "info",
  processing: "warning",
  pending: "gray",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }),
};

export default function Dashboard() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: t("dashboard.total_orders"), value: "24", icon: ShoppingBag, color: "text-[#2563EB]", bg: "bg-blue-50", change: "+3 this month" },
    { label: t("dashboard.active_prescriptions"), value: "5", icon: Pill, color: "text-[#14B8A6]", bg: "bg-teal-50", change: "2 expiring soon" },
    { label: t("dashboard.saved_medicines"), value: "12", icon: Bookmark, color: "text-[#22C55E]", bg: "bg-green-50", change: "+1 this week" },
    { label: t("dashboard.pending_refills"), value: "3", icon: RefreshCw, color: "text-[#F59E0B]", bg: "bg-amber-50", change: "Due this week" },
  ];

  const quickActions = [
    { label: t("dashboard.search_medicine"), icon: Search, href: "/search", color: "bg-[#2563EB] text-white hover:bg-blue-700" },
    { label: t("dashboard.new_order"), icon: Plus, href: "/orders", color: "bg-[#14B8A6] text-white hover:bg-teal-600" },
    { label: t("dashboard.upload_prescription"), icon: Upload, href: "/settings", color: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200" },
  ];

  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" variants={{ visible: {} }}>
        <motion.div variants={fadeUp} custom={0} className="mb-8">
          <h1 className="text-2xl font-bold text-[#0F172A]">
            {t("dashboard.greeting")}, Ahmed 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">{t("dashboard.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading
            ? [1, 2, 3, 4].map((i) => <StatSkeleton key={i} />)
            : stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp} custom={i}
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
                  <div className={`flex items-center gap-1 mt-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-500">{stat.change}</span>
                  </div>
                </motion.div>
              ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div variants={fadeUp} custom={4} className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <h2 className="font-semibold text-[#0F172A]">{t("dashboard.recent_orders")}</h2>
              <Link to="/orders" className={`flex items-center gap-1 text-xs text-[#2563EB] hover:underline ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                {t("dashboard.view_all")} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {[t("orders.order_id"), t("orders.items"), t("orders.date"), t("orders.status"), t("orders.total")].map((h) => (
                      <th key={h} className={`px-4 py-3 text-xs font-medium text-gray-500 ${dir === "rtl" ? "text-right" : "text-left"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? [1, 2, 3, 4].map((i) => <TableRowSkeleton key={i} />)
                    : mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className={`px-4 py-3 text-sm font-medium text-[#2563EB] ${dir === "rtl" ? "text-right" : ""}`}>{order.id}</td>
                          <td className={`px-4 py-3 text-sm text-gray-700 ${dir === "rtl" ? "text-right" : ""}`}>{order.medicine}</td>
                          <td className={`px-4 py-3 text-sm text-gray-500 whitespace-nowrap ${dir === "rtl" ? "text-right" : ""}`}>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {order.date}</span>
                          </td>
                          <td className={`px-4 py-3 ${dir === "rtl" ? "text-right" : ""}`}>
                            <Badge variant={statusVariant[order.status]}>
                              {t(`dashboard.order_${order.status}`)}
                            </Badge>
                          </td>
                          <td className={`px-4 py-3 text-sm font-medium text-gray-700 ${dir === "rtl" ? "text-right" : ""}`}>{order.total}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className={`font-semibold text-[#0F172A] mb-5 ${dir === "rtl" ? "text-right" : ""}`}>{t("dashboard.quick_actions")}</h2>
            <div className="space-y-3">
              {quickActions.map(({ label, icon: Icon, href, color }) => (
                <Link
                  key={label}
                  to={href}
                  className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${color} ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </Link>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100">
              <div className={`flex items-start gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <Pill className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <p className={`text-xs font-semibold text-[#2563EB] mb-1 ${dir === "rtl" ? "text-right" : ""}`}>Health Reminder</p>
                  <p className={`text-xs text-gray-600 ${dir === "rtl" ? "text-right" : ""}`}>You have 3 prescriptions that need refilling this week. Don't forget to order on time.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { Skeleton } from "../components/Skeleton";
import { Bell, CheckCheck, Package, RefreshCw, AlertTriangle, Info, Check } from "lucide-react";

const mockNotifications = [
  { id: 1, type: "orders", title: "Order Delivered", message: "Your order #PL-2025-001 (Amoxicillin 500mg) has been delivered successfully.", time: "2 min ago", read: false, icon: Package, iconColor: "text-green-600", iconBg: "bg-green-50" },
  { id: 2, type: "refills", title: "Refill Reminder", message: "Metformin 1000mg is running low. Only 5 days of supply remaining.", time: "1 hour ago", read: false, icon: RefreshCw, iconColor: "text-amber-600", iconBg: "bg-amber-50" },
  { id: 3, type: "alerts", title: "Prescription Expiring", message: "Your prescription for Lisinopril 10mg expires in 3 days. Please consult your doctor.", time: "3 hours ago", read: false, icon: AlertTriangle, iconColor: "text-red-600", iconBg: "bg-red-50" },
  { id: 4, type: "orders", title: "Order Shipped", message: "Your order #PL-2025-002 is out for delivery. Expected by 6 PM today.", time: "5 hours ago", read: true, icon: Package, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
  { id: 5, type: "alerts", title: "New Feature Available", message: "You can now upload prescription photos directly from your camera.", time: "Yesterday", read: true, icon: Info, iconColor: "text-[#2563EB]", iconBg: "bg-blue-50" },
  { id: 6, type: "refills", title: "Refill Successful", message: "Your Atorvastatin 20mg prescription has been refilled at City Pharmacy.", time: "2 days ago", read: true, icon: RefreshCw, iconColor: "text-teal-600", iconBg: "bg-teal-50" },
  { id: 7, type: "orders", title: "Order Confirmed", message: "Your order #PL-2025-004 has been confirmed. Preparing for dispatch.", time: "2 days ago", read: true, icon: Check, iconColor: "text-green-600", iconBg: "bg-green-50" },
];

export default function Notifications() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filters = ["all", "unread", "orders", "refills", "alerts"];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className={`flex items-start justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}
        >
          <div className={dir === "rtl" ? "text-right" : ""}>
            <div className={`flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <h1 className="text-2xl font-bold text-[#0F172A]">{t("notifications.title")}</h1>
              {unreadCount > 0 && (
                <span className="bg-[#2563EB] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1">{t("notifications.subtitle")}</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className={`flex items-center gap-1.5 text-sm text-[#2563EB] hover:underline font-medium ${dir === "rtl" ? "flex-row-reverse" : ""}`}
            >
              <CheckCheck className="w-4 h-4" />
              {t("notifications.mark_all")}
            </button>
          )}
        </motion.div>

        <div className={`flex gap-2 flex-wrap ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f ? "bg-[#2563EB] text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-[#2563EB]"
              }`}
            >
              {t(`notifications.filter_${f}`)}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-3">
                <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-gray-100">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">{t("notifications.empty")}</p>
              <p className="text-gray-400 text-sm mt-1">{t("notifications.empty_sub")}</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => markRead(notif.id)}
                  className={`bg-white rounded-2xl border transition-all cursor-pointer group hover:shadow-md ${
                    notif.read ? "border-gray-100" : "border-blue-100 shadow-sm"
                  }`}
                >
                  <div className={`flex gap-3.5 p-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-10 h-10 rounded-xl ${notif.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <notif.icon className={`w-5 h-5 ${notif.iconColor}`} />
                    </div>
                    <div className={`flex-1 min-w-0 ${dir === "rtl" ? "text-right" : ""}`}>
                      <div className={`flex items-center justify-between gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                        <p className={`text-sm font-semibold text-[#0F172A] ${notif.read ? "" : "font-bold"}`}>{notif.title}</p>
                        <div className={`flex items-center gap-2 shrink-0 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                          <span className="text-xs text-gray-400 whitespace-nowrap">{notif.time}</span>
                          {!notif.read && <div className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

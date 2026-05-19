import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { CheckCircle2, Circle, Truck, Package, ClipboardList, Home, MapPin, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  { key: "order_placed", icon: ClipboardList, completed: true },
  { key: "processing", icon: Package, completed: true },
  { key: "dispatched", icon: Package, completed: true },
  { key: "out_for_delivery", icon: Truck, completed: true },
  { key: "delivered", icon: Home, completed: false },
];

export default function Tracking() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const currentStep = 3;

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`flex items-center gap-2 mb-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <Link to="/orders" className="text-gray-500 hover:text-[#2563EB] transition-colors">
              {dir === "rtl" ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Link>
            <h1 className="text-2xl font-bold text-[#0F172A]">{t("tracking.title")}</h1>
          </div>
          <div className={`inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] px-4 py-1.5 rounded-full text-sm font-medium ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            Order {id || "#PL-2025-002"} · In Transit
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl h-48 flex items-center justify-center relative overflow-hidden border border-blue-200"
        >
          <div className="absolute inset-0 opacity-30">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute border border-blue-300/50" style={{ left: `${i * 12.5}%`, top: 0, bottom: 0, width: 1 }} />
            ))}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute border border-blue-300/50" style={{ top: `${i * 16.67}%`, left: 0, right: 0, height: 1 }} />
            ))}
          </div>
          <div className="relative text-center">
            <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg animate-pulse">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-[#0F172A]">Live tracking available</p>
            <p className="text-xs text-gray-600">Driver is 2.4 km away</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <div className="relative">
            <div className={`absolute top-6 bottom-6 w-0.5 bg-gray-100 ${dir === "rtl" ? "right-[22px]" : "left-[22px]"}`} />
            <div className={`absolute top-6 w-0.5 bg-[#2563EB] ${dir === "rtl" ? "right-[22px]" : "left-[22px]"}`}
              style={{ height: `${(currentStep / (steps.length - 1)) * 100}%`, maxHeight: "calc(100% - 48px)" }}
            />
            <div className="space-y-6">
              {steps.map((step, i) => {
                const isCompleted = i <= currentStep;
                const isCurrent = i === currentStep;
                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: dir === "rtl" ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start gap-4 relative ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-all ${
                      isCurrent
                        ? "bg-[#2563EB] border-[#2563EB] shadow-lg shadow-blue-200"
                        : isCompleted
                          ? "bg-[#22C55E] border-[#22C55E]"
                          : "bg-white border-gray-200"
                    }`}>
                      {isCompleted || isCurrent ? (
                        isCurrent ? <step.icon className="w-5 h-5 text-white" /> : <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                    <div className={`flex-1 pb-1 ${dir === "rtl" ? "text-right" : ""}`}>
                      <p className={`font-medium text-sm ${isCompleted || isCurrent ? "text-[#0F172A]" : "text-gray-400"}`}>
                        {t(`tracking.${step.key}`)}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-[#2563EB] font-medium mt-0.5">Current status</p>
                      )}
                      {isCompleted && !isCurrent && (
                        <p className="text-xs text-gray-400 mt-0.5">Completed</p>
                      )}
                    </div>
                    {isCurrent && (
                      <div className={`shrink-0 ${dir === "rtl" ? "mr-auto" : "ml-auto"}`}>
                        <span className="bg-blue-50 text-[#2563EB] text-xs font-medium px-2.5 py-1 rounded-full border border-blue-100">Live</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
        >
          <div className={`flex items-start gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div className={dir === "rtl" ? "text-right" : ""}>
              <p className="text-xs text-gray-500 mb-0.5">{t("tracking.delivery_address")}</p>
              <p className="text-sm font-medium text-[#0F172A]">123 Main Street, New York, NY 10001</p>
            </div>
          </div>
          <div className={`flex items-start gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-amber-600" />
            </div>
            <div className={dir === "rtl" ? "text-right" : ""}>
              <p className="text-xs text-gray-500 mb-0.5">{t("tracking.estimated")}</p>
              <p className="text-sm font-medium text-[#0F172A]">Today, between 4:00 PM – 6:00 PM</p>
            </div>
          </div>
          <button className={`w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-[#2563EB] transition-all ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <Phone className="w-4 h-4" />
            {t("tracking.contact_support")}
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

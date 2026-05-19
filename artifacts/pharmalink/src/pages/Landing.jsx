import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import {
  Search, ShieldCheck, MapPin, RefreshCw, ArrowRight,
  Star, CheckCircle2, Pill, Zap, Users, Building2, Package,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const features = [
  { icon: Search, color: "bg-blue-100 text-[#2563EB]", key: "feature1" },
  { icon: MapPin, color: "bg-teal-100 text-[#14B8A6]", key: "feature2" },
  { icon: RefreshCw, color: "bg-green-100 text-[#22C55E]", key: "feature3" },
  { icon: ShieldCheck, color: "bg-amber-100 text-[#F59E0B]", key: "feature4" },
];

const testimonials = [
  { nameKey: "testimonial1_name", roleKey: "testimonial1_role", textKey: "testimonial1_text", avatar: "S" },
  { nameKey: "testimonial2_name", roleKey: "testimonial2_role", textKey: "testimonial2_text", avatar: "A" },
  { nameKey: "testimonial3_name", roleKey: "testimonial3_role", textKey: "testimonial3_text", avatar: "L" },
];

export default function Landing() {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  return (
    <MainLayout>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-teal-50/40 pointer-events-none" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-teal-100/30 rounded-full blur-2xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] px-4 py-1.5 rounded-full text-sm font-medium border border-blue-100 mb-6"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t("landing.hero_badge")}
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-5xl sm:text-6xl font-extrabold text-[#0F172A] leading-tight mb-4"
            >
              {t("landing.hero_title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">
                {t("landing.hero_title2")}
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              {t("landing.hero_subtitle")}
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className={`flex flex-col sm:flex-row gap-3 justify-center ${dir === "rtl" ? "sm:flex-row-reverse" : ""}`}
            >
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#2563EB] text-white rounded-xl font-semibold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("landing.cta_start")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0F172A] rounded-xl font-semibold text-base border border-gray-200 hover:border-blue-300 hover:text-[#2563EB] transition-all hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4" />
                {t("landing.cta_learn")}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4 bg-white rounded-lg border border-gray-200 h-7 flex items-center px-3">
                <span className="text-xs text-gray-400">pharmalink.app/dashboard</span>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: t("dashboard.total_orders"), value: "24", color: "text-[#2563EB]", bg: "bg-blue-50" },
                { label: t("dashboard.active_prescriptions"), value: "5", color: "text-[#14B8A6]", bg: "bg-teal-50" },
                { label: t("dashboard.saved_medicines"), value: "12", color: "text-[#22C55E]", bg: "bg-green-50" },
                { label: t("dashboard.pending_refills"), value: "3", color: "text-[#F59E0B]", bg: "bg-amber-50" },
              ].map((stat, i) => (
                <div key={i} className={`${stat.bg} rounded-xl p-4`}>
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 space-y-2">
              {[
                { name: "Amoxicillin 500mg", status: t("dashboard.order_delivered"), color: "text-green-600 bg-green-50" },
                { name: "Metformin 1000mg", status: t("dashboard.order_transit"), color: "text-blue-600 bg-blue-50" },
                { name: "Lisinopril 10mg", status: t("dashboard.order_processing"), color: "text-amber-600 bg-amber-50" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                      <Pill className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0F172A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", key: "stats_patients", icon: Users },
              { value: "1,200+", key: "stats_pharmacies", icon: Building2 },
              { value: "25K+", key: "stats_medicines", icon: Package },
              { value: "99.9%", key: "stats_uptime", icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{t(`landing.${stat.key}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4"
            >
              {t("landing.features_title")}
            </motion.h2>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}
              className="text-gray-600 max-w-xl mx-auto"
            >
              {t("landing.features_subtitle")}
            </motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, color, key }, i) => (
              <motion.div
                key={key}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.5} viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-[#0F172A] mb-2">{t(`landing.${key}_title`)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(`landing.${key}_desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-[#0F172A]"
            >
              {t("landing.how_title")}
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {["how1", "how2", "how3"].map((key, i) => (
              <motion.div
                key={key}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.5} viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#2563EB] border border-blue-100">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-[#0F172A] text-lg mb-2">{t(`landing.${key}_title`)}</h3>
                <p className="text-gray-600 text-sm">{t(`landing.${key}_desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-[#0F172A]"
            >
              {t("landing.testimonials_title")}
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ nameKey, roleKey, textKey, avatar }, i) => (
              <motion.div
                key={nameKey}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.3} viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t(`landing.${textKey}`)}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white font-bold text-sm">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">{t(`landing.${nameKey}`)}</p>
                    <p className="text-xs text-gray-500">{t(`landing.${roleKey}`)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            {t("landing.hero_title")} {t("landing.hero_title2")}
          </motion.h2>
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}
            className="text-blue-100 mb-8 max-w-xl mx-auto"
          >
            {t("landing.hero_subtitle")}
          </motion.p>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" custom={2} viewport={{ once: true }}
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2563EB] rounded-xl font-bold text-base hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-0.5"
            >
              {t("landing.cta_start")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}

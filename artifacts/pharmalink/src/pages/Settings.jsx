import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { User, Shield, Bell, Globe, Check, Camera } from "lucide-react";

const tabs = ["profile", "security", "notifications_tab", "language_tab"];
const tabIcons = [User, Shield, Bell, Globe];

export default function Settings() {
  const { t } = useTranslation();
  const { dir, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Ahmed Ali", email: "ahmed@example.com", phone: "+1 234 567 8900", address: "123 Main St, New York, NY",
    currentPassword: "", newPassword: "", confirmPassword: "",
    pushNotif: true, emailNotif: true, smsNotif: false,
    orderUpdates: true, refillReminders: true, promoAlerts: false,
    language: language, region: "US", timezone: "America/New_York",
  });

  const handleSave = async () => {
    if (form.language !== language) setLanguage(form.language);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  function Toggle({ value, onChange }) {
    return (
      <button
        onClick={onChange}
        className={`relative w-10 rounded-full transition-colors ${value ? "bg-[#2563EB]" : "bg-gray-200"}`}
        style={{ height: 22 }}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? (dir === "rtl" ? "translate-x-0 left-1" : "translate-x-5") : (dir === "rtl" ? "translate-x-5" : "translate-x-0.5")}`} />
      </button>
    );
  }

  function Field({ label, value, onChange, type = "text", placeholder = "" }) {
    return (
      <div>
        <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${dir === "rtl" ? "text-right" : ""}`}>{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all ${dir === "rtl" ? "text-right" : ""}`}
          dir={dir}
        />
      </div>
    );
  }

  const notifToggles = [
    { key: "push_notifications", field: "pushNotif" },
    { key: "email_notifications", field: "emailNotif" },
    { key: "sms_notifications", field: "smsNotif" },
    { key: "order_updates", field: "orderUpdates" },
    { key: "refill_reminders", field: "refillReminders" },
    { key: "promo_alerts", field: "promoAlerts" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={`text-2xl font-bold text-[#0F172A] ${dir === "rtl" ? "text-right" : ""}`}>{t("settings.title")}</h1>
          <p className={`text-gray-500 text-sm mt-1 ${dir === "rtl" ? "text-right" : ""}`}>{t("settings.subtitle")}</p>
        </motion.div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <div className={`flex lg:flex-col gap-1 overflow-x-auto lg:w-48 shrink-0 ${dir === "rtl" ? "lg:items-end" : ""}`}>
            {tabs.map((tab, i) => {
              const Icon = tabIcons[i];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 ${
                    activeTab === tab ? "bg-[#2563EB] text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                  } ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {t(`settings.${tab}`)}
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            {activeTab === "profile" && (
              <div className="space-y-5">
                <div className={`flex items-center gap-4 mb-6 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white text-xl font-bold">A</div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center text-white">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div className={dir === "rtl" ? "text-right" : ""}>
                    <p className="font-semibold text-[#0F172A]">{form.name}</p>
                    <p className="text-sm text-gray-500">{form.email}</p>
                  </div>
                </div>
                <Field label={t("settings.full_name")} value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label={t("settings.email")} value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
                <Field label={t("settings.phone")} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Field label={t("settings.address")} value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-5">
                <Field label={t("settings.current_password")} value={form.currentPassword} onChange={(v) => setForm({ ...form, currentPassword: v })} type="password" placeholder="••••••••" />
                <Field label={t("settings.new_password")} value={form.newPassword} onChange={(v) => setForm({ ...form, newPassword: v })} type="password" placeholder="••••••••" />
                <Field label={t("settings.confirm_password")} value={form.confirmPassword} onChange={(v) => setForm({ ...form, confirmPassword: v })} type="password" placeholder="••••••••" />
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <p className={`text-sm text-amber-700 ${dir === "rtl" ? "text-right" : ""}`}>
                    Use at least 8 characters including uppercase, lowercase, numbers and symbols for a strong password.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "notifications_tab" && (
              <div className="space-y-4">
                {notifToggles.map(({ key, field }) => (
                  <div key={key} className={`flex items-center justify-between py-2 border-b border-gray-50 last:border-0 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <span className="text-sm text-gray-700">{t(`settings.${key}`)}</span>
                    <Toggle value={form[field]} onChange={() => setForm({ ...form, [field]: !form[field] })} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "language_tab" && (
              <div className="space-y-5">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${dir === "rtl" ? "text-right" : ""}`}>{t("settings.language")}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ value: "en", label: "English", flag: "🇺🇸" }, { value: "ar", label: "العربية", flag: "🇸🇦" }].map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => setForm({ ...form, language: lang.value })}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                          form.language === lang.value
                            ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                            : "border-gray-200 text-gray-600 hover:border-blue-200"
                        } ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        {lang.label}
                        {form.language === lang.value && <Check className="w-4 h-4 ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${dir === "rtl" ? "text-right" : ""}`}>{t("settings.timezone")}</label>
                  <select value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2563EB] bg-white ${dir === "rtl" ? "text-right" : ""}`}
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Asia/Riyadh">Riyadh (AST)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-2.5 text-white rounded-xl text-sm font-semibold transition-all shadow-sm ${dir === "rtl" ? "flex-row-reverse ml-auto" : ""} ${saved ? "bg-green-500 hover:bg-green-500" : "bg-[#2563EB] hover:bg-blue-700"}`}
              >
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : t("settings.save")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

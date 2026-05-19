import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, User, Building2, Warehouse, FlaskConical } from "lucide-react";

const demoUsers = [
  { role: "patient", label: "Patient Demo", icon: User, color: "text-[#2563EB]", bg: "bg-blue-50" },
  { role: "pharmacy", label: "Pharmacy Demo", icon: Building2, color: "text-[#14B8A6]", bg: "bg-teal-50" },
  { role: "warehouse", label: "Warehouse Demo", icon: Warehouse, color: "text-[#F59E0B]", bg: "bg-amber-50" },
  { role: "pharma_company", label: "Pharma Co. Demo", icon: FlaskConical, color: "text-[#22C55E]", bg: "bg-green-50" },
];

export default function Login() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError(t("common.required"));
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    login({ name: "Ahmed Ali", email: form.email, role: "patient", avatarInitial: "A" });
    setLoading(false);
    navigate("/dashboard");
  };

  const handleDemo = async (role, label) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login({ name: label.replace(" Demo", ""), email: `${role}@pharmalink.demo`, role, avatarInitial: label[0].toUpperCase() });
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-1">{t("auth.welcome_back")}</h1>
            <p className="text-gray-500 text-sm">{t("auth.login_subtitle")}</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${dir === "rtl" ? "text-right" : ""}`}>
                {t("auth.email")}
              </label>
              <div className="relative">
                <Mail className={`absolute top-3.5 w-4 h-4 text-gray-400 ${dir === "rtl" ? "right-3.5" : "left-3.5"}`} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full ${dir === "rtl" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all`}
                  placeholder="you@example.com"
                  dir={dir}
                />
              </div>
            </div>

            <div>
              <div className={`flex items-center justify-between mb-1.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <label className="text-sm font-medium text-gray-700">{t("auth.password")}</label>
                <Link to="#" className="text-xs text-[#2563EB] hover:underline">{t("auth.forgot")}</Link>
              </div>
              <div className="relative">
                <Lock className={`absolute top-3.5 w-4 h-4 text-gray-400 ${dir === "rtl" ? "right-3.5" : "left-3.5"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`w-full ${dir === "rtl" ? "pr-10 pl-10" : "pl-10 pr-10"} py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-3.5 ${dir === "rtl" ? "left-3.5" : "right-3.5"} text-gray-400 hover:text-gray-600`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#2563EB] text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all disabled:opacity-70 shadow-lg shadow-blue-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  {t("auth.login_btn")}
                </>
              )}
            </button>
          </form>

          <p className={`text-center text-sm text-gray-500 mt-6 ${dir === "rtl" ? "text-right" : ""}`}>
            {t("auth.no_account")}{" "}
            <Link to="/signup" className="text-[#2563EB] font-medium hover:underline">
              {t("auth.signup_link")}
            </Link>
          </p>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 mb-3 font-medium uppercase tracking-wide">Try a demo account</p>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map(({ role, label, icon: Icon, color, bg }) => (
                <button
                  key={role}
                  onClick={() => handleDemo(role, label)}
                  disabled={loading}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-xs font-medium text-gray-700 ${dir === "rtl" ? "flex-row-reverse" : ""} disabled:opacity-60`}
                >
                  <div className={`w-6 h-6 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                  </div>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import {
  User, Building2, Warehouse, FlaskConical,
  Eye, EyeOff, Mail, Lock, Phone, MapPin,
  ArrowRight, ArrowLeft, Upload, AlertCircle, Check,
} from "lucide-react";

const roles = [
  { id: "patient", icon: User, color: "text-[#2563EB]", bg: "bg-blue-50", border: "border-blue-200" },
  { id: "pharmacy", icon: Building2, color: "text-[#14B8A6]", bg: "bg-teal-50", border: "border-teal-200" },
  { id: "warehouse", icon: Warehouse, color: "text-[#F59E0B]", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "pharma_company", icon: FlaskConical, color: "text-[#22C55E]", bg: "bg-green-50", border: "border-green-200" },
];

const roleTranslationKey = {
  patient: "patient",
  pharmacy: "pharmacy",
  warehouse: "warehouse",
  pharma_company: "pharma",
};

export default function Signup() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("role");
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [fileNames, setFileNames] = useState({});

  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirm: "", location: "",
    verificationNumber: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleFileChange = (key) => (e) => {
    const file = e.target.files?.[0];
    if (file) setFileNames((f) => ({ ...f, [key]: file.name }));
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    setStep("form");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) { setError(t("common.required")); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    if (!agreed) { setError("Please agree to the terms and conditions"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    login({ name: form.name, email: form.email, role: selectedRole, avatarInitial: form.name[0]?.toUpperCase() || "U" });
    setLoading(false);
    navigate("/dashboard");
  };

  const nameLabel = () => {
    if (selectedRole === "pharmacy") return t("auth.pharmacy_name");
    if (selectedRole === "warehouse") return t("auth.warehouse_name");
    if (selectedRole === "pharma_company") return t("auth.company_name");
    return t("auth.full_name");
  };

  const emailLabel = () =>
    selectedRole !== "patient" ? t("auth.official_email") : t("auth.email");

  function Field({ label, name, type = "text", placeholder = "", icon: Icon }) {
    return (
      <div>
        <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${dir === "rtl" ? "text-right" : ""}`}>{label}</label>
        <div className="relative">
          <Icon className={`absolute top-3.5 w-4 h-4 text-gray-400 ${dir === "rtl" ? "right-3.5" : "left-3.5"}`} />
          <input
            type={type}
            value={form[name]}
            onChange={set(name)}
            placeholder={placeholder}
            className={`w-full ${dir === "rtl" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all`}
            dir={dir}
          />
        </div>
      </div>
    );
  }

  function FileField({ label, fieldKey, hint }) {
    return (
      <div>
        <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${dir === "rtl" ? "text-right" : ""}`}>{label}</label>
        <label className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <Upload className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-500 truncate">{fileNames[fieldKey] || hint}</span>
          <input type="file" className="hidden" onChange={handleFileChange(fieldKey)} accept=".pdf,.jpg,.jpeg,.png" />
        </label>
      </div>
    );
  }

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <AnimatePresence mode="wait">
          {step === "role" && (
            <motion.div
              key="role"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
            >
              <div className="text-center mb-7">
                <div className="w-12 h-12 rounded-2xl bg-[#2563EB] flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-[#0F172A] mb-1">{t("auth.create_account")}</h1>
                <p className="text-gray-500 text-sm">{t("auth.signup_subtitle")}</p>
              </div>

              <p className={`text-sm font-semibold text-gray-700 mb-4 ${dir === "rtl" ? "text-right" : ""}`}>
                {t("auth.choose_role")}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-7">
                {roles.map(({ id, icon: Icon, color, bg, border }) => {
                  const isSelected = selectedRole === id;
                  const key = roleTranslationKey[id];
                  return (
                    <motion.button
                      key={id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedRole(id)}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? `${border} ${bg} shadow-md`
                          : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                      } ${dir === "rtl" ? "text-right" : ""}`}
                    >
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className={`w-10 h-10 rounded-xl ${isSelected ? bg : "bg-gray-100"} flex items-center justify-center mb-3 transition-colors`}>
                        <Icon className={`w-5 h-5 ${isSelected ? color : "text-gray-500"} transition-colors`} />
                      </div>
                      <p className={`font-semibold text-sm ${isSelected ? "text-[#0F172A]" : "text-gray-700"} mb-0.5`}>
                        {t(`auth.role_${key === "pharma" ? "pharma" : id.replace("_company", "")}`)}
                      </p>
                      <p className={`text-xs leading-snug ${isSelected ? "text-gray-600" : "text-gray-400"}`}>
                        {t(`auth.role_${key === "pharma" ? "pharma" : id.replace("_company", "")}_desc`)}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileHover={selectedRole ? { scale: 1.01 } : {}}
                whileTap={selectedRole ? { scale: 0.99 } : {}}
                onClick={handleContinue}
                disabled={!selectedRole}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                  selectedRole
                    ? "bg-[#2563EB] text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                } ${dir === "rtl" ? "flex-row-reverse" : ""}`}
              >
                {t("auth.continue")}
                {dir === "rtl" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </motion.button>

              <p className={`text-center text-sm text-gray-500 mt-5 ${dir === "rtl" ? "text-right" : ""}`}>
                {t("auth.has_account")}{" "}
                <Link to="/login" className="text-[#2563EB] font-medium hover:underline">{t("auth.login_link")}</Link>
              </p>
            </motion.div>
          )}

          {step === "form" && selectedRole && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
            >
              <div className={`flex items-center gap-3 mb-6 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <button
                  onClick={() => setStep("role")}
                  className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-all"
                >
                  {dir === "rtl" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                </button>
                <div>
                  <h1 className={`text-xl font-bold text-[#0F172A] ${dir === "rtl" ? "text-right" : ""}`}>{t("auth.create_account")}</h1>
                  <div className={`flex items-center gap-1.5 mt-0.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    {(() => {
                      const roleInfo = roles.find((r) => r.id === selectedRole);
                      const Icon = roleInfo.icon;
                      const key = roleTranslationKey[selectedRole];
                      return (
                        <>
                          <Icon className={`w-3.5 h-3.5 ${roleInfo.color}`} />
                          <span className={`text-xs font-medium ${roleInfo.color}`}>
                            {t(`auth.role_${key === "pharma" ? "pharma" : selectedRole.replace("_company", "")}`)}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label={nameLabel()} name="name" icon={User} placeholder="John Doe" />
                <Field label={emailLabel()} name="email" type="email" icon={Mail} placeholder="you@example.com" />
                <Field label={t("auth.phone")} name="phone" icon={Phone} placeholder="+1 234 567 8900" />

                {selectedRole === "pharmacy" && (
                  <>
                    <Field label={t("auth.verification_number")} name="verificationNumber" icon={Building2} placeholder="PHM-2025-XXXXX" />
                    <FileField label={t("auth.license_upload")} fieldKey="license" hint={t("auth.license_upload_hint")} />
                    <Field label={t("auth.location")} name="location" icon={MapPin} placeholder="123 Main St, City" />
                  </>
                )}

                {selectedRole === "warehouse" && (
                  <>
                    <FileField label={t("auth.reg_docs")} fieldKey="regDocs" hint={t("auth.reg_docs_hint")} />
                    <Field label={t("auth.location")} name="location" icon={MapPin} placeholder="Warehouse Zone A, City" />
                  </>
                )}

                {selectedRole === "pharma_company" && (
                  <>
                    <FileField label={t("auth.company_docs")} fieldKey="companyDocs" hint={t("auth.company_docs_hint")} />
                    <Field label={t("auth.location")} name="location" icon={MapPin} placeholder="HQ Address, City" />
                  </>
                )}

                {selectedRole === "patient" && (
                  <Field label={t("auth.location")} name="location" icon={MapPin} placeholder="City, Country" />
                )}

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${dir === "rtl" ? "text-right" : ""}`}>{t("auth.password")}</label>
                  <div className="relative">
                    <Lock className={`absolute top-3.5 w-4 h-4 text-gray-400 ${dir === "rtl" ? "right-3.5" : "left-3.5"}`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={set("password")}
                      className={`w-full ${dir === "rtl" ? "pr-10 pl-10" : "pl-10 pr-10"} py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all`}
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-3.5 ${dir === "rtl" ? "left-3.5" : "right-3.5"} text-gray-400 hover:text-gray-600`}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${dir === "rtl" ? "text-right" : ""}`}>{t("auth.confirm_password")}</label>
                  <div className="relative">
                    <Lock className={`absolute top-3.5 w-4 h-4 text-gray-400 ${dir === "rtl" ? "right-3.5" : "left-3.5"}`} />
                    <input
                      type="password"
                      value={form.confirm}
                      onChange={set("confirm")}
                      className={`w-full ${dir === "rtl" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all`}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className={`flex items-start gap-2.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#2563EB]" />
                  <label htmlFor="agree" className={`text-xs text-gray-600 leading-relaxed ${dir === "rtl" ? "text-right" : ""}`}>
                    {t("auth.agree")}{" "}
                    <Link to="#" className="text-[#2563EB] hover:underline">{t("auth.terms")}</Link>{" "}
                    {t("auth.and")}{" "}
                    <Link to="#" className="text-[#2563EB] hover:underline">{t("auth.privacy")}</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#2563EB] text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all disabled:opacity-70 shadow-lg shadow-blue-200 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : t("auth.signup_btn")}
                </button>
              </form>

              <p className={`text-center text-sm text-gray-500 mt-5 ${dir === "rtl" ? "text-right" : ""}`}>
                {t("auth.has_account")}{" "}
                <Link to="/login" className="text-[#2563EB] font-medium hover:underline">{t("auth.login_link")}</Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AuthLayout>
  );
}

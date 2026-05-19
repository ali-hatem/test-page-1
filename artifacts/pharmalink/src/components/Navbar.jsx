import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import {
  Menu, X, Pill, Bell, Search, LayoutDashboard, ShoppingBag,
  Settings, Globe, LogIn, UserPlus, Home,
} from "lucide-react";

const navLinks = [
  { key: "home", href: "/", icon: Home },
  { key: "search", href: "/search", icon: Search },
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "orders", href: "/orders", icon: ShoppingBag },
  { key: "notifications", href: "/notifications", icon: Bell },
  { key: "settings", href: "/settings", icon: Settings },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { language, toggleLanguage, dir } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-md">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-[#0F172A]">PharmaLink</span>
          </Link>

          <div className={`hidden lg:flex items-center gap-1 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            {navLinks.map(({ key, href, icon: Icon }) => (
              <Link
                key={key}
                to={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(href)
                    ? "text-[#2563EB] bg-blue-50"
                    : "text-gray-600 hover:text-[#2563EB] hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t(`nav.${key}`)}
              </Link>
            ))}
          </div>

          <div className={`hidden lg:flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[#2563EB] hover:bg-gray-50 transition-all"
            >
              <Globe className="w-4 h-4" />
              {language === "en" ? "العربية" : "English"}
            </button>
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[#2563EB] hover:bg-gray-50 transition-all border border-gray-200"
            >
              <LogIn className="w-4 h-4" />
              {t("nav.login")}
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#2563EB] hover:bg-blue-700 transition-all shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              {t("nav.signup")}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ key, href, icon: Icon }) => (
                <Link
                  key={key}
                  to={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(href)
                      ? "text-[#2563EB] bg-blue-50"
                      : "text-gray-600 hover:text-[#2563EB] hover:bg-gray-50"
                  } ${dir === "rtl" ? "flex-row-reverse text-right" : ""}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {t(`nav.${key}`)}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 space-y-1">
                <button
                  onClick={() => { toggleLanguage(); setMobileOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-[#2563EB] hover:bg-gray-50 transition-all ${dir === "rtl" ? "flex-row-reverse text-right" : ""}`}
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  {language === "en" ? "العربية" : "English"}
                </button>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-[#2563EB] hover:bg-gray-50 transition-all ${dir === "rtl" ? "flex-row-reverse text-right" : ""}`}
                >
                  <LogIn className="w-4 h-4 shrink-0" />
                  {t("nav.login")}
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-[#2563EB] hover:bg-blue-700 transition-all ${dir === "rtl" ? "flex-row-reverse justify-end text-right" : ""}`}
                >
                  <UserPlus className="w-4 h-4 shrink-0" />
                  {t("nav.signup")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

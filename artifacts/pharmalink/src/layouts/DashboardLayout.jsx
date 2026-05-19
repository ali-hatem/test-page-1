import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import {
  Pill, Home, Search, LayoutDashboard, ShoppingBag, Bell, Settings,
  ChevronLeft, ChevronRight, Globe, LogOut, Menu,
  Package, AlertTriangle, Truck, BarChart3, FlaskConical,
  Warehouse, Building2, ClipboardList, TrendingUp, User,
} from "lucide-react";

const patientLinks = [
  { key: "home", href: "/", icon: Home },
  { key: "search", href: "/search", icon: Search },
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "orders", href: "/orders", icon: ShoppingBag },
  { key: "notifications", href: "/notifications", icon: Bell },
  { key: "settings", href: "/settings", icon: Settings },
];

const pharmacyLinks = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "inventory", href: "/pharmacy/inventory", icon: Package },
  { key: "incoming_orders", href: "/pharmacy/orders", icon: ClipboardList },
  { key: "low_stock", href: "/pharmacy/low-stock", icon: AlertTriangle },
  { key: "notifications", href: "/notifications", icon: Bell },
  { key: "settings", href: "/settings", icon: Settings },
];

const warehouseLinks = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "stock", href: "/warehouse/stock", icon: Package },
  { key: "distribution", href: "/warehouse/distribution", icon: Truck },
  { key: "delivery_requests", href: "/warehouse/deliveries", icon: ClipboardList },
  { key: "analytics", href: "/warehouse/analytics", icon: BarChart3 },
  { key: "settings", href: "/settings", icon: Settings },
];

const pharmaLinks = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "production", href: "/pharma/production", icon: FlaskConical },
  { key: "distribution", href: "/pharma/distribution", icon: Truck },
  { key: "warehouse_supply", href: "/pharma/supply", icon: Warehouse },
  { key: "analytics", href: "/pharma/analytics", icon: TrendingUp },
  { key: "settings", href: "/settings", icon: Settings },
];

const roleLinks = {
  patient: patientLinks,
  pharmacy: pharmacyLinks,
  warehouse: warehouseLinks,
  pharma_company: pharmaLinks,
};

const roleAccents = {
  patient: "bg-[#2563EB]",
  pharmacy: "bg-[#14B8A6]",
  warehouse: "bg-[#F59E0B]",
  pharma_company: "bg-[#22C55E]",
};

const roleTextAccents = {
  patient: "text-[#2563EB] bg-blue-50",
  pharmacy: "text-[#14B8A6] bg-teal-50",
  warehouse: "text-[#F59E0B] bg-amber-50",
  pharma_company: "text-[#22C55E] bg-green-50",
};

const roleIcons = {
  patient: User,
  pharmacy: Building2,
  warehouse: Warehouse,
  pharma_company: FlaskConical,
};

export default function DashboardLayout({ children }) {
  const { t } = useTranslation();
  const { dir, language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = user?.role || "patient";
  const links = roleLinks[role] || patientLinks;
  const accentBg = roleAccents[role] || roleAccents.patient;
  const accentText = roleTextAccents[role] || roleTextAccents.patient;
  const RoleIcon = roleIcons[role] || User;

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const isRtl = dir === "rtl";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  function SidebarContent({ isMobile = false }) {
    return (
      <div className="flex flex-col h-full">
        <div className={`flex items-center gap-2.5 px-4 py-4 border-b border-gray-100 ${collapsed && !isMobile ? "justify-center" : ""}`}>
          <div className={`w-9 h-9 rounded-xl ${accentBg} flex items-center justify-center shrink-0`}>
            <Pill className="w-5 h-5 text-white" />
          </div>
          {(!collapsed || isMobile) && (
            <span className="text-lg font-bold text-[#0F172A]">PharmaLink</span>
          )}
        </div>

        {(!collapsed || isMobile) && (
          <div className="px-4 pt-3 pb-1">
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${accentText} w-fit ${isRtl ? "flex-row-reverse" : ""}`}>
              <RoleIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold capitalize">
                {role.replace("_", " ")}
              </span>
            </div>
          </div>
        )}

        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {links.map(({ key, href, icon: Icon }) => (
            <Link
              key={key}
              to={href}
              onClick={() => isMobile && setMobileOpen(false)}
              title={collapsed && !isMobile ? t(`nav.${key}`) : undefined}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive(href)
                  ? `${accentText} shadow-sm`
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              } ${collapsed && !isMobile ? "justify-center" : ""} ${isRtl && !collapsed ? "flex-row-reverse" : ""}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {(!collapsed || isMobile) && <span>{t(`nav.${key}`)}</span>}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-4 space-y-1 border-t border-gray-100 pt-3">
          <button
            onClick={toggleLanguage}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all ${collapsed && !isMobile ? "justify-center" : ""} ${isRtl && !collapsed ? "flex-row-reverse" : ""}`}
          >
            <Globe className="w-4 h-4 shrink-0" />
            {(!collapsed || isMobile) && <span>{language === "en" ? "العربية" : "English"}</span>}
          </button>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all ${collapsed && !isMobile ? "justify-center" : ""} ${isRtl && !collapsed ? "flex-row-reverse" : ""}`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(!collapsed || isMobile) && <span>Sign Out</span>}
          </button>

          <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl ${collapsed && !isMobile ? "justify-center" : ""} ${isRtl && !collapsed ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full ${accentBg} flex items-center justify-center shrink-0 text-white font-bold text-sm`}>
              {user?.avatarInitial || "U"}
            </div>
            {(!collapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir={dir} className="min-h-screen bg-gray-50 flex">
      <aside
        className={`hidden lg:flex flex-col shrink-0 bg-white border-${isRtl ? "l" : "r"} border-gray-100 transition-all duration-200 ${
          collapsed ? "w-16" : "w-60"
        } sticky top-0 h-screen`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute top-[72px] ${isRtl ? "-left-3" : "-right-3"} w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-all`}
        >
          {isRtl
            ? (collapsed ? <ChevronLeft className="w-3 h-3 text-gray-500" /> : <ChevronRight className="w-3 h-3 text-gray-500" />)
            : (collapsed ? <ChevronRight className="w-3 h-3 text-gray-500" /> : <ChevronLeft className="w-3 h-3 text-gray-500" />)}
        </button>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: isRtl ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? "100%" : "-100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className={`fixed top-0 ${isRtl ? "right-0" : "left-0"} bottom-0 w-64 bg-white z-50 lg:hidden shadow-xl`}
            >
              <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-gray-50">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-[#2563EB]" />
            <span className="font-bold text-[#0F172A]">PharmaLink</span>
          </div>
          <div className="w-9" />
        </header>
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

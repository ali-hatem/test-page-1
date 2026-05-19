import { Link } from "react-router-dom";
import { Pill } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function AuthLayout({ children }) {
  const { dir, language, toggleLanguage } = useLanguage();
  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center">
            <Pill className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-[#0F172A]">PharmaLink</span>
        </Link>
        <button
          onClick={toggleLanguage}
          className="text-sm font-medium text-gray-600 hover:text-[#2563EB] transition-colors px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-300"
        >
          {language === "en" ? "العربية" : "English"}
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
}

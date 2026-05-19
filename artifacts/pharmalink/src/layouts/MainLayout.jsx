import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

export default function MainLayout({ children }) {
  const { dir } = useLanguage();
  return (
    <div dir={dir} className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main>{children}</main>
      <footer className="bg-[#0F172A] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="font-bold text-lg">PharmaLink</span>
            </div>
            <p className="text-gray-400 text-sm">© 2025 PharmaLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

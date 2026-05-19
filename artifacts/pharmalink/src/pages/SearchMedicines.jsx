import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { CardSkeleton } from "../components/Skeleton";
import { Badge } from "../components/Badge";
import { Search, ShoppingCart, Pill, SlidersHorizontal, X } from "lucide-react";

const medicines = [
  { id: 1, name: "Amoxicillin 500mg", brand: "Amoxil", category: "antibiotics", price: 12.5, inStock: true, prescription: true, description: "Broad-spectrum antibiotic used to treat bacterial infections." },
  { id: 2, name: "Metformin 1000mg", brand: "Glucophage", category: "diabetes", price: 8.9, inStock: true, prescription: true, description: "Oral medication for type 2 diabetes management." },
  { id: 3, name: "Vitamin D3 5000IU", brand: "Nature Made", category: "vitamins", price: 14.99, inStock: true, prescription: false, description: "High potency vitamin D supplement for bone health." },
  { id: 4, name: "Ibuprofen 400mg", brand: "Advil", category: "pain", price: 6.5, inStock: true, prescription: false, description: "Non-steroidal anti-inflammatory for pain and fever." },
  { id: 5, name: "Lisinopril 10mg", brand: "Prinivil", category: "heart", price: 9.75, inStock: false, prescription: true, description: "ACE inhibitor for high blood pressure and heart failure." },
  { id: 6, name: "Cetirizine 10mg", brand: "Zyrtec", category: "allergy", price: 11.2, inStock: true, prescription: false, description: "Antihistamine for allergy relief and hay fever." },
  { id: 7, name: "Omega-3 Fish Oil 1000mg", brand: "Nordic Naturals", category: "vitamins", price: 22.99, inStock: true, prescription: false, description: "Essential fatty acids for heart and brain health." },
  { id: 8, name: "Atorvastatin 20mg", brand: "Lipitor", category: "heart", price: 15.6, inStock: true, prescription: true, description: "Statin medication to lower cholesterol levels." },
  { id: 9, name: "Paracetamol 500mg", brand: "Tylenol", category: "pain", price: 4.99, inStock: true, prescription: false, description: "Common pain reliever and fever reducer." },
  { id: 10, name: "Omeprazole 20mg", brand: "Prilosec", category: "chronic", price: 13.8, inStock: false, prescription: false, description: "Proton pump inhibitor for acid reflux and GERD." },
  { id: 11, name: "Montelukast 10mg", brand: "Singulair", category: "allergy", price: 18.5, inStock: true, prescription: true, description: "Leukotriene receptor antagonist for asthma and allergies." },
  { id: 12, name: "Insulin Glargine 100U/mL", brand: "Lantus", category: "diabetes", price: 89.99, inStock: true, prescription: true, description: "Long-acting insulin for type 1 and type 2 diabetes." },
];

const categoryColors = {
  antibiotics: "info", diabetes: "warning", vitamins: "success",
  pain: "error", heart: "teal", allergy: "info", chronic: "gray",
};

export default function SearchMedicines() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showInStock, setShowInStock] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = medicines.filter((m) => {
    const matchQuery = m.name.toLowerCase().includes(query.toLowerCase()) || m.brand.toLowerCase().includes(query.toLowerCase());
    const matchCat = selectedCategory === "all" || m.category === selectedCategory;
    const matchStock = !showInStock || m.inStock;
    return matchQuery && matchCat && matchStock;
  });

  const categories = ["all", "antibiotics", "vitamins", "pain", "chronic", "allergy", "heart", "diabetes"];

  const addToCart = (id) => setCart((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className={`text-2xl font-bold text-[#0F172A] ${dir === "rtl" ? "text-right" : ""}`}>{t("search.title")}</h1>
          <p className={`text-gray-500 text-sm mt-1 ${dir === "rtl" ? "text-right" : ""}`}>{t("search.subtitle")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className={`absolute top-3.5 w-5 h-5 text-gray-400 ${dir === "rtl" ? "right-4" : "left-4"}`} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                className={`w-full ${dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all bg-white shadow-sm`}
                dir={dir}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-[#2563EB] transition-all shadow-sm ${dir === "rtl" ? "flex-row-reverse" : ""}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t("search.filters")}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3"
              >
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className={`flex items-center justify-between mb-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <p className="text-sm font-medium text-gray-700">{t("search.availability")}</p>
                    <button onClick={() => { setSelectedCategory("all"); setShowInStock(false); }} className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
                      <X className="w-3 h-3" /> Reset
                    </button>
                  </div>
                  <label className={`flex items-center gap-2 cursor-pointer ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <input type="checkbox" checked={showInStock} onChange={(e) => setShowInStock(e.target.checked)} className="rounded border-gray-300 text-[#2563EB]" />
                    <span className="text-sm text-gray-600">{t("search.in_stock")} only</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex gap-2 overflow-x-auto pb-1"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-[#2563EB]"
              }`}
            >
              {t(`search.categories.${cat}`)}
            </button>
          ))}
        </motion.div>

        <p className={`text-sm text-gray-500 ${dir === "rtl" ? "text-right" : ""}`}>
          {loading ? "..." : `${filtered.length} ${t("search.results")}`}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <CardSkeleton key={i} />)
            : filtered.length === 0
              ? (
                <div className="col-span-full py-16 text-center">
                  <Pill className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">{t("search.no_results")}</p>
                  <p className="text-gray-400 text-sm mt-1">{t("search.no_results_sub")}</p>
                </div>
              )
              : filtered.map((med, i) => (
                <motion.div
                  key={med.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col"
                >
                  <div className={`flex items-start justify-between mb-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Pill className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div className={`flex flex-col gap-1 ${dir === "rtl" ? "items-start" : "items-end"}`}>
                      <Badge variant={med.inStock ? "success" : "error"}>
                        {med.inStock ? t("search.in_stock") : t("search.out_of_stock")}
                      </Badge>
                      <Badge variant={categoryColors[med.category] || "gray"}>
                        {t(`search.categories.${med.category}`)}
                      </Badge>
                    </div>
                  </div>
                  <div className={dir === "rtl" ? "text-right" : ""}>
                    <h3 className="font-semibold text-[#0F172A] text-sm leading-tight mb-0.5">{med.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{med.brand}</p>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">{med.description}</p>
                    {med.prescription && (
                      <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-2 py-1 mb-3 inline-block">
                        ℞ {t("search.requires_prescription")}
                      </p>
                    )}
                  </div>
                  <div className={`mt-auto flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <span className="text-base font-bold text-[#2563EB]">${med.price.toFixed(2)}</span>
                    <div className={`flex gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                      <Link to={`/medicine/${med.id}`} className="text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-blue-300 hover:text-[#2563EB] transition-all">
                        {t("search.view_details")}
                      </Link>
                      <button
                        onClick={() => addToCart(med.id)}
                        disabled={!med.inStock}
                        className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                          cart.includes(med.id)
                            ? "bg-green-500 text-white"
                            : med.inStock
                              ? "bg-[#2563EB] text-white hover:bg-blue-700"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3" />
                        {cart.includes(med.id) ? "✓" : t("search.add_cart")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

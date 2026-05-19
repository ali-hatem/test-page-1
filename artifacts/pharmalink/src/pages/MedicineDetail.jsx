import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { Badge } from "../components/Badge";
import { Pill, ShoppingCart, Bookmark, Share2, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react";

const medicines = {
  "1": { name: "Amoxicillin 500mg", brand: "Amoxil", category: "Antibiotics", manufacturer: "GlaxoSmithKline", genericName: "Amoxicillin Trihydrate", form: "Capsules", strength: "500mg", price: 12.5, inStock: true, prescription: true,
    overview: "Amoxicillin is a penicillin-type antibiotic used to treat bacterial infections such as pneumonia, bronchitis, and infections of the ear, nose, throat, skin, and urinary tract.",
    dosage: "Adults: 250-500mg every 8 hours or 500-875mg every 12 hours. Children: Dosage based on weight, typically 20-40mg/kg/day divided into doses. Always follow your doctor's prescription.",
    sideEffects: ["Nausea and vomiting", "Diarrhea", "Skin rash", "Allergic reactions (rare)", "Headache", "Vaginal itching or discharge"],
    interactions: ["Methotrexate — increases toxicity", "Warfarin — may increase bleeding risk", "Oral contraceptives — may reduce effectiveness"],
    pharmacies: [{ name: "City Pharmacy", distance: "0.3 km", price: 12.50, inStock: true }, { name: "MedPlus", distance: "1.2 km", price: 13.90, inStock: true }, { name: "HealthHub", distance: "2.1 km", price: 11.80, inStock: false }],
  },
};

export default function MedicineDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [saved, setSaved] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const med = medicines[id || "1"] || medicines["1"];

  const tabs = [
    { key: "overview", label: t("medicine.overview") },
    { key: "dosage", label: t("medicine.dosage") },
    { key: "sideEffects", label: t("medicine.side_effects") },
    { key: "interactions", label: t("medicine.interactions") },
    { key: "availability", label: t("medicine.availability") },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        <div className={`flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <Link to="/search" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2563EB] transition-colors">
            {dir === "rtl" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {t("search.title")}
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <div className={`flex flex-col sm:flex-row gap-5 ${dir === "rtl" ? "sm:flex-row-reverse" : ""}`}>
            <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <Pill className="w-10 h-10 text-[#2563EB]" />
            </div>
            <div className={`flex-1 ${dir === "rtl" ? "text-right" : ""}`}>
              <div className={`flex items-start gap-2 flex-wrap mb-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <h1 className="text-2xl font-bold text-[#0F172A]">{med.name}</h1>
                {med.prescription && (
                  <span className="bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200 mt-1">
                    ℞ {t("medicine.prescription_required")}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-3">{med.brand} · {med.manufacturer}</p>
              <div className={`flex flex-wrap gap-2 mb-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <Badge variant="info">{med.category}</Badge>
                <Badge variant={med.inStock ? "success" : "error"}>
                  {med.inStock ? t("search.in_stock") : t("search.out_of_stock")}
                </Badge>
              </div>
              <div className={`flex items-center gap-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <span className="text-3xl font-extrabold text-[#2563EB]">${med.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className={`flex gap-3 mt-5 flex-wrap ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <button
              onClick={() => setAddedToCart(!addedToCart)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                addedToCart ? "bg-green-500 text-white" : "bg-[#2563EB] text-white hover:bg-blue-700"
              } ${dir === "rtl" ? "flex-row-reverse" : ""}`}
            >
              {addedToCart ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              {addedToCart ? "Added!" : t("medicine.add_cart")}
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                saved ? "border-[#2563EB] text-[#2563EB] bg-blue-50" : "border-gray-200 text-gray-600 hover:border-blue-200"
              } ${dir === "rtl" ? "flex-row-reverse" : ""}`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              {t("medicine.save")}
            </button>
            <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:border-blue-200 transition-all ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <Share2 className="w-4 h-4" />
              {t("medicine.share")}
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="flex overflow-x-auto border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.key
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={`p-6 ${dir === "rtl" ? "text-right" : ""}`}>
            {activeTab === "overview" && (
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{med.overview}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[
                    { label: t("medicine.generic_name"), value: med.genericName },
                    { label: t("medicine.form"), value: med.form },
                    { label: t("medicine.strength"), value: med.strength },
                    { label: t("medicine.manufacturer"), value: med.manufacturer },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-[#0F172A]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "dosage" && (
              <div className="space-y-4">
                <div className={`flex items-start gap-3 bg-blue-50 rounded-xl p-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <AlertCircle className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 leading-relaxed">{med.dosage}</p>
                </div>
              </div>
            )}
            {activeTab === "sideEffects" && (
              <ul className="space-y-2">
                {med.sideEffects.map((effect) => (
                  <li key={effect} className={`flex items-center gap-2.5 text-sm text-gray-700 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {effect}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "interactions" && (
              <div className="space-y-3">
                {med.interactions.map((item) => (
                  <div key={item} className={`flex items-start gap-2.5 bg-red-50 rounded-xl p-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{item}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "availability" && (
              <div className="space-y-3">
                {med.pharmacies.map((pharmacy) => (
                  <div key={pharmacy.name} className={`flex items-center justify-between bg-gray-50 rounded-xl p-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className={dir === "rtl" ? "text-right" : ""}>
                      <p className="font-medium text-[#0F172A] text-sm">{pharmacy.name}</p>
                      <p className="text-xs text-gray-500">{pharmacy.distance}</p>
                    </div>
                    <div className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                      <span className="font-semibold text-[#2563EB]">${pharmacy.price.toFixed(2)}</span>
                      <Badge variant={pharmacy.inStock ? "success" : "error"}>
                        {pharmacy.inStock ? t("search.in_stock") : t("search.out_of_stock")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

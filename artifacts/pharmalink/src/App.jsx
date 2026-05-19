import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./i18n";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import WarehouseDashboard from "./pages/WarehouseDashboard";
import PharmaDashboard from "./pages/PharmaDashboard";
import SearchMedicines from "./pages/SearchMedicines";
import MedicineDetail from "./pages/MedicineDetail";
import Orders from "./pages/Orders";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Tracking from "./pages/Tracking";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        <p className="text-sm text-gray-500 font-medium">Loading PharmaLink...</p>
      </div>
    </div>
  );
}

function RoleDashboard() {
  const { user } = useAuth();
  switch (user?.role) {
    case "pharmacy":      return <PharmacyDashboard />;
    case "warehouse":     return <WarehouseDashboard />;
    case "pharma_company": return <PharmaDashboard />;
    default:              return <Dashboard />;
  }
}

function AppRoutes() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <BrowserRouter basename={base}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<RoleDashboard />} />
          <Route path="/search" element={<SearchMedicines />} />
          <Route path="/medicine/:id" element={<MedicineDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tracking/:id" element={<Tracking />} />
          <Route path="/pharmacy/*" element={<PharmacyDashboard />} />
          <Route path="/warehouse/*" element={<WarehouseDashboard />} />
          <Route path="/pharma/*" element={<PharmaDashboard />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;

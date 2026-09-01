import { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRouteGuard from "./components/AdminRouteGuard";
import { seedIfNeeded } from "./lib/storage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import MyInfoPage from "./pages/MyInfoPage";
import SchoolInfoPage from "./pages/SchoolInfoPage";
import NoticesPage from "./pages/NoticesPage";
import GuidebookPage from "./pages/GuidebookPage";
import SchedulePage from "./pages/guidebook/SchedulePage";
import RulesPage from "./pages/guidebook/RulesPage";
import OverviewPage from "./pages/guidebook/OverviewPage";
import AgreementPage from "./pages/guidebook/AgreementPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    seedIfNeeded();
  }, []);

  if (showSplash) {
    return <SplashScreen onDone={() => setShowSplash(false)} />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/my-info" element={<ProtectedRoute><MyInfoPage /></ProtectedRoute>} />
        <Route path="/school-info" element={<ProtectedRoute><SchoolInfoPage /></ProtectedRoute>} />
        <Route path="/notices" element={<ProtectedRoute><NoticesPage /></ProtectedRoute>} />
        <Route path="/guidebook" element={<ProtectedRoute><GuidebookPage /></ProtectedRoute>} />
        <Route path="/guidebook/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
        <Route path="/guidebook/rules" element={<ProtectedRoute><RulesPage /></ProtectedRoute>} />
        <Route path="/guidebook/overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
        <Route path="/guidebook/agreement" element={<ProtectedRoute><AgreementPage /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRouteGuard><AdminDashboardPage /></AdminRouteGuard>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}

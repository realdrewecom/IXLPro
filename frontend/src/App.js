import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "sonner";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Reviews from "./components/Reviews";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Setup from "./components/Setup";
import Footer from "./components/Footer";

// Pages
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import FeaturesPage from "./pages/FeaturesPage";
import PurchasePage from "./pages/PurchasePage";
import ReviewsPage from "./pages/ReviewsPage";
import DownloadPage from "./pages/DownloadPage";
import TroubleshootingPage from "./pages/TroubleshootingPage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Landing Page Component
const LandingPage = () => {
  const [stats, setStats] = useState({
    users: 6360,
    questions_answered: 268976645,
    discord_members: 54492
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API}/stats`);
        setStats(response.data);
      } catch (e) {
        console.error("Failed to fetch stats:", e);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b]" data-testid="landing-page">
      <Navbar />
      <main>
        <Hero stats={stats} />
        <Reviews />
        <Pricing />
        <FAQ />
        <Setup />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster 
          position="top-right" 
          richColors 
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/troubleshooting" element={<TroubleshootingPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

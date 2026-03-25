import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CreditCard, Lock } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const studentPlans = [
  { id: "day_key", name: "Day", price: 2.50, description: "Perfect for quick access and trying us out with minimal cost." },
  { id: "week_key", name: "Week", price: 10.00, description: "Extend your access and save compared to Day Keys." },
  { id: "month_key", name: "Month", price: 25.00, description: "Best for regular users who want to enjoy uninterrupted access." },
  { id: "3_month_key", name: "3 Month", price: 50.00, description: "Great for long-term projects or consistent use over months." },
  { id: "year_key", name: "Year", price: 100.00, description: "Enjoy uninterrupted access and save more with an annual plan." },
];

const servicePlans = [
  { id: "service_key", name: "Service Key", price: 120.00, description: "Perfect for business needs or sharing access across users." },
];

const PurchasePage = () => {
  const [planType, setPlanType] = useState("student"); // student or service
  const [selectedPlan, setSelectedPlan] = useState(studentPlans[0]);
  const [loading, setLoading] = useState(false);

  const currentPlans = planType === "student" ? studentPlans : servicePlans;

  const handlePlanTypeChange = (type) => {
    setPlanType(type);
    setSelectedPlan(type === "student" ? studentPlans[0] : servicePlans[0]);
  };

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/checkout/create`, {
        plan_id: selectedPlan.id,
        origin_url: window.location.origin,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to create checkout session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b]" data-testid="purchase-page">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 
              className="text-3xl md:text-4xl font-bold text-gradient mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Purchase IXLPro
            </h1>
            <p className="text-zinc-400">
              Select your plan and duration for instant access.
            </p>
          </motion.div>

          {/* Purchase Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
          >
            {/* Plan Type Toggle */}
            <div className="flex rounded-lg overflow-hidden mb-6 bg-zinc-800">
              <button
                onClick={() => handlePlanTypeChange("student")}
                className={`flex-1 py-3 px-6 font-medium transition-all duration-200 ${
                  planType === "student"
                    ? "bg-blue-500 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                data-testid="plan-type-student"
              >
                Student
              </button>
              <button
                onClick={() => handlePlanTypeChange("service")}
                className={`flex-1 py-3 px-6 font-medium transition-all duration-200 ${
                  planType === "service"
                    ? "bg-blue-500 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                data-testid="plan-type-service"
              >
                Service
              </button>
            </div>

            {/* Price Display */}
            <div className="text-center mb-4">
              <span 
                className="text-4xl font-bold text-blue-400"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                ${selectedPlan.price.toFixed(2)}
              </span>
              <span className="text-zinc-400 ml-1">USD</span>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-700 my-4"></div>

            {/* Description */}
            <p className="text-zinc-400 text-center text-sm mb-6">
              {selectedPlan.description}
            </p>

            {/* Duration Selection */}
            {planType === "student" && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {currentPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedPlan.id === plan.id
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    }`}
                    data-testid={`duration-${plan.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>
            )}

            {/* Terms Notice */}
            <div className="bg-zinc-800/50 rounded-lg p-4 mb-6 text-sm text-zinc-400">
              By clicking <span className="text-white font-medium">Purchase IXLPro</span>, you are agreeing to the{" "}
              <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a>{" "}
              including the arbitration clause and you are acknowledging the{" "}
              <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
            </div>

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 btn-glow flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="purchase-button"
            >
              <CreditCard className="w-5 h-5" />
              <span>{loading ? "Processing..." : "Purchase IXLPro"}</span>
            </button>
          </motion.div>

          {/* Secure Payment Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center space-x-2 mt-6 text-zinc-500 text-sm"
          >
            <Lock className="w-4 h-4" />
            <span>Secure payment powered by Stripe.</span>
          </motion.div>

          {/* Compatibility Notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-zinc-500 text-sm mt-8"
          >
            IXLPro works only with <span className="text-blue-400 font-medium">IXL</span> courses and is not compatible with other courseware.
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PurchasePage;

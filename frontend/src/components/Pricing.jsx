import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const pricingPlans = [
  {
    id: "day_key",
    name: "Day Key",
    price: 2.50,
    badge: "Most Affordable",
    badgeClass: "bg-blue-500",
    description: "Perfect for quick access and trying us out with minimal cost.",
  },
  {
    id: "week_key",
    name: "Week Key",
    price: 10.00,
    badge: "Trial Pack",
    badgeClass: "bg-cyan-500",
    description: "Extend your access and save compared to Day Keys.",
  },
  {
    id: "month_key",
    name: "Month Key",
    price: 25.00,
    badge: "Most Popular",
    badgeClass: "bg-green-500",
    popular: true,
    description: "Best for regular users who want to enjoy uninterrupted access.",
  },
  {
    id: "3_month_key",
    name: "3 Month Key",
    price: 50.00,
    badge: "Semester Pack",
    badgeClass: "bg-purple-500",
    description: "Great for long-term projects or consistent use over months.",
  },
  {
    id: "year_key",
    name: "Year Key",
    price: 100.00,
    badge: "Best Value",
    badgeClass: "bg-orange-500",
    description: "Enjoy uninterrupted access and save more with an annual plan.",
  },
  {
    id: "service_key",
    name: "Service Key",
    price: 120.00,
    badge: "Bulk Savings",
    badgeClass: "bg-pink-500",
    description: "Perfect for business needs or sharing access across users.",
  },
];

const PricingCard = ({ plan, index }) => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/checkout/create`, {
        plan_id: plan.id,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`pricing-card rounded-xl p-6 bg-zinc-900/50 ${
        plan.popular ? "popular ring-1 ring-blue-500/30" : ""
      }`}
      data-testid={`pricing-card-${plan.id}`}
    >
      {/* Badge */}
      <div className="flex justify-end mb-4">
        <span 
          className={`${plan.badgeClass} text-white text-xs font-medium px-3 py-1 rounded-full`}
        >
          {plan.badge}
        </span>
      </div>

      {/* Plan Name */}
      <h3 
        className="text-2xl font-bold text-white mb-2"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        {plan.name}
      </h3>

      {/* Description */}
      <p className="text-zinc-400 text-sm mb-6 min-h-[48px]">
        {plan.description.split(" ").map((word, i) => {
          if (["minimal", "regular", "consistent", "business", "save"].includes(word.toLowerCase().replace(/[.,]/g, ''))) {
            return <span key={i} className="text-white font-medium">{word} </span>;
          }
          return word + " ";
        })}
      </p>

      {/* Price */}
      <div className="mb-6">
        <span className="text-3xl font-bold text-blue-400" style={{ fontFamily: 'Outfit, sans-serif' }}>
          ${plan.price.toFixed(2)}
        </span>
        <span className="text-zinc-500 text-sm ml-1">USD</span>
      </div>

      {/* Purchase Button */}
      <button
        onClick={handlePurchase}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
          plan.id === "service_key"
            ? "bg-zinc-700 hover:bg-zinc-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white btn-glow"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        data-testid={`purchase-button-${plan.id}`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : plan.id === "service_key" ? (
          "Learn More"
        ) : (
          "Purchase Now"
        )}
      </button>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section 
      id="pricing" 
      className="py-24 bg-zinc-950/50"
      data-testid="pricing-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">
            Pricing
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold mt-2"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Finish <span className="text-gradient">IXL</span> stress free.
          </h2>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

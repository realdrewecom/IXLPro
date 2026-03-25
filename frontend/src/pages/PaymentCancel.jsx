import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft } from "lucide-react";

const PaymentCancel = () => {
  return (
    <div 
      className="min-h-screen bg-[#09090b] flex items-center justify-center px-4"
      data-testid="payment-cancel-page"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          </motion.div>

          <h1 
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Payment Cancelled
          </h1>
          <p className="text-zinc-400 mb-6">
            Your payment was cancelled. No charges were made to your account.
          </p>

          <p className="text-zinc-500 text-sm mb-6">
            Changed your mind? You can always come back and purchase later.
            If you have any questions, feel free to reach out on Discord.
          </p>

          <div className="flex flex-col space-y-3">
            <Link
              to="/#pricing"
              className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
              data-testid="try-again-btn"
            >
              <span>Try Again</span>
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 text-zinc-400 hover:text-white text-sm transition-colors"
              data-testid="back-home-link"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;

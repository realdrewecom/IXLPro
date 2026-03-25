import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");
  const [licenseKey, setLicenseKey] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const pollPaymentStatus = async () => {
      if (!sessionId || attempts >= 10) {
        if (attempts >= 10) {
          setStatus("timeout");
        }
        return;
      }

      try {
        const response = await axios.get(`${API}/checkout/status/${sessionId}`);
        const data = response.data;

        if (data.payment_status === "paid") {
          setStatus("success");
          setLicenseKey(data.license_key);
          setExpiresAt(data.expires_at);
        } else if (data.status === "expired") {
          setStatus("expired");
        } else {
          // Continue polling
          setAttempts(prev => prev + 1);
          setTimeout(pollPaymentStatus, 2000);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setAttempts(prev => prev + 1);
        setTimeout(pollPaymentStatus, 2000);
      }
    };

    pollPaymentStatus();
  }, [sessionId, attempts]);

  const copyKey = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey);
      toast.success("License key copied to clipboard!");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div 
      className="min-h-screen bg-[#09090b] flex items-center justify-center px-4"
      data-testid="payment-success-page"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {status === "loading" && (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Processing Payment...
            </h1>
            <p className="text-zinc-400">Please wait while we confirm your payment.</p>
          </div>
        )}

        {status === "success" && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            </motion.div>

            <h1 
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Payment Successful!
            </h1>
            <p className="text-zinc-400 mb-6">
              Thank you for purchasing IXLPro. Your license key is ready.
            </p>

            {/* License Key */}
            <div className="bg-zinc-800 rounded-lg p-4 mb-6">
              <p className="text-xs text-zinc-500 mb-2">Your License Key</p>
              <div className="flex items-center justify-between">
                <code 
                  className="text-blue-400 font-mono text-lg"
                  data-testid="license-key-display"
                >
                  {licenseKey}
                </code>
                <button
                  onClick={copyKey}
                  className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                  data-testid="copy-key-btn"
                >
                  <Copy className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              {expiresAt && (
                <p className="text-xs text-zinc-500 mt-2">
                  Expires: {formatDate(expiresAt)}
                </p>
              )}
            </div>

            {/* Instructions */}
            <div className="text-left bg-zinc-800/50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-white mb-2">Next Steps:</h3>
              <ol className="text-sm text-zinc-400 space-y-2">
                <li>1. Install Tampermonkey in your browser</li>
                <li>2. Download and install the IXLPro script</li>
                <li>3. Enter your license key in the IXLPro menu</li>
                <li>4. Start using IXLPro on IXL!</li>
              </ol>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              <Link
                to="/#setup"
                className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                data-testid="go-to-setup-btn"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Go to Setup Guide</span>
              </Link>
              <Link
                to="/"
                className="text-zinc-400 hover:text-white text-sm transition-colors"
                data-testid="back-home-link"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {status === "timeout" && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
            <h1 
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Payment Status Unknown
            </h1>
            <p className="text-zinc-400 mb-6">
              We couldn't confirm your payment status. Please check your email for confirmation or contact support.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}

        {status === "expired" && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
            <h1 
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Session Expired
            </h1>
            <p className="text-zinc-400 mb-6">
              Your payment session has expired. Please try again.
            </p>
            <Link
              to="/#pricing"
              className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Download, ExternalLink } from "lucide-react";

const DownloadPage = () => {
  return (
    <div className="min-h-screen bg-[#09090b]" data-testid="download-page">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-3xl" style={{ fontFamily: 'Outfit, sans-serif' }}>I</span>
            </div>
          </motion.div>

          {/* Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <a
              href="/ixlpro.user.js"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 btn-glow"
              data-testid="download-button"
            >
              <Download className="w-5 h-5" />
              <span>DOWNLOAD IXLPRO</span>
            </a>
          </motion.div>

          {/* Setup Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 
              className="text-2xl font-bold text-white text-center mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              How to Setup IXLPro
            </h2>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Install Tampermonkey:</h3>
                <p className="text-zinc-400 text-sm">
                  Begin by adding the{" "}
                  <a 
                    href="https://www.tampermonkey.net/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Tampermonkey extension
                  </a>{" "}
                  to your browser. This is required for running user scripts like IXLPro.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Enable Developer Mode:</h3>
                <p className="text-zinc-400 text-sm mb-2">
                  Make sure that <span className="text-white font-medium">Developer Mode</span> is enabled in your browser's extensions settings, as Tampermonkey may not function correctly without it.
                </p>
                <p className="text-zinc-400 text-sm">To enable developer mode in <span className="text-white font-medium">Chrome:</span></p>
                <ol className="text-zinc-400 text-sm mt-2 ml-4 space-y-1">
                  <li>1. Open Chrome.</li>
                  <li>2. Go to <code className="bg-zinc-800 px-1 rounded">chrome://extensions</code></li>
                  <li>3. Toggle the 'Developer mode' switch in the top-right corner.</li>
                </ol>
              </div>

              {/* Step 3 */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Access the Tampermonkey Dashboard:</h3>
                <p className="text-zinc-400 text-sm">
                  Once installed, click the Tampermonkey icon in the top-right corner of your browser, and select <span className="text-white font-medium">Dashboard</span> from the dropdown menu.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Add the IXLPro Script:</h3>
                <p className="text-zinc-400 text-sm">
                  In the Tampermonkey Dashboard, navigate to the <span className="text-blue-400">Utilities</span> tab at the top. Under <span className="text-white font-medium">Import from File</span>, select the <code className="bg-zinc-800 px-1 rounded">ixlpro.user.js</code> file that you've downloaded. This will install the IXLPro script into Tampermonkey.
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Activate IXLPro:</h3>
                <p className="text-zinc-400 text-sm">
                  After installing the script, go to{" "}
                  <a 
                    href="https://www.ixl.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    IXL
                  </a>
                  , log into your account, and enter the IXLPro key you received in your email. Refresh the page if needed.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Redeem Key Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 
              className="text-2xl font-bold text-white text-center mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              How to Redeem IXLPro Key
            </h2>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Open User Menu:</h3>
                <p className="text-zinc-400 text-sm">
                  Click the <span className="text-white font-medium">👤</span> icon in the IXLPro menu to access the user options.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Enter Your Key:</h3>
                <p className="text-zinc-400 text-sm">
                  Copy the key from your email and paste it into the "Enter your key" text box in the user menu.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Redeem Key:</h3>
                <p className="text-zinc-400 text-sm">
                  Click the{" "}
                  <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-medium">REDEEM</span>{" "}
                  button to activate your key and refresh the page for full access.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DownloadPage;

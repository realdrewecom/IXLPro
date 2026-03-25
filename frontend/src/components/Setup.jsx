import React, { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Play } from "lucide-react";

const SETUP_VIDEO_THUMBNAIL = "https://static.prod-images.emergentagent.com/jobs/5ad3d3b7-3d79-4fc4-91a4-b187c2dbc9f2/images/5cdce712ba1b7bd2b8c725729a3e28fa3330d0df531d95018101a9bdcfc6d2d4.png";

const Setup = () => {
  const [activeTab, setActiveTab] = useState("desktop");

  const desktopSteps = [
    "Install a userscript manager like Tampermonkey from the Chrome Web Store",
    "Click the download button below to get the IXLPro script",
    "Click 'Install' when Tampermonkey prompts you",
    "Navigate to IXL and look for the IXLPro menu",
    "Enter your license key and start using IXLPro!"
  ];

  const mobileSteps = [
    "Download a browser that supports userscripts (like Kiwi Browser for Android)",
    "Install Tampermonkey extension in that browser",
    "Download the IXLPro script from our website",
    "Open IXL in the browser and access the IXLPro menu",
    "Enter your license key to activate"
  ];

  const steps = activeTab === "desktop" ? desktopSteps : mobileSteps;

  return (
    <section 
      id="setup" 
      className="py-24 bg-zinc-950/50"
      data-testid="setup-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">
            Setup
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold mt-2"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Quick and <span className="text-gradient">easy</span> setup.
          </h2>
        </motion.div>

        {/* Video Thumbnail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-12 rounded-xl overflow-hidden"
        >
          <div className="video-overlay">
            <img
              src={SETUP_VIDEO_THUMBNAIL}
              alt="Setup Tutorial"
              className="w-full rounded-xl"
              data-testid="setup-video-thumbnail"
            />
          </div>
          <button 
            className="play-button"
            data-testid="play-video-btn"
          >
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-zinc-400 text-sm mb-4">
            Different devices require different setup instructions.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab("desktop")}
              className={`tab-button flex items-center space-x-2 ${
                activeTab === "desktop" ? "active" : ""
              }`}
              data-testid="tab-desktop"
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setActiveTab("mobile")}
              className={`tab-button flex items-center space-x-2 ${
                activeTab === "mobile" ? "active" : ""
              }`}
              data-testid="tab-mobile"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </button>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"
        >
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li 
                key={index}
                className="flex items-start space-x-4"
                data-testid={`setup-step-${index}`}
              >
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-zinc-300 pt-1">{step}</span>
              </li>
            ))}
          </ol>

          {/* Download Button */}
          <div className="mt-8 text-center">
            <a
              href="#download"
              className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 btn-glow"
              data-testid="download-script-btn"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download IXLPro Script</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Setup;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Zap, Clock, Brain, FileText, Shield, MessageSquare, Image, 
  Webhook, Sun, Settings, Home, User, Globe, ChevronDown, Palette,
  Moon, Type, Move, Circle, ChevronLeft
} from "lucide-react";
import IXLProLogo from "./IXLProLogo";

// Features with settings panels
const menuFeatures = [
  { 
    id: "auto-advance", 
    name: "Auto Advance", 
    icon: Zap, 
    enabled: true,
    hasSettings: true,
    settings: {
      "Auto Advance Mode": { type: "dropdown", value: "Next Activity", options: ["Next Activity", "Coursemap Mode"] },
      "Take Notes": { type: "dropdown", value: "DISABLED", options: ["DISABLED", "ENABLED"] }
    }
  },
  { 
    id: "auto-advance-delay", 
    name: "Auto Advance Delay", 
    icon: Clock, 
    enabled: false,
    hasSettings: true,
    settings: {
      "Advance Delay": { type: "range", min: 1, max: 300, minValue: 1, maxValue: 1, unit: "sec" }
    }
  },
  { 
    id: "auto-submit-delay", 
    name: "Auto Submit Delay", 
    icon: Clock, 
    enabled: false,
    hasSettings: true,
    settings: {
      "Quiz Delay (10-25 Questions)": { type: "range", min: 1, max: 60, minValue: 1, maxValue: 1, unit: "min" }
    }
  },
  { 
    id: "auto-answers", 
    name: "Auto Answers", 
    icon: Brain, 
    enabled: true,
    hasSettings: true,
    settings: {
      "Grade Range": { type: "range", min: 0, max: 100, minValue: 100, maxValue: 100, unit: "%" },
      "Auto Answers Mode": { type: "dropdown", value: "Default", options: ["Default", "Stealth"] },
      "Guess Unknown Questions": { type: "dropdown", value: "DISABLED", options: ["DISABLED", "ENABLED"] }
    }
  },
  { 
    id: "auto-assignment", 
    name: "Auto Assignment", 
    icon: FileText, 
    enabled: false,
    hasSettings: true,
    settings: {
      "Guess Unknown Questions": { type: "dropdown", value: "DISABLED", options: ["DISABLED", "ENABLED"] }
    }
  },
  { 
    id: "anti-logout", 
    name: "Anti Logout", 
    icon: Shield, 
    enabled: true,
    hasSettings: true,
    settings: {
      "Refresh Page on AFK": { type: "dropdown", value: "DISABLED", options: ["DISABLED", "ENABLED"] }
    }
  },
  { 
    id: "ai-answers", 
    name: "AI Answers", 
    icon: MessageSquare, 
    enabled: false,
    hasSettings: true,
    settings: {
      "AI Response Type": { type: "dropdown", value: "Default (AI)", options: ["Default (AI)", "Humanized"] },
      "\"Ask AI\" Button": { type: "dropdown", value: "DISABLED", options: ["DISABLED", "ENABLED"] }
    }
  },
  { 
    id: "custom-background", 
    name: "Custom Background", 
    icon: Image, 
    enabled: false,
    hasSettings: true,
    settings: {
      "Image Address (URL)": { type: "input", placeholder: "Image URL" }
    }
  },
  { 
    id: "discord-logging", 
    name: "Discord Logging", 
    icon: Webhook, 
    enabled: false,
    hasSettings: true,
    settings: {
      "Discord Webhook (URL)": { type: "input", placeholder: "Webhook URL" },
      "Discord User ID": { type: "input", placeholder: "Discord User ID" },
      "Mention User on Log": { type: "dropdown", value: "DISABLED", options: ["DISABLED", "ENABLED", "Only Important"] }
    }
  },
  { 
    id: "video-brightness", 
    name: "Video Brightness", 
    icon: Sun, 
    enabled: false,
    hasSettings: true,
    settings: {
      "Brightness (%)": { type: "input", placeholder: "99%" }
    }
  },
];

const SettingsPanel = ({ feature }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-zinc-800/80 rounded-lg mt-2 overflow-hidden"
    >
      <div className="p-3 space-y-3">
        {Object.entries(feature.settings).map(([label, config], index) => (
          <div key={index}>
            <label className="text-xs text-zinc-400 mb-1 block">{label}</label>
            {config.type === "dropdown" && (
              <div className="relative">
                <select 
                  className="w-full bg-zinc-700 text-white text-sm rounded px-3 py-2 appearance-none cursor-pointer"
                  defaultValue={config.value}
                >
                  {config.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            )}
            {config.type === "range" && (
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  defaultValue={`${config.minValue} ${config.unit}`}
                  className="w-20 bg-zinc-700 text-white text-sm rounded px-2 py-1 text-center"
                />
                <span className="text-zinc-500 text-sm">to</span>
                <input 
                  type="text" 
                  defaultValue={`${config.maxValue} ${config.unit}`}
                  className="w-20 bg-zinc-700 text-white text-sm rounded px-2 py-1 text-center"
                />
              </div>
            )}
            {config.type === "input" && (
              <input 
                type="text" 
                placeholder={config.placeholder}
                className="w-full bg-zinc-700 text-white text-sm rounded px-3 py-2 placeholder-zinc-500"
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Custom Toggle Switch component
const ToggleSwitch = ({ enabled, onToggle, disabled = false }) => (
  <button 
    onClick={onToggle}
    disabled={disabled}
    className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
      enabled ? 'bg-blue-500' : 'bg-zinc-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <motion.div
      animate={{ x: enabled ? 26 : 4 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
    />
  </button>
);

// Nope animation component
const NopeAnimation = ({ show, onComplete }) => {
  if (!show) return null;
  
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ 
        scale: [0.5, 1.2, 1],
        opacity: [0, 1, 1],
        x: [0, -10, 10, -10, 10, 0]
      }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={onComplete}
      className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 rounded-lg z-20"
    >
      <span className="text-red-400 font-bold text-lg">Nope!</span>
    </motion.div>
  );
};

const InteractiveMenu = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(-12);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [features, setFeatures] = useState(menuFeatures);
  const [expandedSettings, setExpandedSettings] = useState(null);
  const [currentView, setCurrentView] = useState("features"); // features, customization, profile
  const [menuDarkMode, setMenuDarkMode] = useState(true);
  const [menuOpacity, setMenuOpacity] = useState(100);
  const [seeThroughDrag, setSeeThroughDrag] = useState(true);
  const [showNope, setShowNope] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXVal = ((y - centerY) / centerY) * -8;
    const rotateYVal = ((x - centerX) / centerX) * 10 - 6;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(-12);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const toggleFeature = (featureId) => {
    setFeatures(features.map(f => 
      f.id === featureId ? { ...f, enabled: !f.enabled } : f
    ));
  };

  const toggleSettings = (featureId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSettings(expandedSettings === featureId ? null : featureId);
  };

  // Menu background based on dark mode
  const menuBgClass = menuDarkMode ? "bg-[#1a1a1d]" : "bg-[#f0f0f3]";
  const menuTextClass = menuDarkMode ? "text-white" : "text-zinc-900";
  const menuSubTextClass = menuDarkMode ? "text-zinc-400" : "text-zinc-600";
  const menuItemBgClass = menuDarkMode ? "bg-zinc-800/80" : "bg-zinc-200/80";
  const menuHeaderBgClass = menuDarkMode ? "bg-[#141416]" : "bg-[#e5e5e8]";

  return (
    <div 
      className="relative perspective-1000"
      style={{ perspective: "1000px" }}
      data-testid="interactive-menu"
    >
      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-blue-500 blur-3xl rounded-full transform scale-75"
      />

      {/* Menu Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative z-10 w-[340px] ${menuBgClass} rounded-xl border border-zinc-700/50 shadow-2xl overflow-hidden`}
        style={{ 
          transformStyle: "preserve-3d",
          opacity: menuOpacity / 100
        }}
      >
        {/* Menu Header */}
        <div className={`${menuHeaderBgClass} px-4 py-3 flex items-center justify-between border-b ${menuDarkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
          <div className="flex items-center space-x-2">
            <IXLProLogo size={28} />
            <span className={`font-semibold text-sm ${menuTextClass}`}>IXLPro</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentView("features")}
              className={`p-1 rounded transition-colors ${
                currentView === "features" ? "text-blue-400" : menuSubTextClass
              } hover:text-blue-400`}
            >
              <Home className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentView("customization")}
              className={`p-1 rounded transition-colors ${
                currentView === "customization" ? "text-blue-400" : menuSubTextClass
              } hover:text-blue-400`}
            >
              <Palette className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentView("profile")}
              className={`p-1 rounded transition-colors ${
                currentView === "profile" ? "text-blue-400" : menuSubTextClass
              } hover:text-blue-400`}
            >
              <User className="w-4 h-4" />
            </button>
            {currentView !== "features" && (
              <button 
                onClick={() => setCurrentView("features")}
                className={`p-1 rounded bg-zinc-600 ${menuSubTextClass} hover:text-white transition-colors ml-2`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Customization View */}
        <AnimatePresence mode="wait">
          {currentView === "customization" && (
            <motion.div
              key="customization"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4 space-y-4"
            >
              {/* Menu Dark Mode */}
              <div className={`flex items-center justify-between p-3 rounded-lg ${menuItemBgClass}`}>
                <div className="flex items-center space-x-3">
                  <Moon className={`w-5 h-5 ${menuSubTextClass}`} />
                  <span className={menuTextClass}>Menu Dark Mode</span>
                </div>
                <ToggleSwitch enabled={menuDarkMode} onToggle={() => setMenuDarkMode(!menuDarkMode)} />
              </div>

              {/* Website Dark Mode - shows nope */}
              <div className={`relative flex items-center justify-between p-3 rounded-lg ${menuItemBgClass}`}>
                <div className="flex items-center space-x-3">
                  <Moon className={`w-5 h-5 ${menuSubTextClass}`} />
                  <span className={menuTextClass}>Website Dark Mode</span>
                </div>
                <ToggleSwitch enabled={true} onToggle={() => setShowNope(true)} />
                <NopeAnimation show={showNope} onComplete={() => setShowNope(false)} />
              </div>

              {/* Select Theme */}
              <div className={`p-3 rounded-lg ${menuItemBgClass}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Palette className={`w-5 h-5 ${menuSubTextClass}`} />
                    <span className={menuTextClass}>Select Theme</span>
                  </div>
                  <div className="relative">
                    <select className="bg-transparent text-blue-400 text-sm appearance-none cursor-pointer pr-6">
                      <option>Default</option>
                      <option>Ocean</option>
                      <option>Sunset</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Select Font */}
              <div className={`p-3 rounded-lg ${menuItemBgClass}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Type className={`w-5 h-5 ${menuSubTextClass}`} />
                    <span className={menuTextClass}>Select Font</span>
                  </div>
                  <div className="relative">
                    <select className="bg-transparent text-blue-400 text-sm appearance-none cursor-pointer pr-6">
                      <option>Default</option>
                      <option>Roboto</option>
                      <option>Inter</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-zinc-400" />
                  </div>
                </div>
              </div>

              {/* Menu Opacity */}
              <div className={`p-3 rounded-lg ${menuItemBgClass}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Circle className={`w-5 h-5 ${menuSubTextClass}`} />
                    <span className={menuTextClass}>Menu Opacity</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={menuOpacity}
                    onChange={(e) => setMenuOpacity(Number(e.target.value))}
                    className="w-24 accent-blue-500"
                  />
                </div>
              </div>

              {/* See-Through Drag */}
              <div className={`flex items-center justify-between p-3 rounded-lg ${menuItemBgClass}`}>
                <div className="flex items-center space-x-3">
                  <Move className={`w-5 h-5 ${menuSubTextClass}`} />
                  <span className={menuTextClass}>See-Through Drag</span>
                </div>
                <ToggleSwitch enabled={seeThroughDrag} onToggle={() => setSeeThroughDrag(!seeThroughDrag)} />
              </div>

              {/* Coming Soon */}
              <p className={`text-center text-sm ${menuSubTextClass} pt-2`}>
                More Customization <span className="italic">Coming Soon....</span>
              </p>
            </motion.div>
          )}

          {/* Profile View */}
          {currentView === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 flex flex-col items-center justify-center min-h-[300px]"
            >
              <p className={`text-center ${menuTextClass} font-semibold text-lg mb-4`}>
                This is a demo.
              </p>
              <p className={`text-center ${menuSubTextClass} leading-relaxed`}>
                Download, Purchase, and setup IXLPro via Tampermonkey to use on IXL.
              </p>
            </motion.div>
          )}

          {/* Features View */}
          {currentView === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-2 max-h-[380px] overflow-y-auto custom-scrollbar"
            >
              {features.map((feature, index) => (
                <div key={feature.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onMouseEnter={() => setHoveredFeature(feature.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`rounded-lg transition-all duration-200 ${
                      hoveredFeature === feature.id || expandedSettings === feature.id
                        ? menuDarkMode ? "bg-zinc-800/80" : "bg-zinc-200/80"
                        : menuDarkMode ? "hover:bg-zinc-800/50" : "hover:bg-zinc-200/50"
                    }`}
                  >
                    <div 
                      className="flex items-center justify-between px-3 py-2.5 cursor-pointer"
                      onClick={() => toggleFeature(feature.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <feature.icon className={`w-4 h-4 ${feature.enabled ? 'text-blue-400' : menuSubTextClass}`} />
                        <span className={`text-sm ${feature.enabled ? menuTextClass : menuSubTextClass}`}>
                          {feature.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div 
                          className={`w-8 h-4 rounded-full transition-colors duration-200 relative ${
                            feature.enabled ? 'bg-blue-500' : 'bg-zinc-700'
                          }`}
                        >
                          <motion.div
                            animate={{ x: feature.enabled ? 16 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"
                          />
                        </div>
                        {feature.hasSettings && (
                          <button 
                            onClick={(e) => toggleSettings(feature.id, e)}
                            data-testid={`settings-btn-${feature.id}`}
                            className={`p-1.5 rounded transition-colors z-10 ${
                              expandedSettings === feature.id 
                                ? 'text-blue-400 bg-zinc-700' 
                                : `${menuSubTextClass} hover:text-blue-400 hover:bg-zinc-700/50`
                            }`}
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedSettings === feature.id && feature.hasSettings && (
                        <SettingsPanel feature={feature} />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Footer */}
        <div className={`${menuHeaderBgClass} px-4 py-3 flex items-center justify-center space-x-4 border-t ${menuDarkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
          <a 
            href="https://discord.gg/ixlpro" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center space-x-1.5 ${menuSubTextClass} hover:${menuTextClass} text-xs transition-colors`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.461-.63.874-1.295 1.226-1.963a.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
            </svg>
            <span>Discord</span>
          </a>
          <Link 
            to="/"
            className={`flex items-center space-x-1.5 ${menuSubTextClass} hover:${menuTextClass} text-xs transition-colors`}
          >
            <Globe className="w-4 h-4" />
            <span>Website</span>
          </Link>
        </div>
      </motion.div>

      {/* Reflection effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.1 : 0.05,
        }}
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[280px] h-[100px] bg-gradient-to-b from-blue-500/20 to-transparent blur-xl rounded-full"
      />
    </div>
  );
};

export default InteractiveMenu;

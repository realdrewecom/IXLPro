import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Zap, Clock, Brain, FileText, Shield, MessageSquare, Image, 
  Webhook, Sun, Settings, Home, User, Globe, ChevronDown
} from "lucide-react";

// Features with settings panels - only those shown in the screenshots have gear icons
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

const SettingsPanel = ({ feature, onClose }) => {
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

const InteractiveMenu = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(-12); // Start tilted to the left
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [features, setFeatures] = useState(menuFeatures);
  const [expandedSettings, setExpandedSettings] = useState(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced sensitivity and offset to keep it tilted left
    const rotateXVal = ((y - centerY) / centerY) * -8;
    const rotateYVal = ((x - centerX) / centerX) * 10 - 6; // Offset to stay tilted left
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(-12); // Return to tilted left position
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
    e.stopPropagation();
    setExpandedSettings(expandedSettings === featureId ? null : featureId);
  };

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
        className="relative z-10 w-[340px] bg-[#1a1a1d] rounded-xl border border-zinc-700/50 shadow-2xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Menu Header */}
        <div className="bg-[#141416] px-4 py-3 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-2 ring-blue-400/30">
              <span className="text-white font-bold text-xs">I</span>
            </div>
            <span className="text-white font-semibold text-sm">IXLPro</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              <Home className="w-4 h-4" />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 max-h-[380px] overflow-y-auto custom-scrollbar">
          {features.map((feature, index) => (
            <div key={feature.id}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`rounded-lg transition-all duration-200 ${
                  hoveredFeature === feature.id || expandedSettings === feature.id
                    ? "bg-zinc-800/80" 
                    : "hover:bg-zinc-800/50"
                }`}
              >
                <div 
                  className="flex items-center justify-between px-3 py-2.5 cursor-pointer"
                  onClick={() => toggleFeature(feature.id)}
                >
                  <div className="flex items-center space-x-3">
                    <feature.icon className={`w-4 h-4 ${feature.enabled ? 'text-blue-400' : 'text-zinc-500'}`} />
                    <span className={`text-sm ${feature.enabled ? 'text-white' : 'text-zinc-400'}`}>
                      {feature.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Toggle Switch */}
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
                    {/* Settings gear - only for features with settings */}
                    {feature.hasSettings && (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSettings(feature.id, e);
                        }}
                        data-testid={`settings-btn-${feature.id}`}
                        className={`p-1.5 rounded transition-colors z-10 ${
                          expandedSettings === feature.id 
                            ? 'text-blue-400 bg-zinc-700' 
                            : 'text-zinc-500 hover:text-blue-400 hover:bg-zinc-700/50'
                        }`}
                      >
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Settings Panel */}
                <AnimatePresence>
                  {expandedSettings === feature.id && feature.hasSettings && (
                    <SettingsPanel 
                      feature={feature} 
                      onClose={() => setExpandedSettings(null)} 
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Menu Footer */}
        <div className="bg-[#141416] px-4 py-3 flex items-center justify-center space-x-4 border-t border-zinc-800">
          <a 
            href="https://discord.gg/ixlpro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-zinc-400 hover:text-white text-xs transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.461-.63.874-1.295 1.226-1.963a.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
            </svg>
            <span>Discord</span>
          </a>
          <Link 
            to="/"
            className="flex items-center space-x-1.5 text-zinc-400 hover:text-white text-xs transition-colors"
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

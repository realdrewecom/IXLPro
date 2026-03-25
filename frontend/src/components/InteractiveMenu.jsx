import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Zap, Clock, Brain, FileText, Book, Beaker, Shield, Search, 
  Unlock, MessageSquare, Image, Webhook, Eye, Globe, Settings,
  SkipForward, Sun, EyeOff, PanelLeftClose, Home, User, ChevronRight
} from "lucide-react";

const menuFeatures = [
  { id: "auto-advance", name: "Auto Advance", icon: Zap, enabled: true },
  { id: "auto-advance-delay", name: "Auto Advance Delay", icon: Clock, enabled: false },
  { id: "auto-submit-delay", name: "Auto Submit Delay", icon: Clock, enabled: false },
  { id: "auto-answers", name: "Auto Answers", icon: Brain, enabled: true },
  { id: "auto-assignment", name: "Auto Assignment", icon: FileText, enabled: false },
  { id: "auto-instruction", name: "Auto Instruction", icon: Settings, enabled: false },
  { id: "auto-vocab", name: "Auto Vocab", icon: Book, enabled: false },
  { id: "auto-virtual-lab", name: "Auto Virtual Lab", icon: Beaker, enabled: false },
  { id: "anti-logout", name: "Anti Logout", icon: Shield, enabled: true },
];

const InteractiveMenu = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [features, setFeatures] = useState(menuFeatures);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXVal = ((y - centerY) / centerY) * -15;
    const rotateYVal = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
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
        className="relative z-10 w-[320px] bg-[#1a1a1d] rounded-xl border border-zinc-700/50 shadow-2xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Menu Header */}
        <div className="bg-[#141416] px-4 py-3 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">I</span>
            </div>
            <span className="text-white font-semibold text-sm">IXLPro</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Home className="w-4 h-4" />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <User className="w-4 h-4" />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 max-h-[350px] overflow-y-auto custom-scrollbar">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              onClick={() => toggleFeature(feature.id)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                hoveredFeature === feature.id 
                  ? "bg-zinc-800/80" 
                  : "hover:bg-zinc-800/50"
              }`}
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
                <Link 
                  to={`/features#${feature.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-zinc-500 hover:text-blue-400 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
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

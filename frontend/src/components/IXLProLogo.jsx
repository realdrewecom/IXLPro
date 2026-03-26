import React from "react";

// Sleek IXLPro Logo Component with circuit-like design
const IXLProLogo = ({ size = 32, className = "" }) => {
  const svgSize = size;
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: svgSize, height: svgSize }}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer glow ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#glowGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        
        {/* Main circle background */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="url(#mainGradient)"
        />
        
        {/* Inner ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          stroke="url(#innerRingGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />
        
        {/* Circuit-like decorative lines */}
        <path
          d="M 30 35 L 35 35 L 35 30"
          stroke="#60a5fa"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M 70 35 L 65 35 L 65 30"
          stroke="#60a5fa"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M 30 65 L 35 65 L 35 70"
          stroke="#60a5fa"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M 70 65 L 65 65 L 65 70"
          stroke="#60a5fa"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        
        {/* Small circuit dots */}
        <circle cx="30" cy="35" r="2" fill="#60a5fa" opacity="0.7" />
        <circle cx="70" cy="35" r="2" fill="#60a5fa" opacity="0.7" />
        <circle cx="30" cy="65" r="2" fill="#60a5fa" opacity="0.7" />
        <circle cx="70" cy="65" r="2" fill="#60a5fa" opacity="0.7" />
        
        {/* Horizontal accent lines */}
        <line x1="20" y1="50" x2="28" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
        <line x1="72" y1="50" x2="80" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
        
        {/* The "I" letter with shadow effect */}
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fill="url(#textGradient)"
          style={{
            fontSize: "42px",
            fontFamily: "Outfit, sans-serif",
            fontWeight: "700",
          }}
        >
          I
        </text>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          
          <linearGradient id="innerRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default IXLProLogo;

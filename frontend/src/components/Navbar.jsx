import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import IXLProLogo from "./IXLProLogo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Purchase", href: "/purchase" },
    { name: "Reviews", href: "/reviews" },
    { name: "Download", href: "/download" },
    { name: "Troubleshooting", href: "/troubleshooting" },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-zinc-800" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            data-testid="logo-link"
          >
            <IXLProLogo size={32} />
            <span className="text-xl font-bold text-blue-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
              IXLPro
            </span>
            <div className="hidden sm:flex items-center ml-3 px-2 py-1 rounded-full bg-zinc-800/50">
              <span className="w-2 h-2 rounded-full bg-green-500 pulse-green mr-2"></span>
              <span className="text-xs text-zinc-400">All services are online</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm transition-colors duration-200 ${
                  isActive(link.href) 
                    ? "text-white font-medium" 
                    : "text-zinc-400 hover:text-white"
                }`}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side - Trustpilot & Discord */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className="text-xs text-zinc-400">Rated</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-zinc-400">on</span>
              <span className="text-xs text-green-500 font-medium">Trustpilot</span>
            </div>
            <a
              href="https://discord.gg/ixlpro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] px-3 py-1.5 rounded-md transition-colors duration-200"
              data-testid="discord-button"
            >
              <FaDiscord className="w-4 h-4" />
              <span className="text-sm font-medium">Discord</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white"
            data-testid="mobile-menu-button"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-zinc-800"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm py-2 transition-colors duration-200 ${
                    isActive(link.href) 
                      ? "text-white font-medium" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 pt-3 border-t border-zinc-800">
                <span className="w-2 h-2 rounded-full bg-green-500 pulse-green"></span>
                <span className="text-xs text-zinc-400">All services are online</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

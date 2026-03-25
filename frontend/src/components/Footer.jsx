import React from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { name: "Reviews", href: "#reviews" },
    { name: "Pricing", href: "#pricing" },
    { name: "How It Works", href: "#setup" },
    { name: "Troubleshooting", href: "#faq" },
  ];

  const legalLinks = [
    { name: "Contact", href: "#contact" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Privacy Policy", href: "#privacy" },
  ];

  const socialLinks = [
    { icon: <FaDiscord className="w-5 h-5" />, href: "https://discord.gg/ixlpro", label: "Discord" },
    { icon: <FaTwitter className="w-5 h-5" />, href: "https://twitter.com/ixlpro", label: "Twitter" },
    { icon: <FaYoutube className="w-5 h-5" />, href: "https://youtube.com/@ixlpro", label: "YouTube" },
    { icon: <FaTiktok className="w-5 h-5" />, href: "https://tiktok.com/@ixlpro", label: "TikTok" },
  ];

  return (
    <footer 
      className="bg-zinc-950 border-t border-zinc-800 py-16"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm">
              Become an <span className="text-blue-400">IXL</span> Pro with IXLPro!
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 
              className="text-white font-semibold mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="footer-link text-sm"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 
              className="text-white font-semibold mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="footer-link text-sm"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 
              className="text-white font-semibold mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label={link.label}
                  data-testid={`social-link-${link.label.toLowerCase()}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-zinc-500 text-sm">
              © 2022-{currentYear} IXLPro LLC. All rights reserved.
            </p>
            <p className="text-zinc-600 text-xs">
              v1.2.2 | 54.5k Users
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

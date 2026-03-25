import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Shield, Eye, Menu, MessageSquare, PlayCircle, Power, Key, AlertTriangle } from "lucide-react";

const faqItems = [
  {
    icon: <Shield className="w-5 h-5 text-red-400" />,
    question: "Can IXL detect IXLPro?",
    answer: "IXLPro is designed to be undetectable. Our script runs locally in your browser and mimics natural user behavior. We constantly update our methods to stay ahead of any detection attempts."
  },
  {
    icon: <Eye className="w-5 h-5 text-blue-400" />,
    question: "Is IXLPro safe to use?",
    answer: "Yes, IXLPro is completely safe. We don't collect any personal information, store passwords, or access your IXL account credentials. The script runs entirely in your browser."
  },
  {
    icon: <Menu className="w-5 h-5 text-zinc-400" />,
    question: "Why can't I see the IXLPro menu?",
    answer: "Make sure you have Tampermonkey installed and the IXLPro script is enabled. Try refreshing the page or clearing your browser cache. If issues persist, join our Discord for support."
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-green-400" />,
    question: "How do I set up Discord Logging?",
    answer: "Open the IXLPro menu, navigate to Settings, and paste your Discord webhook URL. This allows you to receive notifications about completed assignments directly in your Discord server."
  },
  {
    icon: <PlayCircle className="w-5 h-5 text-red-400" />,
    question: "Can I skip IXL videos?",
    answer: "Yes! IXLPro includes an auto-skip feature for instructional videos, allowing you to focus on the questions and complete assignments faster."
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    question: "Why isn't Auto Answers working?",
    answer: "Auto Answers requires a valid license key. Make sure your key is entered correctly and hasn't expired. Some question types may require manual input for accuracy."
  },
  {
    icon: <Power className="w-5 h-5 text-orange-400" />,
    question: "Why isn't Auto Advance working?",
    answer: "Check that Auto Advance is enabled in the menu. Some pages may have delays built in for safety. Adjust the Auto Advance Delay setting if needed."
  },
  {
    icon: <Key className="w-5 h-5 text-cyan-400" />,
    question: "How can I 'Kill Switch' IXLPro?",
    answer: "Click the IXLPro menu icon and select 'Disable All Features' or simply disable the script in Tampermonkey. You can also press Ctrl+Shift+K to quickly toggle off."
  },
  {
    icon: <Key className="w-5 h-5 text-purple-400" />,
    question: "What is a service key?",
    answer: "A service key is designed for businesses, tutoring services, or groups who need multiple users. It provides extended access and priority support for professional use."
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    question: "Why do I see 'Windows Script Host' or '800a03ea' errors?",
    answer: "These errors are unrelated to IXLPro and indicate a Windows system issue. Try restarting your browser or running it as administrator. Contact our Discord support for more help."
  }
];

const FAQ = () => {
  return (
    <section 
      id="faq" 
      className="py-24"
      data-testid="faq-section"
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
            FAQ
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold mt-2"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="faq-item rounded-lg px-4"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-3 text-left">
                    {item.icon}
                    <span className="text-sm text-zinc-200">{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-sm pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;

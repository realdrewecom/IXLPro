import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Zap, Clock, FileText, Brain, Settings, Book, Beaker, Shield, Search, 
  Unlock, MessageSquare, Wand2, Image, Webhook, Eye, Globe, Columns,
  SkipForward, Sun, EyeOff, PanelLeftClose, Play
} from "lucide-react";

// All features data adapted for IXL
const featuresData = [
  {
    id: "auto-advance",
    name: "Auto Advance",
    icon: <Zap className="w-5 h-5" />,
    description: "Auto Advance will automatically move on to the next page, activity, or question after completion. It also has different \"modes\", allowing for a more custom experience.",
    subFeatures: [
      {
        name: "Coursemap Mode",
        description: "Returns to home page after each lesson to advance to the next activity."
      },
      {
        name: "Next Activity Mode",
        description: "Advances to the Next Activity without returning to the class coursemap."
      },
      {
        name: "Take Notes",
        description: "Uses our advanced AI note generator to take notes after each instructional activity."
      }
    ]
  },
  {
    id: "auto-advance-delay",
    name: "Auto Advance Delay",
    icon: <Clock className="w-5 h-5" />,
    description: "Auto advance delay will make IXLPro wait before moving on to the next frame/question in activities. You can customize how long you want IXLPro to wait before submitting by entering any number between 1 to 300 seconds."
  },
  {
    id: "auto-submit-delay",
    name: "Auto Submit Delay",
    icon: <Clock className="w-5 h-5" />,
    description: "When combining Auto Advance with Auto Answers, it will automatically submit the activity after completion. You can customize how long you want IXLPro to wait before submitting by entering any number between 1 to 60 minutes.",
    subFeatures: [
      {
        name: "Custom Delays",
        description: "Customize delays based on the length of the test. For example, set unique submission times for exams with 10-25 questions, 25-50 questions, or 50+ questions to ensure a tailored experience for different test formats."
      }
    ]
  },
  {
    id: "auto-answers",
    name: "Auto Answers",
    icon: <Brain className="w-5 h-5" />,
    description: "Auto Answers will automatically answer questions on graded test activities such as Quizzes, Unit Tests, and Practices. It also has different \"modes\", allowing for a more custom experience.",
    subFeatures: [
      {
        name: "Default Mode",
        description: "Clicks, selects, and writes the correct answer for all questions."
      },
      {
        name: "Stealth Mode",
        description: "Subtly highlights the correct option when hovered for you to click on your own. Stealth mode does not answer written response questions."
      },
      {
        name: "Guess Unknown Questions",
        description: "If the correct answer is unknown, it will make an educated guess to maximize your score."
      }
    ]
  },
  {
    id: "auto-assignment",
    name: "Auto Assignment",
    icon: <FileText className="w-5 h-5" />,
    description: "Automatically completes assignments by leveraging advanced algorithms to ensure accuracy and efficiency.",
    subFeatures: [
      {
        name: "Guess Unknown Questions",
        description: "If the correct answer is unknown, it will make an educated guess to maximize your score."
      }
    ]
  },
  {
    id: "auto-instruction",
    name: "Auto Instruction",
    icon: <Play className="w-5 h-5" />,
    description: "Automatically answers ungraded activities such as Warm-Ups and Instructions by making random guesses, ensuring you can quickly move forward without manual input."
  },
  {
    id: "auto-vocab",
    name: "Auto Vocab",
    icon: <Book className="w-5 h-5" />,
    description: "Automatically completes vocabulary activities with precision and speed."
  },
  {
    id: "auto-virtual-lab",
    name: "Auto Virtual Lab",
    icon: <Beaker className="w-5 h-5" />,
    description: "Efficiently automates virtual lab activities, delivering accurate and reliable outcomes."
  },
  {
    id: "anti-logout",
    name: "Anti Logout",
    icon: <Shield className="w-5 h-5" />,
    description: "Prevents the system from logging you out due to inactivity."
  },
  {
    id: "brainly-search",
    name: "Brainly Search",
    icon: <Search className="w-5 h-5" />,
    description: "Enhances your workflow by adding a convenient button beneath each question, allowing you to search for answers directly on Brainly with a single click."
  },
  {
    id: "brainly-unlocker",
    name: "Brainly Unlocker",
    icon: <Unlock className="w-5 h-5" />,
    description: "Unlocks premium Brainly answers for free, enhancing your learning experience.",
    note: "This feature is built directly into Brainly.com and is not a togglable option."
  },
  {
    id: "ai-answers",
    name: "AI Answers",
    icon: <MessageSquare className="w-5 h-5" />,
    description: "Uses AI to provide accurate answers for written text questions like essays and short answers, saving time and improving efficiency.",
    subFeatures: [
      {
        name: "Humanize Feature",
        description: "Transforms AI-generated answers into a more natural, human-like tone to ensure they appear authentic and personalized."
      },
      {
        name: "Ask AI Button",
        description: "Provides a convenient button to instantly generate AI-powered answers for any question, saving time and effort."
      }
    ]
  },
  {
    id: "custom-background",
    name: "Custom Background",
    icon: <Image className="w-5 h-5" />,
    description: "Allows you to set a custom background (via URL) for a personalized experience."
  },
  {
    id: "discord-logging",
    name: "Discord Logging",
    icon: <Webhook className="w-5 h-5" />,
    description: "Logs activity and sends updates to your personal Discord webhook.",
    subFeatures: [
      {
        name: "Mention User on Log",
        description: "Configures user mentions in Discord logs. Choose \"Enabled\" to ping the user for every log or \"Only Important\" for critical alerts only."
      }
    ]
  },
  {
    id: "frame-unlocker",
    name: "Frame Unlocker",
    icon: <Unlock className="w-5 h-5" />,
    description: "Unlocks restricted frames for seamless navigation, allowing users to access all questions in activities where questions are usually restricted until the previous one is completed."
  },
  {
    id: "language-activity-skipper",
    name: "Language Activity Skipper",
    icon: <Globe className="w-5 h-5" />,
    description: "Automatically completes language activities to save time and effort."
  },
  {
    id: "multi-tabs",
    name: "Multi-tabs",
    icon: <Columns className="w-5 h-5" />,
    description: "Removes the single-tab restriction, allowing users to open multiple classes simultaneously for efficient multitasking.",
    note: "This feature is built directly into IXLPro and is not a togglable option."
  },
  {
    id: "show-column",
    name: "Show Column",
    icon: <Eye className="w-5 h-5" />,
    description: "Unlocks all columns in questions that usually have columns hidden until the question is answered (e.g., written response questions that show example responses after you've answered)."
  },
  {
    id: "skip-intros",
    name: "Skip Intros",
    icon: <SkipForward className="w-5 h-5" />,
    description: "Automatically skips the audio clips at the beginning of questions that restrict the user from answering (\"Intros\"), saving time and improving efficiency."
  },
  {
    id: "video-brightness",
    name: "Video Brightness",
    icon: <Sun className="w-5 h-5" />,
    description: "Adjusts video brightness for a better viewing experience."
  },
  {
    id: "hide-personal-info",
    name: "Hide Personal Info",
    icon: <EyeOff className="w-5 h-5" />,
    description: "Hides (blurs) private info on the page such as your first & last name, course names, and school name."
  },
  {
    id: "hide-menu",
    name: "Hide Menu",
    icon: <PanelLeftClose className="w-5 h-5" />,
    description: "Hides the IXLPro menu for a distraction-free workspace. Press CTRL-SHIFT-H to toggle or CTRL-SHIFT-R to reset."
  }
];

const FeaturesPage = () => {
  const [selectedFeature, setSelectedFeature] = useState(featuresData[0]);
  const location = useLocation();
  const featureRefs = useRef({});

  useEffect(() => {
    // Check for hash in URL to scroll to specific feature
    if (location.hash) {
      const featureId = location.hash.replace('#', '');
      const feature = featuresData.find(f => f.id === featureId);
      if (feature) {
        setSelectedFeature(feature);
        setTimeout(() => {
          featureRefs.current[featureId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [location]);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    window.history.pushState(null, '', `#${feature.id}`);
  };

  return (
    <div className="min-h-screen bg-[#09090b]" data-testid="features-page">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Feature Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {featuresData.map((feature) => (
              <button
                key={feature.id}
                ref={(el) => (featureRefs.current[feature.id] = el)}
                onClick={() => handleFeatureClick(feature)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedFeature.id === feature.id
                    ? "bg-zinc-700 text-white"
                    : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white"
                }`}
                data-testid={`feature-tag-${feature.id}`}
              >
                {feature.name}
              </button>
            ))}
          </motion.div>

          {/* Feature Detail Card */}
          <motion.div
            key={selectedFeature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8"
            data-testid="feature-detail-card"
          >
            {/* Feature Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-blue-400">{selectedFeature.icon}</div>
              <h2 
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {selectedFeature.name}
              </h2>
            </div>

            {/* Main Description */}
            <p className="text-zinc-300 mb-6 leading-relaxed">
              {selectedFeature.description}
            </p>

            {/* Note if exists */}
            {selectedFeature.note && (
              <p className="text-zinc-500 italic text-sm mb-6">
                {selectedFeature.note}
              </p>
            )}

            {/* Sub-features */}
            {selectedFeature.subFeatures && (
              <div className="space-y-6 border-t border-zinc-800 pt-6">
                {selectedFeature.subFeatures.map((sub, index) => (
                  <div key={index}>
                    <h3 
                      className="text-lg font-semibold text-white mb-2"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {sub.name}
                    </h3>
                    <div className="border-l-2 border-blue-500 pl-4">
                      <p className="text-zinc-400">{sub.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;

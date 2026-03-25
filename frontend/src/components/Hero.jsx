import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, Users } from "lucide-react";

const HERO_MOCKUP_URL = "https://static.prod-images.emergentagent.com/jobs/5ad3d3b7-3d79-4fc4-91a4-b187c2dbc9f2/images/df24647f986c88754e24237936b7ad5f176467f422d68c7f8157a1b5d22d1fb0.png";

// Counter animation component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M+";
    } else if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span ref={countRef} className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {formatNumber(count)}{suffix}
    </span>
  );
};

const Hero = ({ stats }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="features" 
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Smarter studying starts with{" "}
              <span className="text-gradient">IXLPro</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              IXLPro is a powerful tool for the online school{" "}
              <span className="text-white font-medium">IXL</span>, helping students
              complete courses faster and learn more efficiently.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12"
            >
              <a
                href="#reviews"
                className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg transition-all duration-200"
                data-testid="what-people-say-btn"
              >
                <MessageSquare className="w-4 h-4" />
                <span>What People Say</span>
              </a>
              <a
                href="#pricing"
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition-all duration-200 btn-glow"
                data-testid="get-started-btn"
              >
                <Star className="w-4 h-4" />
                <span className="font-medium">Get Started Now</span>
              </a>
              <a
                href="#features"
                className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg transition-all duration-200"
                data-testid="explore-features-btn"
              >
                <span>Explore Features</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4"
            >
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center card-hover">
                <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <AnimatedCounter end={stats.users} />
                <p className="text-sm text-zinc-500 mt-1">IXLPro Users</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center card-hover">
                <svg className="w-6 h-6 text-blue-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <AnimatedCounter end={stats.questions_answered} suffix="+" />
                <p className="text-sm text-zinc-500 mt-1">Questions Answered</p>
                <p className="text-xs text-zinc-600">({stats.questions_answered.toLocaleString()})</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center card-hover">
                <svg className="w-6 h-6 text-blue-400 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                </svg>
                <AnimatedCounter end={stats.discord_members} />
                <p className="text-sm text-zinc-500 mt-1">Discord Members</p>
              </div>
            </motion.div>

            {/* Trustpilot */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center justify-center lg:justify-start space-x-2"
            >
              <span className="text-sm text-zinc-500">Rated</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-zinc-500">on</span>
              <span className="text-sm text-green-500 font-medium">Trustpilot</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Mockup Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full transform scale-75" />
              
              <img
                src={HERO_MOCKUP_URL}
                alt="IXLPro Menu Interface"
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
                data-testid="hero-mockup"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

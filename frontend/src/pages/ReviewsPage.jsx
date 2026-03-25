import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// More diverse avatar collection
const AVATARS = [
  "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1520283818086-3f6dffb019c0?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
];

const reviewsData = [
  {
    id: 1,
    username: "isthattav",
    avatar: AVATARS[0],
    timestamp: "1/19/2026, 9:13:32 AM",
    message: "Does work, if you need something that can just go in the background, answer all your questions, pretty good accuracy, use IXLPro\n\nWent from 60%-96% last night\n\nSchool said I got 30 days to graduate or they kick me out, ill update if IXLPro comes in clutch like Bron in 2010",
    helpful: 9,
    hasImage: true,
    color: "text-purple-400",
  },
  {
    id: 2,
    username: "iscyberpluto",
    avatar: AVATARS[1],
    timestamp: "1/8/2026, 6:38:56 AM",
    message: "10/10 like gawd dayum this is actually really good. You guys NEED to get ixlpro it's so cheap and it gets rid of my stupid credit recovery classes so fast",
    helpful: 6,
    color: "text-cyan-400",
  },
  {
    id: 3,
    username: "kzxqp",
    avatar: AVATARS[2],
    timestamp: "12/16/2025, 11:03:07 PM",
    message: "IXLPro is great I was two years behind in schoolwork and it finished a whole class within 24hrs. I love this, I tried it out with the daily 2.50 purchase and I now have the weekly one, I plan on buying it again.",
    helpful: 4,
    color: "text-green-400",
  },
  {
    id: 4,
    username: "sourstraw60",
    avatar: AVATARS[3],
    timestamp: "2/2/2026, 12:29:05 PM",
    message: "Graduated highschool in a couple of months - would highly recommend to anyone who needs to catch up on credits or just wants to finish faster.",
    helpful: 7,
    color: "text-orange-400",
  },
  {
    id: 5,
    username: "mathking2025",
    avatar: AVATARS[4],
    timestamp: "1/25/2026, 3:45:12 PM",
    message: "Finally something that actually works! IXLPro saved my semester. The auto-answers feature is incredibly accurate and the stealth mode is perfect for when teachers are watching.",
    helpful: 12,
    color: "text-blue-400",
  },
  {
    id: 6,
    username: "studyhard_99",
    avatar: AVATARS[5],
    timestamp: "1/20/2026, 8:22:18 AM",
    message: "Been using for 2 months now. Went from failing to straight A's. The AI answers for essays are actually really good quality. Worth every penny!",
    helpful: 8,
    color: "text-pink-400",
  },
  {
    id: 7,
    username: "gradmaster",
    avatar: AVATARS[6],
    timestamp: "1/15/2026, 11:55:30 PM",
    message: "This tool is insane. Completed an entire semester of IXL in 3 days. Support team on Discord is super helpful too. 10/10 would recommend.",
    helpful: 15,
    color: "text-yellow-400",
  },
  {
    id: 8,
    username: "nightowl_student",
    avatar: AVATARS[7],
    timestamp: "1/10/2026, 2:14:45 AM",
    message: "Running this overnight and waking up to completed assignments is the best feeling. Anti-logout feature is clutch. Already recommended to all my friends.",
    helpful: 5,
    color: "text-red-400",
  },
  {
    id: 9,
    username: "valedictorian2026",
    avatar: AVATARS[8],
    timestamp: "1/22/2026, 5:30:12 PM",
    message: "Don't know how I would have survived AP classes without this. The AI answers feature is genuinely impressive. Worth every penny for the peace of mind.",
    helpful: 11,
    color: "text-emerald-400",
  },
  {
    id: 10,
    username: "lazy_genius",
    avatar: AVATARS[9],
    timestamp: "12/29/2025, 11:45:00 PM",
    message: "Finally a tool that actually works. Tried so many other scripts but IXLPro is the only one that's reliable and fast. Customer support is A1 too",
    helpful: 6,
    color: "text-amber-400",
  },
  {
    id: 11,
    username: "creditrecovery_king",
    avatar: AVATARS[10],
    timestamp: "2/1/2026, 7:12:33 PM",
    message: "Was 47 credits behind and about to get kicked out. Used IXLPro for 2 weeks straight and caught up completely. This is literally the GOAT of school tools.",
    helpful: 18,
    color: "text-indigo-400",
  },
  {
    id: 12,
    username: "senioritis_survivor",
    avatar: AVATARS[11],
    timestamp: "1/28/2026, 4:20:00 PM",
    message: "Senioritis hit hard but IXLPro hit harder. Finished all my IXL courses with minimal effort. Highly recommend the month key if you're serious about catching up.",
    helpful: 9,
    color: "text-rose-400",
  },
  {
    id: 13,
    username: "4.0_gpa_incoming",
    avatar: AVATARS[12],
    timestamp: "1/30/2026, 10:30:15 AM",
    message: "The Brainly unlocker alone is worth it. Plus the auto-answers work perfectly. My grades have never been better and I actually have time for a social life now.",
    helpful: 7,
    color: "text-violet-400",
  },
  {
    id: 14,
    username: "procrastinator_pro",
    avatar: AVATARS[13],
    timestamp: "2/3/2026, 11:59:59 PM",
    message: "Had 50 assignments due at midnight. IXLPro got them all done with 3 minutes to spare. This tool is essential for last-minute warriors like me lol",
    helpful: 14,
    color: "text-teal-400",
  },
  {
    id: 15,
    username: "honor_roll_incoming",
    avatar: AVATARS[14],
    timestamp: "1/18/2026, 6:45:22 AM",
    message: "From a 2.1 GPA to honor roll in one semester. IXLPro + actually studying for tests = unstoppable combo. Thanks for making such an amazing tool!",
    helpful: 10,
    color: "text-lime-400",
  },
];

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2B2D31] rounded-lg p-5 mb-4"
      data-testid={`review-${review.id}`}
    >
      <div className="flex items-start space-x-3">
        <img
          src={review.avatar}
          alt={review.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className={`font-semibold ${review.color}`}>{review.username}</span>
            <span className="text-xs text-zinc-500">{review.timestamp}</span>
          </div>
          <p className="text-zinc-300 mt-2 whitespace-pre-line">{review.message}</p>
          {review.hasImage && (
            <a href="#" className="text-blue-400 hover:underline text-sm mt-2 inline-block">
              View image
            </a>
          )}
          <p className="text-zinc-500 text-sm mt-3">{review.helpful} people found this helpful.</p>
        </div>
      </div>
    </motion.div>
  );
};

const ReviewsPage = () => {
  const [sortBy, setSortBy] = useState("recent"); // recent or helpful

  const sortedReviews = [...reviewsData].sort((a, b) => {
    if (sortBy === "helpful") {
      return b.helpful - a.helpful;
    }
    // Sort by most recent (using id as proxy for recency)
    return b.id - a.id;
  });

  return (
    <div className="min-h-screen bg-[#09090b]" data-testid="reviews-page">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sort Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center space-x-4 mb-8"
          >
            <button
              onClick={() => setSortBy("recent")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                sortBy === "recent"
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"
              }`}
              data-testid="sort-recent"
            >
              Most Recent
            </button>
            <button
              onClick={() => setSortBy("helpful")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                sortBy === "helpful"
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"
              }`}
              data-testid="sort-helpful"
            >
              Most Helpful
            </button>
          </motion.div>

          {/* Reviews List */}
          <div className="space-y-4">
            {sortedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReviewsPage;

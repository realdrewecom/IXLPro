import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

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
];

const reviews = [
  {
    username: "schizobipolar",
    avatar: AVATARS[0],
    timestamp: "2/5/2026, 3:36:39 PM",
    message: "will come back after my key gone it works amazing",
    helpful: 2,
    color: "text-green-400",
  },
  {
    username: "rremorse_",
    avatar: AVATARS[1],
    timestamp: "1/6/2026, 6:29:21 PM",
    message: "graduated with ixlpro 2023-2028 this tool saved my life fr",
    helpful: 2,
    color: "text-orange-400",
  },
  {
    username: "isthattav",
    avatar: AVATARS[2],
    timestamp: "1/19/2026, 9:13:32 AM",
    message: "Does work, if you need something that can just go in the background, answer all your questions, pretty good accuracy, use IXLPro. Went from 60%-96% last night",
    helpful: 9,
    color: "text-purple-400",
  },
  {
    username: "gamerboy42",
    avatar: AVATARS[3],
    timestamp: "10/24/2025, 4:04:47 AM",
    message: "It's the best it's so good in fact i gave you guys a server boost and i told gang about yall frfr big brain i love it",
    helpful: 2,
    color: "text-red-400",
  },
  {
    username: "studyking99",
    avatar: AVATARS[4],
    timestamp: "12/15/2025, 2:15:33 PM",
    message: "This tool is insane! Finished all my IXL assignments in record time. Highly recommend to anyone struggling with IXL.",
    helpful: 5,
    color: "text-blue-400",
  },
  {
    username: "mathwizard_",
    avatar: AVATARS[5],
    timestamp: "11/28/2025, 9:42:18 AM",
    message: "Been using this for 3 months now and it's been a lifesaver. Support team on Discord is super helpful too. 10/10 would recommend.",
    helpful: 3,
    color: "text-cyan-400",
  },
  {
    username: "iscyberpluto",
    avatar: AVATARS[6],
    timestamp: "1/8/2026, 6:38:56 AM",
    message: "10/10 like gawd dayum this is actually really good. You guys NEED to get ixlpro it's so cheap and it gets rid of my stupid credit recovery classes so fast",
    helpful: 6,
    color: "text-yellow-400",
  },
  {
    username: "kzxqp",
    avatar: AVATARS[7],
    timestamp: "12/16/2025, 11:03:07 PM",
    message: "IXLPro is great I was two years behind in schoolwork and it finished a whole class within 24hrs. I love this, already have the weekly one",
    helpful: 4,
    color: "text-pink-400",
  },
  {
    username: "sourstraw60",
    avatar: AVATARS[8],
    timestamp: "2/2/2026, 12:29:05 PM",
    message: "Graduated highschool in a couple of months - would highly recommend to anyone who needs to catch up on credits or just wants to finish faster.",
    helpful: 7,
    color: "text-emerald-400",
  },
  {
    username: "nightowl_student",
    avatar: AVATARS[9],
    timestamp: "1/10/2026, 2:14:45 AM",
    message: "Running this overnight and waking up to completed assignments is the best feeling. Anti-logout feature is clutch. Already recommended to all my friends.",
    helpful: 5,
    color: "text-indigo-400",
  },
  {
    username: "valedictorian2026",
    avatar: AVATARS[10],
    timestamp: "1/22/2026, 5:30:12 PM",
    message: "Don't know how I would have survived AP classes without this. The AI answers feature is genuinely impressive. Worth every penny.",
    helpful: 8,
    color: "text-rose-400",
  },
  {
    username: "lazy_genius",
    avatar: AVATARS[11],
    timestamp: "12/29/2025, 11:45:00 PM",
    message: "Finally a tool that actually works. Tried so many other scripts but IXLPro is the only one that's reliable and fast. Customer support is A1 too",
    helpful: 6,
    color: "text-amber-400",
  },
];

const ReviewCard = ({ review }) => {
  return (
    <div 
      className="discord-card p-4 mx-3 min-w-[320px] max-w-[380px]"
      data-testid={`review-card-${review.username}`}
    >
      <div className="flex items-start space-x-3">
        <img
          src={review.avatar}
          alt={review.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className={`font-medium ${review.color}`}>{review.username}</span>
            <span className="text-xs text-zinc-500">{review.timestamp}</span>
          </div>
          <p className="text-sm text-zinc-300 mt-1 line-clamp-3">{review.message}</p>
          <p className="text-xs text-zinc-500 mt-2">{review.helpful} people found this helpful</p>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <section 
      id="reviews" 
      className="py-24 overflow-hidden"
      data-testid="reviews-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">
            Reviews
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold mt-2"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            What are <span className="text-gradient underline">REAL</span> students saying?
          </h2>
        </motion.div>

        {/* Marquee */}
        <div className="marquee-container">
          <Marquee
            speed={40}
            gradient={true}
            gradientColor="#09090b"
            gradientWidth={100}
            pauseOnHover={true}
          >
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

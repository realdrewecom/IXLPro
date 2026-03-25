import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const AVATARS = [
  "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzQ0NzY2Nzd8MA&ixlib=rb-4.1.0&q=85&w=100",
  "https://images.unsplash.com/photo-1569913486515-b74bf7751574?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBhdmF0YXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzQ0NzY2Nzd8MA&ixlib=rb-4.1.0&q=85&w=100",
  "https://images.unsplash.com/photo-1520283818086-3f6dffb019c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBhdmF0YXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzQ0NzY2Nzd8MA&ixlib=rb-4.1.0&q=85&w=100",
  "https://images.pexels.com/photos/2233508/pexels-photo-2233508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100",
];

const reviews = [
  {
    username: "schizobipolar",
    avatar: AVATARS[0],
    timestamp: "2/5/2026, 3:36:39 PM",
    message: "will come back after my key gone it",
    helpful: 2,
    color: "text-green-400",
  },
  {
    username: "rremorse_",
    avatar: AVATARS[1],
    timestamp: "1/6/2026, 6:29:21 PM",
    message: "graduated with ixlpro 2023-2028 🙌🙌",
    helpful: 2,
    color: "text-orange-400",
  },
  {
    username: "deleted_user_778b0b0...",
    avatar: AVATARS[2],
    timestamp: "1/12/2025, 7:34:44 AM",
    message: "I recently graduated, when i was behind and online school was such a sore to work on i saw a ixlpro ad on reels so i bought it and got caught up and ended up meeting graduation requirements!!! love thiss",
    helpful: 2,
    color: "text-purple-400",
  },
  {
    username: "gamerboy42",
    avatar: AVATARS[3],
    timestamp: "10/24/2025, 4:04:47 AM",
    message: "It's the best it's so good in fact i gave you guys a server boost and i told gang and em about yall frfr and ngl tap your locked in bro big brain i love it",
    helpful: 2,
    color: "text-red-400",
  },
  {
    username: "studyking99",
    avatar: AVATARS[0],
    timestamp: "12/15/2025, 2:15:33 PM",
    message: "This tool is insane! Finished all my IXL assignments in record time. Highly recommend to anyone struggling with IXL.",
    helpful: 5,
    color: "text-blue-400",
  },
  {
    username: "mathwizard_",
    avatar: AVATARS[1],
    timestamp: "11/28/2025, 9:42:18 AM",
    message: "Been using this for 3 months now and it's been a lifesaver. Support team is also super helpful on Discord!",
    helpful: 3,
    color: "text-cyan-400",
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

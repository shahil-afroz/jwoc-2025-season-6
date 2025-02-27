import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import React from 'react';

const TimelineItem = ({ item, index, isEven }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: isEven ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3, // Faster overall duration
        delay: index * 0.1, // Slightly increased delay between items for better visual flow
        ease: "easeOut",
      },
    },
  };
  
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2, // Faster dot animation
        delay: index * 0.1, // Matching delay with container
        ease: "backOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // Reduced margin to trigger animation sooner
      className="relative w-full px-4 sm:px-0"
    >
      <div
        className={`flex flex-col items-center ${
          isEven ? "sm:flex-row-reverse" : "sm:flex-row"
        } gap-8 lg:gap-4`}
      >
        <motion.div
          className="w-full sm:w-[45%]"
          initial={{ opacity: 0, y: 20 }} // Reduced initial y offset
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: index * 0.1 }, // Faster animation, consistent delay
          }}
          viewport={{ once: true }}
        >
          <h1
            className={`font-space-grotesk pt-10 lg:pt-0 text-xl sm:text-2xl md:text-4xl font-bold mb-1 tracking-wide leading-snug
              text-indigo-500 text-center`}
          >
            {item.title}
          </h1>

          <div
            className="bg-gradient-to-br from-white/10 to-white/5
                        hover:from-white/15 hover:to-white/10 transition-all duration-300
                        backdrop-blur-md rounded-lg p-4
                        border border-blue-300/10 shadow-md w-full"
          >
            <div className="prose prose-sm prose-invert max-w-none">
              <p
                className="text-sm leading-loose tracking-wide text-blue-50
                          bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent
                          drop-shadow-[0_1px_4px_rgba(56,189,248,0.4)]"
              >
                {item.content}
              </p>
              {item.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full
                                bg-blue-400/10 text-blue-200 border border-blue-300/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={dotVariants}
          className="absolute left-1/2 transform -translate-x-1/2 z-10 justify-center items-center hidden lg:block
                    sm:top-1/2 sm:-translate-y-1/2 top-4"
        >
          <div className="group relative">
            <div className="h-10 w-10 rounded-full
                          bg-gradient-to-br from-blue-400/30 to-purple-500/30
                          backdrop-blur-md flex items-center justify-center
                          border border-blue-300/30 shadow-lg shadow-blue-500/20
                          group-hover:from-blue-400/40 group-hover:to-purple-500/40
                          transition-all duration-300">
              <div className="h-10 w-10 rounded-full
                            bg-gradient-to-r from-blue-400 to-purple-400
                            border border-blue-300/50 animate-pulse
                            shadow-lg shadow-blue-400/30
                            group-hover:scale-110 transition-transform duration-600" />
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" />
              <div className="absolute -inset-2 rounded-full bg-blue-400/10
                            group-hover:bg-blue-400/20 transition-colors duration-600" />
              <Star
                className="absolute text-white/50 animate-spin"
                style={{ animation: 'spin 2s linear infinite' }}
                size={24}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Timeline = ({ data }) => {
  return (
    <div className="min-h-screen overflow-hidden font-inter">
      <div className="container pl-28 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }} // Faster initial animation
          className="py-8 text-center"
        >
          <div className="relative inline-block text-center mt-7">
            <span className="absolute inset-0 mt-2 lg:mt-4 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 blur-lg"></span>
            <h1 className="relative font-extrabold font-rubik text-4xl sm:text-6xl text-white">
              Timeline
            </h1>
          </div>
        </motion.div>

        <div className="relative pb-20">
          <div className="absolute left-[calc(50%-1.5px)] sm:left-1/2 top-0 transform sm:-translate-x-1/2 h-full w-[3px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300/30 to-transparent" />
            <motion.div
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.5, ease: "easeOut" }} // Faster line animation
              className="absolute inset-x-0 top-0 w-full bg-gradient-to-b
                         from-blue-400 via-blue-300 to-transparent
                         shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
            <div className="absolute inset-0 blur-sm bg-blue-400/20" />
          </div>

          <div className="relative sm:pr-14 z-10">
            {data.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Timeline;
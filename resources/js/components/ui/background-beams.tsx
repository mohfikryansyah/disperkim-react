import React from "react";
import { motion } from "motion/react";

export const BackgroundBeams = React.memo(() => {
  // Hanya 4 path yang mengikuti border dashed di hero
  const paths = [
    "M-100 -100L900 900", // diagonal kiri atas ke kanan bawah
    "M-650 -100L350 900", // diagonal kedua
    "M-200 -100L800 900", // diagonal ketiga (area gradient)
    "M600 -100L1600 900", // diagonal kanan
  ];

  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
      <svg
        className="pointer-events-none absolute z-0 h-full w-full"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <motion.path
            key={`path-${index}`}
            d={path}
            stroke={`url(#linearGradient-${index})`}
            strokeOpacity="0.6"
            strokeWidth="2"
          ></motion.path>
        ))}
        <defs>
          {paths.map((path, index) => (
            <motion.linearGradient
              id={`linearGradient-${index}`}
              key={`gradient-${index}`}
              initial={{
                x1: "0%",
                x2: "0%",
                y1: "0%",
                y2: "0%",
              }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", "95%"],
              }}
              transition={{
                duration: 15 + index * 2,
                ease: "linear",
                repeat: Infinity,
                delay: index * 2,
              }}
            >
              <stop stopColor="#3b82f6" stopOpacity="0"></stop>
              <stop stopColor="#3b82f6"></stop>
              <stop offset="50%" stopColor="#10b981"></stop>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"></stop>
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";
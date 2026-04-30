"use client";
import { useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ to, duration = 2, suffix = "", className }) => {
  const [hasInView, setHasInView] = useState(false);
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (current) => {
    return Math.floor(current).toLocaleString() + suffix;
  });

  return (
    <motion.span
      className={className}
      onViewportEnter={() => {
        if (!hasInView) {
          setHasInView(true);
          springValue.set(to);
        }
      }}
      viewport={{ once: false, margin: "-50px" }}
    >
      {displayValue}
    </motion.span>
  );
};

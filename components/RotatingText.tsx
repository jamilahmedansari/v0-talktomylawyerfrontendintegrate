'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
}

export default function RotatingText({ texts, rotationInterval = 2000, className = '' }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (texts.length === 0) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts, rotationInterval]);
  return (
    <span className={`inline-block relative h-8 ${className}`}> 
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          className="block absolute left-0 right-0"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

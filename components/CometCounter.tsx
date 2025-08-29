'use client';

import { motion } from 'framer-motion';

interface CometCounterProps {
  count: number;
}

/**
 * CometCounter shows a circular counter with a comet (a dot with tail) orbiting
 * around the border.  The count is displayed in the center.
 */
export default function CometCounter({ count }: CometCounterProps) {
  return (
    <div className="relative flex items-center justify-center w-40 h-40 border-4 border-indigo-500 rounded-full text-3xl font-bold">
      {count}
      <motion.div
        className="absolute w-3 h-3 bg-indigo-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        style={{ originX: 2.5, originY: 2.5 }}
      />
    </div>
  );
}

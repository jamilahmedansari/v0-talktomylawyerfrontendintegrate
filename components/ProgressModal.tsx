'use client';

import { motion } from 'framer-motion';

interface ProgressModalProps {
  progress: number;
  message: string;
}

export default function ProgressModal({ progress, message }: ProgressModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Generating Letter</h2>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <motion.div
            className="bg-indigo-500 h-3 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">{progress}% - {message}</p>
      </motion.div>
    </div>
  );
}

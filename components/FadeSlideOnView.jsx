"use client"
import React, { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, x: -120 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -120 },
};

const FadeSlideOnView = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-50px 0px', once: false });

  return (
    <div ref={ref} style={{ minHeight: '1px' }}>
      <AnimatePresence>
        {isInView && (
          <motion.div
            key="content"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FadeSlideOnView;

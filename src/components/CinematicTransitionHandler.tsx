import React from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface CinematicTransitionHandlerProps {
  children: React.ReactNode;
}

const pageTurnVariants: Variants = {
  initial: {
    x: '100%', // Start off-screen to the right
    opacity: 0,
  },
  animate: {
    x: '0%',   // Slide into view from the right
    opacity: 1,
    transition: {
      duration: 0.8, // A slightly longer duration for a "luxurious" feel
      ease: [0.76, 0, 0.24, 1], // Custom ease-in-out cubic bezier
    },
  },
  exit: {
    x: '-100%', // Slide off-screen to the left
    opacity: 0,
    transition: {
      duration: 0.6, // Exit can be slightly faster
      ease: [0.76, 0, 0.24, 1], // Custom ease-in-out cubic bezier
    },
  },
};

const CinematicTransitionHandler: React.FC<CinematicTransitionHandlerProps> = ({ children }) => {
  const location = useLocation();
  console.log('CinematicTransitionHandler loaded for path:', location.pathname);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/*
        The key={location.pathname} is crucial. It tells AnimatePresence
        that the child component has changed when the route (pathname) changes,
        triggering the exit/enter animations.
        The parent of this component (or where Outlet is rendered) should have
        position: 'relative' and manage overflow if necessary.
      */}
      <motion.div
        key={location.pathname}
        variants={pageTurnVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'absolute', // Essential for smooth in-place transitions
          width: '100%',
          height: '100%', // Assumes the container manages its height (e.g., 100vh or specific content height)
          top: 0,
          left: 0,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default CinematicTransitionHandler;
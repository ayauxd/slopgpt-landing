import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { type ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
            filter: 'blur(10px)',
          },
          animate: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }
          },
          exit: {
            opacity: 0,
            filter: 'blur(10px)',
            transition: {
              duration: 0.2,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }
        }}
        className="page-transition-wrapper"
      >
        {/* Glitch effect overlay */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-[9999]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0, 0.5, 0],
          }}
          transition={{
            duration: 0.4,
            times: [0, 0.2, 0.4, 0.6, 1],
            ease: "easeInOut"
          }}
          style={{
            background: `repeating-linear-gradient(
              0deg,
              rgba(255, 107, 53, 0.1) 0px,
              rgba(0, 255, 159, 0.1) 2px,
              rgba(255, 0, 255, 0.1) 4px
            )`,
            mixBlendMode: 'overlay'
          }}
        />

        {children}
      </motion.div>
    </AnimatePresence>
  )
}

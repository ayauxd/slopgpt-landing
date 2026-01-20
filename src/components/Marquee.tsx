import { motion } from 'framer-motion'
import { useState } from 'react'

interface MarqueeProps {
  items: string[]
  speed?: number // Duration for one loop in seconds
  pauseOnHover?: boolean
}

export function Marquee({ items, speed = 30, pauseOnHover = true }: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items]

  // Color variants for tags (meme-native palette)
  const colorVariants = [
    'bg-slop/20 text-slop border-slop/40',
    'bg-chaos/20 text-chaos border-chaos/40',
    'bg-unhinged/20 text-unhinged border-unhinged/40',
    'bg-cream/10 text-cream border-cream/30'
  ]

  return (
    <div className="relative overflow-hidden py-6">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{
          x: isPaused ? 0 : [0, '-50%']
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }}
        onHoverStart={() => pauseOnHover && setIsPaused(true)}
        onHoverEnd={() => pauseOnHover && setIsPaused(false)}
      >
        {duplicatedItems.map((item, index) => (
          <motion.div
            key={index}
            className={`
              px-6 py-3 rounded-full border-2
              font-accent text-lg
              ${colorVariants[index % colorVariants.length]}
              backdrop-blur-sm
              transition-all duration-200
              cursor-pointer
            `}
            whileHover={{
              scale: 1.05,
              rotate: Math.random() > 0.5 ? 2 : -2,
              transition: { type: 'spring', stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

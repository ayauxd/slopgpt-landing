import { motion } from 'framer-motion'
import { useState } from 'react'

interface GlitchTextProps {
  children: string
  intensity?: 'subtle' | 'medium' | 'chaos'
  className?: string
}

export function GlitchText({ children, intensity = 'medium', className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  // Glitch intensity settings
  const intensitySettings = {
    subtle: { offset: 2, duration: 0.2, iterations: 2 },
    medium: { offset: 4, duration: 0.3, iterations: 3 },
    chaos: { offset: 8, duration: 0.5, iterations: 5 }
  }

  const settings = intensitySettings[intensity]

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onHoverStart={() => setIsGlitching(true)}
      onHoverEnd={() => setIsGlitching(false)}
      style={{ display: 'inline-block' }}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers - only visible on hover */}
      {isGlitching && (
        <>
          {/* Red channel shift */}
          <motion.span
            className="absolute inset-0 text-red-500 mix-blend-screen pointer-events-none"
            aria-hidden="true"
            animate={{
              x: [0, -settings.offset, settings.offset, -settings.offset, 0],
              opacity: [0.8, 0.9, 0.7, 0.9, 0.8]
            }}
            transition={{
              duration: settings.duration,
              repeat: settings.iterations,
              ease: 'linear'
            }}
          >
            {children}
          </motion.span>

          {/* Cyan channel shift */}
          <motion.span
            className="absolute inset-0 text-cyan-400 mix-blend-screen pointer-events-none"
            aria-hidden="true"
            animate={{
              x: [0, settings.offset, -settings.offset, settings.offset, 0],
              opacity: [0.8, 0.7, 0.9, 0.7, 0.8]
            }}
            transition={{
              duration: settings.duration,
              repeat: settings.iterations,
              ease: 'linear',
              delay: 0.05
            }}
          >
            {children}
          </motion.span>

          {/* Static noise overlay */}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay'
            }}
            animate={{
              opacity: [0, 0.3, 0, 0.4, 0]
            }}
            transition={{
              duration: settings.duration * 0.5,
              repeat: settings.iterations * 2,
              ease: 'linear'
            }}
          />
        </>
      )}
    </motion.span>
  )
}

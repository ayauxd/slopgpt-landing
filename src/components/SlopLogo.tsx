import { motion } from 'framer-motion'

interface SlopLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  className?: string
}

const sizeClasses = {
  sm: { slop: 'text-2xl', gpt: 'text-xl' },
  md: { slop: 'text-4xl', gpt: 'text-3xl' },
  lg: { slop: 'text-5xl', gpt: 'text-4xl' },
  xl: { slop: 'text-6xl', gpt: 'text-5xl' },
}

/**
 * SlopLogo - Text-based logo with chaotic "Slop" and clean "GPT"
 *
 * "Slop" uses Shantell Sans (handwritten, wobbly)
 * "GPT" uses Outfit (clean, modern)
 */
export function SlopLogo({ size = 'md', animate = true, className = '' }: SlopLogoProps) {
  const sizes = sizeClasses[size]

  return (
    <div className={`flex items-baseline gap-0.5 ${className}`}>
      {/* Slop - chaotic handwritten style */}
      <motion.span
        className={`${sizes.slop} font-accent select-none`}
        style={{
          fontWeight: 700,
          color: '#FF6B35',
          transform: 'rotate(-3deg)',
          textShadow: '2px 2px 0 rgba(255,0,255,0.3), -1px -1px 0 rgba(0,255,159,0.2)',
          letterSpacing: '-0.02em',
        }}
        animate={animate ? {
          rotate: [-3, -2, -4, -3],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.05,
          rotate: [-5, 5, -3],
          transition: { duration: 0.3 }
        }}
      >
        Slop
      </motion.span>

      {/* GPT - clean modern style */}
      <span
        className={`${sizes.gpt} font-display font-bold text-cream tracking-tight select-none`}
        style={{
          letterSpacing: '-0.03em',
        }}
      >
        GPT
      </span>
    </div>
  )
}

export default SlopLogo

import { motion } from 'framer-motion'

interface SlopLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  animate?: boolean
  className?: string
}

const sizeConfig = {
  sm: {
    slopHeight: 32,
    gptSize: 'text-lg',
    gptOffset: '-ml-3',
    gptBottom: 'bottom-0'
  },
  md: {
    slopHeight: 44,
    gptSize: 'text-2xl',
    gptOffset: '-ml-4',
    gptBottom: 'bottom-0'
  },
  lg: {
    slopHeight: 60,
    gptSize: 'text-3xl',
    gptOffset: '-ml-5',
    gptBottom: 'bottom-0'
  },
  xl: {
    slopHeight: 80,
    gptSize: 'text-4xl',
    gptOffset: '-ml-6',
    gptBottom: 'bottom-1'
  },
  hero: {
    slopHeight: 110,
    gptSize: 'text-5xl md:text-6xl',
    gptOffset: '-ml-8',
    gptBottom: 'bottom-1'
  },
}

/**
 * SlopLogo - Unified brand logo
 *
 * "SLOP" = Bubble letter image (transparent bg)
 * "GPT" = Bold text in brand orange, overlapping the P
 *
 * The GPT sits slightly over the end of SLOP for a cohesive,
 * intentional lockup rather than two separate elements.
 */
export function SlopLogo({ size = 'md', animate = true, className = '' }: SlopLogoProps) {
  const config = sizeConfig[size]

  return (
    <div className={`relative flex items-end select-none ${className}`}>
      {/* SLOP - Bubble letter image */}
      <motion.img
        src="/logo/slop-transparent.png"
        alt="Slop"
        height={config.slopHeight}
        className="relative z-10"
        style={{
          height: config.slopHeight,
          width: 'auto',
        }}
        animate={animate ? {
          rotate: [-0.5, 0.5, -0.5],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.2 }
        }}
        draggable={false}
      />

      {/* GPT - Overlapping the end of SLOP */}
      <motion.span
        className={`
          ${config.gptSize}
          ${config.gptOffset}
          ${config.gptBottom}
          relative z-20
          font-bold
          tracking-tight
        `}
        style={{
          fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
          letterSpacing: '-0.04em',
          color: '#FF6B35', // Brand orange
          textShadow: '2px 2px 0 #1a1a1a, -1px -1px 0 #1a1a1a, 1px -1px 0 #1a1a1a, -1px 1px 0 #1a1a1a',
        }}
        animate={animate ? {
          y: [0, -1, 0],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        GPT
      </motion.span>
    </div>
  )
}

export default SlopLogo

import { motion } from 'framer-motion'

interface SlopLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  animate?: boolean
  className?: string
}

const sizeConfig = {
  sm: {
    slopHeight: 36,  // Slightly larger for visibility
    gptSize: 'text-lg',
    gptOffset: '-ml-1',
  },
  md: {
    slopHeight: 48,
    gptSize: 'text-2xl',
    gptOffset: '-ml-1',
  },
  lg: {
    slopHeight: 64,
    gptSize: 'text-3xl',
    gptOffset: '-ml-2',
  },
  xl: {
    slopHeight: 88,
    gptSize: 'text-4xl',
    gptOffset: '-ml-2',
  },
  hero: {
    slopHeight: 120,
    gptSize: 'text-5xl md:text-6xl',
    gptOffset: '-ml-3',
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
        src="/logo/slop-transparent.webp"
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

      {/* GPT - Slightly overlapping, not covering the P */}
      <motion.span
        className={`
          ${config.gptSize}
          ${config.gptOffset}
          relative z-20
          font-bold
          tracking-tight
          self-end
          pb-1
        `}
        style={{
          fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
          letterSpacing: '-0.02em',
          color: '#FF8A5B', // Brighter orange for better contrast
          textShadow: '2px 2px 0 #0D0D0D, -1px -1px 0 #0D0D0D, 1px -1px 0 #0D0D0D, -1px 1px 0 #0D0D0D',
          WebkitTextStroke: '1px #0D0D0D',
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

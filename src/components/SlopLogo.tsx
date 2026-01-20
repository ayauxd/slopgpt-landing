import { motion } from 'framer-motion'

interface SlopLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  animate?: boolean
  className?: string
  variant?: 'dark' | 'light'
}

const sizeConfig = {
  sm: { height: 24, fontSize: 'text-xl' },
  md: { height: 32, fontSize: 'text-2xl' },
  lg: { height: 40, fontSize: 'text-3xl' },
  xl: { height: 48, fontSize: 'text-4xl' },
  hero: { height: 56, fontSize: 'text-5xl md:text-6xl' },
}

/**
 * SlopLogo - Clean wordmark
 * Professional, minimal, Inter font
 */
export function SlopLogo({ size = 'md', animate = false, className = '', variant = 'light' }: SlopLogoProps) {
  const config = sizeConfig[size]
  const textColor = variant === 'dark' ? 'text-white' : 'text-neutral-900'

  return (
    <motion.div
      className={`flex items-center select-none ${className}`}
      whileHover={animate ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      <span
        className={`${config.fontSize} ${textColor} font-semibold tracking-tight`}
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          letterSpacing: '-0.02em',
        }}
      >
        slopgpt
      </span>
    </motion.div>
  )
}

export default SlopLogo

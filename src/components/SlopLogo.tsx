import { motion } from 'framer-motion'

interface SlopLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  animate?: boolean
  className?: string
}

// Unified logo - single image contains "SLOPGPT" in drippy 3D style
// Larger sizes for brand prominence per design best practices (40-60px header minimum)
const sizeConfig = {
  sm: { imgHeight: 32 },   // Footer, small contexts
  md: { imgHeight: 44 },   // Header nav - prominent but balanced
  lg: { imgHeight: 56 },   // Emphasized header
  xl: { imgHeight: 72 },   // Large feature areas
  hero: { imgHeight: 120 }, // Hero section - dominant brand presence
}

/**
 * SlopLogo - Unified 3D drippy "SLOPGPT" logo
 * Single transparent PNG, no separate text elements
 */
export function SlopLogo({ size = 'md', animate = false, className = '' }: SlopLogoProps) {
  const config = sizeConfig[size]

  return (
    <motion.div
      className={`flex items-center select-none ${className}`}
      whileHover={animate ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      <img
        src="/logo/slopgpt-unified.png"
        alt="SlopGPT"
        style={{ height: config.imgHeight }}
        className="object-contain"
        draggable={false}
      />
    </motion.div>
  )
}

export default SlopLogo

import { motion } from 'framer-motion'

interface SlopLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  animate?: boolean
  className?: string
  variant?: 'dark' | 'light'
}

const sizeConfig = {
  sm: { imgHeight: 28, gptSize: 'text-sm', gptOffset: '-ml-1' },
  md: { imgHeight: 36, gptSize: 'text-base', gptOffset: '-ml-1' },
  lg: { imgHeight: 44, gptSize: 'text-lg', gptOffset: '-ml-2' },
  xl: { imgHeight: 52, gptSize: 'text-xl', gptOffset: '-ml-2' },
  hero: { imgHeight: 72, gptSize: 'text-2xl md:text-3xl', gptOffset: '-ml-3' },
}

/**
 * SlopLogo - 3D drippy SLOP blob + gpt text
 */
export function SlopLogo({ size = 'md', animate = false, className = '', variant = 'light' }: SlopLogoProps) {
  const config = sizeConfig[size]
  const gptColor = variant === 'dark' ? 'text-white' : 'text-neutral-700'

  return (
    <motion.div
      className={`flex items-end select-none ${className}`}
      whileHover={animate ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      <img
        src="/logo/slop-blob-v2.webp"
        alt="SLOP"
        style={{ height: config.imgHeight }}
        className="object-contain"
      />
      <span
        className={`${config.gptSize} ${gptColor} ${config.gptOffset} font-bold tracking-tight pb-[2px]`}
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        gpt
      </span>
    </motion.div>
  )
}

export default SlopLogo

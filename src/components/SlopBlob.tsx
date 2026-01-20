import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

export type BlobExpression = 'default' | 'thinking' | 'excited' | 'error' | 'sneaky'
export type BlobSize = 'sm' | 'md' | 'lg' | 'xl'

interface SlopBlobProps {
  expression?: BlobExpression
  size?: BlobSize
  animate?: boolean
  followCursor?: boolean
  className?: string
  interactive?: boolean  // Allow clicking to change expression
  onPoke?: (expression: BlobExpression) => void  // Callback when poked
}

// Size mappings in pixels
const sizeMap: Record<BlobSize, number> = {
  sm: 80,
  md: 120,
  lg: 200,
  xl: 300,
}

// Expression viewBox coordinates from the expression sheet SVG
const expressionViewBoxes: Record<BlobExpression, string> = {
  default: '20 20 120 180',
  thinking: '170 20 120 180',
  excited: '320 20 120 180',
  error: '470 20 120 180',
  sneaky: '620 20 120 180',
}

/**
 * SlopBlob - The chaotic, friendly mascot component
 *
 * Features:
 * - Multiple expressions (default, thinking, excited, error, sneaky)
 * - Variable sizes (sm, md, lg, xl)
 * - Optional wobble animation
 * - Optional cursor following
 */
// Expression cycle order for poking
const expressionCycle: BlobExpression[] = ['default', 'excited', 'sneaky', 'thinking', 'error']

export function SlopBlob({
  expression = 'default',
  size = 'md',
  animate = true,
  followCursor = false,
  className = '',
  interactive = false,
  onPoke,
}: SlopBlobProps) {
  const shouldReduceMotion = useReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [blobPosition, setBlobPosition] = useState({ x: 0, y: 0 })
  const [currentExpression, setCurrentExpression] = useState<BlobExpression>(expression)
  const [isSquished, setIsSquished] = useState(false)

  // Update expression when prop changes (if not interactive)
  useEffect(() => {
    if (!interactive) {
      setCurrentExpression(expression)
    }
  }, [expression, interactive])

  // Handle poke interaction
  const handlePoke = () => {
    if (!interactive) return

    // Squish animation
    setIsSquished(true)
    setTimeout(() => setIsSquished(false), 150)

    // Cycle to next expression
    const currentIndex = expressionCycle.indexOf(currentExpression)
    const nextIndex = (currentIndex + 1) % expressionCycle.length
    const nextExpression = expressionCycle[nextIndex]
    setCurrentExpression(nextExpression)

    onPoke?.(nextExpression)
  }

  // Use current expression (for interactive mode) or prop
  const activeExpression = interactive ? currentExpression : expression

  const pixelSize = sizeMap[size]

  // Cursor following logic
  useEffect(() => {
    if (!followCursor || shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [followCursor, shouldReduceMotion])

  // Smooth blob position animation
  useEffect(() => {
    if (!followCursor || shouldReduceMotion) return

    const interval = setInterval(() => {
      setBlobPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }))
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [followCursor, mousePosition, shouldReduceMotion])

  // Wobble animation keyframes
  const wobbleAnimation = {
    rotate: animate && !shouldReduceMotion ? [0, -1, 1, -1, 0] : 0,
    scale: isSquished ? 0.85 : (animate && !shouldReduceMotion ? [1, 1.02, 0.98, 1.02, 1] : 1),
    scaleY: isSquished ? 0.7 : 1,
    scaleX: isSquished ? 1.15 : 1,
    transition: isSquished
      ? { duration: 0.1, ease: 'easeOut' as const }
      : {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
  }

  const containerStyle = followCursor
    ? {
        position: 'fixed' as const,
        left: blobPosition.x,
        top: blobPosition.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none' as const,
        zIndex: 9999,
      }
    : {}

  return (
    <motion.div
      style={{
        ...containerStyle,
        cursor: interactive ? 'pointer' : 'default',
      }}
      className={className}
      animate={wobbleAnimation}
      onClick={handlePoke}
      whileHover={interactive && !shouldReduceMotion ? { scale: 1.1 } : {}}
      whileTap={interactive && !shouldReduceMotion ? { scale: 0.9 } : {}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={expressionViewBoxes[activeExpression]}
        width={pixelSize}
        height={pixelSize}
        style={{ display: 'block' }}
      >
        <defs>
          <filter id={`goo-${activeExpression}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
          </filter>
          <linearGradient id={`blobGrad-${activeExpression}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FF6B35' }} />
            <stop offset="50%" style={{ stopColor: '#FF00FF' }} />
            <stop offset="100%" style={{ stopColor: '#00FF9F' }} />
          </linearGradient>
        </defs>

        {/* Default Expression */}
        {activeExpression === 'default' && (
          <g>
            <g filter={`url(#goo-${activeExpression})`}>
              <ellipse cx="60" cy="100" rx="45" ry="40" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="35" cy="95" r="18" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="85" cy="90" r="15" fill={`url(#blobGrad-${activeExpression})`} />
              <ellipse cx="45" cy="135" rx="6" ry="12" fill="#FF6B35" />
              <ellipse cx="75" cy="140" rx="5" ry="15" fill="#FF6B35" />
            </g>
            <ellipse cx="45" cy="90" rx="12" ry="14" fill="#FFFEF0" />
            <circle cx="48" cy="93" r="7" fill="#0D0D0D" />
            <circle cx="50" cy="90" r="2" fill="#FFFEF0" />
            <ellipse cx="75" cy="88" rx="10" ry="12" fill="#FFFEF0" />
            <circle cx="73" cy="90" r="6" fill="#0D0D0D" />
            <circle cx="71" cy="87" r="2" fill="#FFFEF0" />
            <path d="M 40 110 Q 60 125, 80 108" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* Thinking Expression */}
        {activeExpression === 'thinking' && (
          <g>
            <g filter={`url(#goo-${activeExpression})`}>
              <ellipse cx="60" cy="100" rx="45" ry="40" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="35" cy="95" r="18" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="85" cy="90" r="15" fill={`url(#blobGrad-${activeExpression})`} />
              <ellipse cx="50" cy="138" rx="7" ry="10" fill="#FF6B35" />
            </g>
            <path d="M 35 90 Q 45 85, 55 90" stroke="#0D0D0D" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 65 88 Q 75 83, 85 88" stroke="#0D0D0D" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 42 112 Q 50 108, 58 112 Q 66 116, 74 112" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="100" cy="60" r="4" fill="#666" opacity="0.5" />
            <circle cx="110" cy="50" r="6" fill="#666" opacity="0.5" />
            <circle cx="125" cy="40" r="8" fill="#666" opacity="0.5" />
          </g>
        )}

        {/* Excited Expression */}
        {activeExpression === 'excited' && (
          <g>
            <g filter={`url(#goo-${activeExpression})`}>
              <ellipse cx="60" cy="95" rx="48" ry="45" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="30" cy="90" r="20" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="90" cy="85" r="18" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="60" cy="130" r="15" fill={`url(#blobGrad-${activeExpression})`} />
              <ellipse cx="35" cy="145" rx="8" ry="18" fill="#FF6B35" />
              <ellipse cx="85" cy="148" rx="6" ry="20" fill="#FF6B35" />
              <ellipse cx="60" cy="150" rx="7" ry="15" fill="#FF6B35" />
            </g>
            <ellipse cx="42" cy="85" rx="14" ry="16" fill="#FFFEF0" />
            <circle cx="45" cy="85" r="10" fill="#0D0D0D" />
            <circle cx="48" cy="82" r="4" fill="#FFFEF0" />
            <ellipse cx="78" cy="82" rx="12" ry="14" fill="#FFFEF0" />
            <circle cx="76" cy="82" r="9" fill="#0D0D0D" />
            <circle cx="73" cy="79" r="3" fill="#FFFEF0" />
            <path d="M 38 108 Q 60 130, 82 108" stroke="#0D0D0D" strokeWidth="3" fill="#0D0D0D" />
            <text x="10" y="60" fontSize="16">✨</text>
            <text x="100" y="55" fontSize="14">⚡</text>
            <text x="5" y="120" fontSize="12">💫</text>
          </g>
        )}

        {/* Error Expression */}
        {activeExpression === 'error' && (
          <g>
            <g filter={`url(#goo-${activeExpression})`}>
              <ellipse cx="60" cy="100" rx="45" ry="40" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="35" cy="95" r="18" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="85" cy="90" r="15" fill={`url(#blobGrad-${activeExpression})`} />
              <ellipse cx="70" cy="140" rx="8" ry="12" fill="#FF6B35" />
            </g>
            <g stroke="#0D0D0D" strokeWidth="4" strokeLinecap="round">
              <line x1="38" y1="82" x2="52" y2="96" />
              <line x1="52" y1="82" x2="38" y2="96" />
              <line x1="68" y1="80" x2="82" y2="94" />
              <line x1="82" y1="80" x2="68" y2="94" />
            </g>
            <path d="M 40 115 Q 45 110, 50 115 Q 55 120, 60 115 Q 65 110, 70 115 Q 75 120, 80 115" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round" />
            <text x="95" y="70" fontSize="20" fill="#FF0000">!</text>
            <text x="15" y="75" fontSize="14" fill="#FF0000">⚠️</text>
          </g>
        )}

        {/* Sneaky Expression */}
        {activeExpression === 'sneaky' && (
          <g>
            <g filter={`url(#goo-${activeExpression})`}>
              <ellipse cx="60" cy="100" rx="45" ry="40" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="35" cy="95" r="18" fill={`url(#blobGrad-${activeExpression})`} />
              <circle cx="85" cy="90" r="15" fill={`url(#blobGrad-${activeExpression})`} />
              <ellipse cx="40" cy="138" rx="6" ry="10" fill="#FF6B35" />
              <ellipse cx="80" cy="142" rx="5" ry="12" fill="#FF6B35" />
            </g>
            <ellipse cx="45" cy="90" rx="12" ry="8" fill="#FFFEF0" />
            <ellipse cx="48" cy="91" rx="8" ry="5" fill="#0D0D0D" />
            <ellipse cx="75" cy="88" rx="10" ry="7" fill="#FFFEF0" />
            <ellipse cx="73" cy="89" rx="7" ry="4" fill="#0D0D0D" />
            <path d="M 45 110 Q 65 115, 80 105" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 65 75 Q 75 70, 85 75" stroke="#0D0D0D" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </motion.div>
  )
}

export default SlopBlob

import { motion, useReducedMotion } from 'motion/react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}

/** Entrada discreta (fade + 12px). Desligada com prefers-reduced-motion. */
export function Reveal({ children, delay = 0, className, y = 12 }: RevealProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

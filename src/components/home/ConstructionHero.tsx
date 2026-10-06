import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useFrameSequence } from '@/hooks/useFrameSequence'
import { Button } from '@/components/ui/Button'
import { MESSAGES, whatsappUrl } from '@/utils/whatsapp'
import { track } from '@/utils/analytics'

const PHASES = [
  { until: 0.3, label: 'Fundação' },
  { until: 0.62, label: 'Estrutura' },
  { until: 0.9, label: 'Acabamento' },
  { until: 1.01, label: 'Pronta' },
] as const

const phaseAt = (p: number): number => PHASES.findIndex((ph) => p < ph.until)

/**
 * Hero em scroll: a casa é construída conforme a rolagem (e desmontada ao voltar).
 * A seção é alta e o palco fica `sticky`; nada trava a roda do mouse.
 */
export function ConstructionHero() {
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const probe = useFrameSequence({ progress: scrollYProgress, enabled: true })
  const isStatic = probe.strategy?.mode === 'static'

  const [phase, setPhase] = useState(0)
  const [done, setDone] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = phaseAt(p)
    setPhase((cur) => (cur === next ? cur : next))
    setDone((cur) => (cur === p > 0.9 ? cur : p > 0.9))
  })

  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.2], [0, -24])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const finalOpacity = useTransform(scrollYProgress, [0.84, 0.96], [0, 1])
  const finalY = useTransform(scrollYProgress, [0.84, 0.96], [20, 0])
  const barScale = useTransform(scrollYProgress, [0, 0.98], [0, 1])
  const chromeOpacity = useTransform(scrollYProgress, [0.88, 0.96], [1, 0])

  const finalBlock = (
    <>
      <h2 className="display max-w-[16ch] text-white">Encontre um lugar para chamar de seu.</h2>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button as={Link} to="/imoveis" $variant="light" $size="lg" onClick={() => track('contact_click', { origin: 'hero' })}>
          Explorar imóveis
          <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
        </Button>
        <Button
          as="a"
          href={whatsappUrl(MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          $variant="ghost"
          $size="lg"
          className="!text-white hover:!bg-white/10"
          onClick={() => track('whatsapp_click', { origin: 'hero' })}
        >
          <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
          Falar no WhatsApp
        </Button>
      </div>
    </>
  )

  const poster = (
    <picture>
      <source media="(max-width: 767px)" srcSet="/frames/m/0001.webp" />
      <img
        src="/frames/poster.webp"
        alt="Terreno em obra no centro de uma quadra, com a fundação de uma casa em andamento"
        width={960}
        height={540}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
    </picture>
  )

  if (isStatic) {
    // Reduced motion / conexão lenta: casa pronta, sem animação nem rolagem presa.
    return (
      <section aria-label="Apresentação" className="on-dark relative isolate flex min-h-[640px] h-[100svh] items-end overflow-hidden bg-brand-deep">
        <picture>
          <source media="(max-width: 767px)" srcSet="/frames/m/0061.webp" />
          <img src="/frames/d/0120.webp" alt="Casa moderna de dois pavimentos, pronta, em esquina residencial" className="absolute inset-0 -z-10 size-full object-cover" />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-deep/80 via-brand-deep/20 to-transparent" />
        <h1 className="sr-only">Mais Imóveis Jaú — imobiliária em Jaú/SP</h1>
        <div className="container-site pb-[12vh]">{finalBlock}</div>
      </section>
    )
  }

  return (
    <section ref={section} aria-label="Apresentação" className="on-dark relative h-[320svh] bg-brand-deep md:h-[400svh]">
      <div className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden">
        {poster}
        <canvas
          ref={probe.canvasRef}
          aria-hidden
          className="absolute inset-0 size-full transition-opacity duration-500"
          style={{ opacity: probe.firstDrawn ? 1 : 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/25 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-deep/25 to-transparent" aria-hidden />

        <div className="container-site absolute inset-x-0 bottom-0 pb-[calc(8vh+env(safe-area-inset-bottom))] md:pb-[11vh]">
          <motion.h1
            style={{ opacity: introOpacity, y: introY }}
            className="display absolute bottom-[calc(8vh+env(safe-area-inset-bottom))] max-w-[14ch] text-white md:bottom-[11vh]"
          >
            Seu próximo capítulo começa aqui.
          </motion.h1>

          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            // inert: fora de vista, não recebe foco nem leitor de tela
            inert={!done}
            className="relative"
          >
            {finalBlock}
          </motion.div>
        </div>

        {/* Indicador de etapa — discreto, some quando a casa fica pronta */}
        <motion.div
          style={{ opacity: chromeOpacity }}
          aria-hidden
          className="container-site absolute inset-x-0 top-[5.5rem] flex items-center gap-4 text-xs font-medium uppercase tracking-[0.16em] text-white/85 md:top-auto md:bottom-7"
        >
          <span className="w-[5.5rem]">{PHASES[Math.max(phase, 0)].label}</span>
          <span className="relative h-px w-24 bg-white/25 md:w-40">
            <motion.span style={{ scaleX: barScale }} className="absolute inset-0 origin-left bg-gold" />
          </span>
          <motion.span style={{ opacity: cueOpacity }} className="hidden text-white/70 sm:inline">
            Role para construir
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'

type Mode = 'sequence' | 'static'

export interface FrameConfig {
  /** Prefixo público dos arquivos (ex.: "/frames/d") */
  base: string
  count: number
}

const pad = (n: number) => String(n).padStart(4, '0')

interface NetworkInformationLike {
  saveData?: boolean
  effectiveType?: string
}

/**
 * Decide a estratégia de acordo com o dispositivo:
 *  - reduced-motion / Save-Data / 2G-3G  → imagem estática (último frame)
 *  - celular                              → set vertical menor (61 frames)
 *  - desktop fraco (≤2 núcleos / ≤2 GB)   → 1 de cada 2 frames
 *  - demais                               → 120 frames
 */
export function pickStrategy(): { mode: Mode; config: FrameConfig; step: number } {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  const slow = Boolean(conn?.saveData) || /(^|-)(2g|3g)$/.test(conn?.effectiveType ?? '')
  const mobile = window.matchMedia('(max-width: 767px)').matches
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const weak = (navigator.hardwareConcurrency ?? 8) <= 2 || (memory !== undefined && memory <= 2)

  const config: FrameConfig = mobile ? { base: '/frames/m', count: 61 } : { base: '/frames/d', count: 120 }
  return { mode: reduce || slow ? 'static' : 'sequence', config, step: !mobile && weak ? 2 : 1 }
}

/** Ordem de carregamento: primeiro, último e então refinamento progressivo (32→16→8→4→2→1). */
function loadOrder(count: number, step: number): number[] {
  const seen = new Set<number>()
  const out: number[] = []
  const push = (i: number) => {
    if (i >= 0 && i < count && !seen.has(i)) {
      seen.add(i)
      out.push(i)
    }
  }
  push(0)
  push(count - 1)
  for (const s of [32, 16, 8, 4, 2, 1]) {
    if (s < step) continue
    for (let i = 0; i < count; i += s) if (i % step === 0) push(i)
  }
  push(count - 1)
  return out
}

interface Options {
  /** Progresso de 0 a 1 (ex.: de useScroll). */
  progress: { get: () => number; on: (e: 'change', cb: (v: number) => void) => () => void }
  enabled: boolean
}

/**
 * Sequência de imagens guiada por scroll, desenhada em <canvas>.
 *  - preload progressivo com concorrência limitada;
 *  - sempre desenha o frame carregado mais próximo do alvo;
 *  - requestAnimationFrame com suavização leve, sem bloquear o scroll.
 */
export function useFrameSequence({ progress, enabled }: Options) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(0)
  const [firstDrawn, setFirstDrawn] = useState(false)
  const [strategy] = useState(() => (typeof window === 'undefined' ? null : pickStrategy()))

  const images = useRef<(HTMLImageElement | undefined)[]>([])
  const current = useRef(0)
  const raf = useRef(0)
  const drawn = useRef(-1)

  const draw = useCallback(
    (force = false) => {
      const canvas = canvasRef.current
      if (!canvas || !strategy) return
      const { config } = strategy
      const target = progress.get() * (config.count - 1)
      current.current += (target - current.current) * 0.22
      if (Math.abs(target - current.current) < 0.02) current.current = target

      let idx = Math.round(current.current)
      let img: HTMLImageElement | undefined
      for (let d = 0; d < config.count && !img; d++) {
        img = images.current[idx - d] ?? images.current[idx + d]
        if (img) idx = images.current[idx - d] ? idx - d : idx + d
      }

      if (img && (force || drawn.current !== idx)) {
        const ctx = canvas.getContext('2d', { alpha: false })
        if (ctx) {
          const cw = canvas.width
          const ch = canvas.height
          const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
          const w = img.naturalWidth * scale
          const h = img.naturalHeight * scale
          ctx.imageSmoothingQuality = 'high'
          ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
          drawn.current = idx
          setFirstDrawn((v) => v || true)
        }
      }
      if (current.current !== target) raf.current = requestAnimationFrame(() => draw())
    },
    [progress, strategy],
  )

  // Preload progressivo
  useEffect(() => {
    if (!enabled || !strategy || strategy.mode === 'static') return
    const { config, step } = strategy
    const order = loadOrder(config.count, step)
    let cancelled = false
    let cursor = 0
    let count = 0

    const worker = async () => {
      while (!cancelled && cursor < order.length) {
        const i = order[cursor++]
        const img = new Image()
        img.decoding = 'async'
        img.src = `${config.base}/${pad(i + 1)}.webp`
        try {
          await img.decode()
        } catch {
          continue
        }
        if (cancelled) return
        images.current[i] = img
        count++
        if (count <= 3 || count % 6 === 0) {
          setLoaded(count)
          drawNow()
        }
      }
    }
    const drawNow = () => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => draw(true))
    }

    const run = () => {
      const workers = Math.min(navigator.hardwareConcurrency ?? 4, 4)
      void Promise.all(Array.from({ length: workers }, worker)).then(() => {
        if (!cancelled) {
          setLoaded(count)
          drawNow()
        }
      })
    }
    // O primeiro frame começa já; o restante espera o navegador ficar ocioso.
    run()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf.current)
    }
  }, [enabled, strategy, draw])

  // Tamanho do canvas + resposta ao scroll
  useEffect(() => {
    const canvas = canvasRef.current
    if (!enabled || !canvas || strategy?.mode === 'static') return
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      draw(true)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const unsub = progress.on('change', () => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => draw())
    })
    return () => {
      ro.disconnect()
      unsub()
      cancelAnimationFrame(raf.current)
    }
  }, [enabled, progress, draw, strategy])

  return {
    canvasRef,
    strategy,
    firstDrawn,
    loadedRatio: strategy ? loaded / Math.ceil(strategy.config.count / strategy.step) : 0,
  }
}

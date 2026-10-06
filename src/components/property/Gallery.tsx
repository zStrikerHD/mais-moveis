import { useCallback, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'
import { thumb } from '@/utils/images'
import { cn } from '@/utils/cn'

interface Props {
  images: string[]
  alt: string
}

function SlideImage({ src, alt, eager, contain }: { src: string; alt: string; eager?: boolean; contain?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <Skeleton $h="100%" $r="0" className="absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn('size-full transition-opacity duration-300', contain ? 'object-contain' : 'object-cover', loaded ? 'opacity-100' : 'opacity-0')}
        draggable={false}
      />
    </>
  )
}

const navBtn =
  'grid size-11 place-items-center rounded-full bg-white/92 text-brand-deep backdrop-blur-[2px] transition-colors hover:bg-white disabled:opacity-0'

export function Gallery({ images, alt }: Props) {
  const [mainRef, main] = useEmblaCarousel({ loop: false })
  const [thumbsRef, thumbs] = useEmblaCarousel({ containScroll: 'keepSnaps', dragFree: true })
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const onSelect = useCallback(() => {
    if (!main) return
    const i = main.selectedScrollSnap()
    setIndex(i)
    thumbs?.scrollTo(i)
  }, [main, thumbs])

  useEffect(() => {
    if (!main) return
    onSelect()
    main.on('select', onSelect).on('reInit', onSelect)
    return () => {
      main.off('select', onSelect).off('reInit', onSelect)
    }
  }, [main, onSelect])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') main?.scrollPrev()
    if (e.key === 'ArrowRight') main?.scrollNext()
  }

  const last = images.length - 1

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-[var(--radius-lg)] bg-sand"
        role="region"
        aria-roledescription="galeria"
        aria-label={`Fotos: ${alt}`}
      >
        <div ref={mainRef} className="overflow-hidden" tabIndex={0} onKeyDown={onKey} aria-label="Use as setas do teclado para navegar pelas fotos">
          <ul className="flex">
            {images.map((src, i) => (
              <li key={src} className="relative aspect-[4/3] min-w-0 flex-[0_0_100%] sm:aspect-[16/10]" aria-label={`Foto ${i + 1} de ${images.length}`}>
                <button type="button" onClick={() => setLightbox(true)} className="absolute inset-0 cursor-zoom-in" aria-label="Ampliar foto" tabIndex={-1}>
                  <SlideImage src={src} alt={`${alt} — foto ${i + 1}`} eager={i === 0} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {images.length > 1 && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-3 right-3 hidden items-center justify-between sm:flex">
              <button type="button" className={cn(navBtn, 'pointer-events-auto')} onClick={() => main?.scrollPrev()} disabled={index === 0} aria-label="Foto anterior">
                <ArrowLeft size={19} strokeWidth={1.75} aria-hidden />
              </button>
              <button type="button" className={cn(navBtn, 'pointer-events-auto')} onClick={() => main?.scrollNext()} disabled={index === last} aria-label="Próxima foto">
                <ArrowRight size={19} strokeWidth={1.75} aria-hidden />
              </button>
            </div>
          </>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="num rounded-full bg-brand-deep/80 px-3 py-1.5 text-[0.8125rem] font-medium text-white" aria-live="polite">
            {index + 1} / {images.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-2 rounded-full bg-white/92 px-3.5 text-[0.8125rem] font-medium text-brand-deep transition-colors hover:bg-white"
        >
          <Expand size={15} strokeWidth={1.75} aria-hidden /> Ampliar
        </button>
      </div>

      {images.length > 1 && (
        <div ref={thumbsRef} className="mt-3 hidden overflow-hidden sm:block">
          <ul className="flex gap-2.5">
            {images.map((src, i) => (
              <li key={src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => main?.scrollTo(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'block h-16 w-24 overflow-hidden rounded-[var(--radius-sm)] border-2 transition-[border-color,opacity]',
                    i === index ? 'border-brand' : 'border-transparent opacity-65 hover:opacity-100',
                  )}
                >
                  <img src={thumb(src)} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Lightbox open={lightbox} onOpenChange={setLightbox} images={images} alt={alt} start={index} onIndex={(i) => main?.scrollTo(i, true)} />
    </div>
  )
}

function Lightbox({ open, onOpenChange, images, alt, start, onIndex }: { open: boolean; onOpenChange: (o: boolean) => void; images: string[]; alt: string; start: number; onIndex: (i: number) => void }) {
  const [ref, api] = useEmblaCarousel({ startIndex: start, loop: true })
  const [i, setI] = useState(start)

  useEffect(() => {
    if (!api) return
    const sync = () => {
      setI(api.selectedScrollSnap())
      onIndex(api.selectedScrollSnap())
    }
    api.on('select', sync)
    return () => {
      api.off('select', sync)
    }
  }, [api, onIndex])

  useEffect(() => {
    if (open && api) api.scrollTo(start, true)
  }, [open, api, start])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') api?.scrollPrev()
    if (e.key === 'ArrowRight') api?.scrollNext()
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[var(--z-lightbox)] bg-brand-deep/95" />
        <Dialog.Content
          onKeyDown={onKey}
          className="on-dark fixed inset-0 z-[var(--z-lightbox)] flex flex-col outline-none"
        >
          <Dialog.Title className="sr-only">Fotos: {alt}</Dialog.Title>
          <Dialog.Description className="sr-only">Use as setas para navegar e Esc para fechar.</Dialog.Description>
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <span className="num text-sm text-white/80">
              {i + 1} / {images.length}
            </span>
            <Dialog.Close aria-label="Fechar galeria" className="grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10">
              <X size={22} strokeWidth={1.6} />
            </Dialog.Close>
          </div>
          <div className="relative min-h-0 flex-1">
            <div ref={ref} className="h-full overflow-hidden">
              <ul className="flex h-full">
                {images.map((src, n) => (
                  <li key={src} className="relative h-full min-w-0 flex-[0_0_100%] px-2 sm:px-16">
                    <div className="relative size-full">
                      {Math.abs(n - i) <= 1 || n === images.length - 1 || i === images.length - 1 ? (
                        <SlideImage src={src} alt={`${alt} — foto ${n + 1}`} contain eager />
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={() => api?.scrollPrev()} aria-label="Foto anterior" className={cn(navBtn, 'absolute left-3 top-1/2 hidden -translate-y-1/2 sm:grid')}>
              <ArrowLeft size={20} strokeWidth={1.75} aria-hidden />
            </button>
            <button type="button" onClick={() => api?.scrollNext()} aria-label="Próxima foto" className={cn(navBtn, 'absolute right-3 top-1/2 hidden -translate-y-1/2 sm:grid')}>
              <ArrowRight size={20} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
          <div className="h-4" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

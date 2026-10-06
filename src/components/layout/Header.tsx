import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Heart, Menu, MessageCircle, Phone } from 'lucide-react'
import { nav, site } from '@/config/site'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { useFavorites } from '@/hooks/useFavorites'
import { MESSAGES, whatsappUrl } from '@/utils/whatsapp'
import { track } from '@/utils/analytics'
import { cn } from '@/utils/cn'

const Dock = styled.div`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: var(--z-header);
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem 0;
  pointer-events: none;
`

/** A "ilha": cápsula central, translúcida com blur mínimo, que compacta no scroll. */
const Island = styled.div<{ $compact: boolean }>`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  max-width: ${(p) => (p.$compact ? '890px' : '960px')};
  padding: ${(p) => (p.$compact ? '0.375rem 0.5rem 0.375rem 1.125rem' : '0.5rem 0.5rem 0.5rem 1.25rem')};
  border-radius: var(--radius-pill);
  background: rgb(251 249 245 / 0.88);
  backdrop-filter: blur(10px) saturate(1.15);
  -webkit-backdrop-filter: blur(10px) saturate(1.15);
  border: 1px solid rgb(20 33 61 / 0.09);
  box-shadow: 0 1px 2px rgb(20 33 61 / 0.04);
  transition:
    max-width var(--dur-slow) var(--ease-out-expo),
    padding var(--dur-slow) var(--ease-out-expo);

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto 1fr auto;
  }
`

const linkBase =
  'relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-brand-deep/75 transition-colors hover:bg-brand-mist hover:text-brand-deep'

export function Header() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const { ids } = useFavorites()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const favorites = (
    <Link
      to="/favoritos"
      aria-label={ids.length ? `Favoritos (${ids.length})` : 'Favoritos'}
      className="relative grid size-10 place-items-center rounded-full text-brand-deep transition-colors hover:bg-brand-mist"
    >
      <Heart size={19} strokeWidth={1.6} aria-hidden />
      {ids.length > 0 && (
        <span className="num absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-brand px-1 text-[0.625rem] font-semibold leading-4 text-white">
          {ids.length}
        </span>
      )}
    </Link>
  )

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>
      <Dock>
        <Island $compact={compact}>
          <Link to="/" aria-label={`${site.name} — início`} className="shrink-0 justify-self-start rounded-full">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden items-center justify-self-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    linkBase,
                    isActive &&
                      'text-brand-deep after:absolute after:inset-x-3.5 after:-bottom-px after:h-[2px] after:rounded-full after:bg-gold',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-self-end gap-1">
            {favorites}
            <Button
              as="a"
              href={whatsappUrl(MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              $size="sm"
              className="!hidden shrink-0 whitespace-nowrap lg:!inline-flex"
              onClick={() => track('whatsapp_click', { origin: 'header' })}
            >
              <MessageCircle size={16} strokeWidth={1.75} aria-hidden />
              Falar com a gente
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu de navegação"
              className="grid size-10 place-items-center rounded-full text-brand-deep transition-colors hover:bg-brand-mist active:scale-95 lg:!hidden"
            >
              <Menu size={22} strokeWidth={1.8} aria-hidden />
            </button>
          </div>
        </Island>
      </Dock>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        title="Menu"
        footer={
          <div className="flex flex-col gap-3">
            <Button
              as="a"
              href={whatsappUrl(MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              $block
              $variant="whatsapp"
              onClick={() => track('whatsapp_click', { origin: 'menu' })}
            >
              <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
              Falar no WhatsApp
            </Button>
            <a
              href={`tel:${site.phones[0].tel}`}
              className="flex items-center justify-center gap-2 py-1 text-sm font-medium text-stone transition-colors hover:text-brand-deep"
              onClick={() => track('contact_click', { origin: 'menu', channel: 'phone' })}
            >
              <Phone size={15} strokeWidth={1.75} aria-hidden />
              {site.phones[0].label}
            </a>
          </div>
        }
      >
        <nav aria-label="Menu móvel">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.to} className="border-b border-line last:border-0">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between py-4 text-[1.25rem] font-medium tracking-tight text-brand-deep/80 transition-colors hover:text-brand-deep',
                      isActive && 'text-brand-deep font-semibold',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && <span className="size-2 rounded-full bg-gold" aria-hidden />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Sheet>
    </>
  )
}

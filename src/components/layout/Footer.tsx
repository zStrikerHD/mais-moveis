import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { nav, site } from '@/config/site'
import { Logo } from '@/components/ui/Logo'
import { MESSAGES, whatsappUrl } from '@/utils/whatsapp'
import { track } from '@/utils/analytics'

const linkCls = 'inline-flex py-1.5 text-[0.9375rem] text-white/70 transition-colors hover:text-white'

export function Footer() {
  return (
    <footer className="on-dark bg-brand-deep text-white">
      <div className="container-site grid gap-12 pb-10 pt-16 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/70">
            Imobiliária em {site.city}/{site.state}. Casas, apartamentos, terrenos, chácaras e lançamentos
            na cidade e região, com atendimento direto de quem conhece cada bairro.
          </p>
          <p className="mt-6 inline-flex items-center gap-3 text-sm text-white/80">
            <span className="h-px w-6 bg-gold" aria-hidden />
            CRECI {site.creci}
          </p>
        </div>

        <nav aria-label="Mapa do site" className="md:col-span-3">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-gold">Navegação</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkCls}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/favoritos" className={linkCls}>
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-gold">Contato</h2>
          <ul className="flex flex-col gap-1">
            <li>
              <a
                href={whatsappUrl(MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} items-center gap-2.5`}
                onClick={() => track('whatsapp_click', { origin: 'footer' })}
              >
                <MessageCircle size={16} strokeWidth={1.6} aria-hidden /> WhatsApp
              </a>
            </li>
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className={`${linkCls} items-center gap-2.5`}
                  onClick={() => track('contact_click', { origin: 'footer', channel: 'phone' })}
                >
                  <Phone size={16} strokeWidth={1.6} aria-hidden /> {p.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className={`${linkCls} items-center gap-2.5`}
                onClick={() => track('contact_click', { origin: 'footer', channel: 'email' })}
              >
                <Mail size={16} strokeWidth={1.6} aria-hidden /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 py-1.5 text-[0.9375rem] text-white/70">
              <MapPin size={16} strokeWidth={1.6} className="mt-1 shrink-0" aria-hidden />
              {site.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-1 py-6 text-[0.8125rem] text-white/55 sm:flex-row sm:justify-between">
          <p>© 2026 {site.name}. Todos os direitos reservados.</p>
          <p>Valores e condições sujeitos a confirmação. CRECI {site.creci}.</p>
        </div>
      </div>
    </footer>
  )
}

import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { site } from '@/config/site'
import { MESSAGES, whatsappUrl } from '@/utils/whatsapp'
import { track } from '@/utils/analytics'
import { Button } from '@/components/ui/Button'

const row = 'group flex items-start gap-4 py-4 transition-colors'
const icon = 'mt-0.5 shrink-0 text-gold-deep'

export function ContactBlock({ headingId = 'contato-home', title = 'Fale com a gente.' }: { headingId?: string; title?: string }) {
  return (
    <section aria-labelledby={headingId} className="pb-[var(--section-y)]">
      <div className="container-site">
        <div className="grid gap-10 rounded-[var(--radius-lg)] border border-line bg-white p-7 md:grid-cols-12 md:gap-8 md:p-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">Contato</p>
            <h2 id={headingId} className="title-lg">
              {title}
            </h2>
            <p className="mt-4 max-w-[36ch] text-stone">
              O caminho mais rápido é o WhatsApp. Se preferir, ligue ou envie um e-mail.
            </p>
            <Button
              as="a"
              href={whatsappUrl(MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              $variant="whatsapp"
              $size="lg"
              className="mt-8"
              onClick={() => track('whatsapp_click', { origin: 'contact-block' })}
            >
              <MessageCircle size={18} strokeWidth={1.75} aria-hidden />
              Abrir conversa
            </Button>
          </div>

          <ul className="divide-y divide-line md:col-span-6 md:col-start-7">
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className={row} onClick={() => track('contact_click', { origin: 'contact-block', channel: 'phone' })}>
                  <Phone size={18} strokeWidth={1.6} className={icon} aria-hidden />
                  <span>
                    <span className="block text-sm text-stone">Telefone / WhatsApp</span>
                    <span className="num text-[1.0625rem] font-medium text-brand-deep group-hover:underline decoration-gold underline-offset-4">{p.label}</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className={row} onClick={() => track('contact_click', { origin: 'contact-block', channel: 'email' })}>
                <Mail size={18} strokeWidth={1.6} className={icon} aria-hidden />
                <span>
                  <span className="block text-sm text-stone">E-mail</span>
                  <span className="text-[1.0625rem] font-medium text-brand-deep group-hover:underline decoration-gold underline-offset-4">{site.email}</span>
                </span>
              </a>
            </li>
            <li className={row}>
              <MapPin size={18} strokeWidth={1.6} className={icon} aria-hidden />
              <span>
                <span className="block text-sm text-stone">Endereço</span>
                <span className="text-[1.0625rem] font-medium text-brand-deep">{site.address}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Seo } from '@/components/ui/Seo'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="Página não encontrada" description="O endereço que você tentou abrir não existe." noindex />
      <section className="container-site flex min-h-[80svh] flex-col items-start justify-center pb-16 pt-32">
        <p className="eyebrow mb-5">Erro 404</p>
        <h1 className="display max-w-[16ch]">Essa página não está no mapa.</h1>
        <p className="lead mt-5">O link pode ter mudado ou o imóvel já foi vendido. Comece pelo catálogo ou volte ao início.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as={Link} to="/imoveis" $size="lg">
            <Compass size={18} strokeWidth={1.75} aria-hidden />
            Ver imóveis
          </Button>
          <Button as={Link} to="/" $variant="outline" $size="lg">
            Voltar ao início
          </Button>
        </div>
      </section>
    </>
  )
}

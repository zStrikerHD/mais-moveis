import { Seo } from '@/components/ui/Seo'
import { ConstructionHero } from '@/components/home/ConstructionHero'
import { QuickSearch } from '@/components/filters/QuickSearch'
import { PropertyCarousel } from '@/components/property/PropertyCarousel'
import { AboutTeaser } from '@/components/home/AboutTeaser'
import { CtaPair } from '@/components/home/CtaPair'
import { ContactBlock } from '@/components/home/ContactBlock'
import { cheapestFirst, discover, nearYou, priciestFirst } from '@/utils/catalog'

export default function Home() {
  return (
    <>
      <Seo
        title="Imobiliária em Jaú/SP: casas, apartamentos, terrenos e chácaras"
        description="Imóveis à venda em Jaú e região: casas, sobrados, chácaras, terrenos e apartamentos. Fale direto com um corretor da Mais Imóveis Jaú."
        path="/"
      />
      <ConstructionHero />
      <QuickSearch />
      <PropertyCarousel
        headingId="perto"
        eyebrow="Seleção da equipe"
        title="Imóveis perto de você"
        description="Casas e sobrados em bairros de Jaú, escolhidos por nossa equipe."
        items={nearYou()}
        linkTo="/imoveis"
      />
      <PropertyCarousel
        headingId="menor-preco"
        title="Do menor para o maior preço"
        items={cheapestFirst()}
        linkTo="/imoveis?ordem=menor-preco"
      />
      <PropertyCarousel
        headingId="maior-preco"
        title="Do maior para o menor preço"
        items={priciestFirst()}
        linkTo="/imoveis?ordem=maior-preco"
      />
      <PropertyCarousel
        headingId="descobrir"
        title="Para descobrir"
        description="Uma mistura de tipos e bairros. A seleção muda a cada dia."
        items={discover(8)}
        linkTo="/imoveis"
      />
      <AboutTeaser />
      <CtaPair />
      <ContactBlock />
    </>
  )
}

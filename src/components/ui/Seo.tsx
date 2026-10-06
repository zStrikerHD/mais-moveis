import { site } from '@/config/site'

interface SeoProps {
  title: string
  description: string
  /** Caminho canônico (ex.: "/imoveis"). */
  path?: string
  image?: string
  noindex?: boolean
}

/**
 * SEO por página. React 19 eleva <title>, <meta> e <link> para o <head>
 * automaticamente — sem bibliotecas extras.
 */
export function Seo({ title, description, path, image, noindex }: SeoProps) {
  const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`
  const url = path !== undefined ? `${site.url}${path}` : undefined
  const img = image ? (image.startsWith('http') ? image : `${site.url}${image}`) : `${site.url}/brand/og.jpg`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : null}
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}

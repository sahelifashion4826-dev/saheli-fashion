import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  imageAlt = `${siteConfig.name} designer ethnic wear`,
}: PageMetadataOptions): Metadata {
  const url = path ? `${siteConfig.url}${path}` : `${siteConfig.url}/`
  const socialTitle = `${title} | ${siteConfig.name}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  }
}
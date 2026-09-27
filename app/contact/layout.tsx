import type { ReactNode } from 'react'
import { createPageMetadata } from '@/config/metadata'

export const metadata = createPageMetadata({
  title: 'Ahmedabad Boutique & Styling',
  description:
    'Contact Saheli Fashion in Ahmedabad for designer sarees, bridal styling, custom fitting, studio appointments and Navratri collection enquiries.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
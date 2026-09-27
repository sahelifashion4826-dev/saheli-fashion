'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const dismissedKey = 'navratri-welcome-offer-dismissed'
const offerUrl =
  'https://wa.me/918469484356?text=Hi%20Saheli%20Fashion,%20I%20am%20interested%20in%20your%20Navratri%20Special%20Offer!'

export function WelcomeOfferModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const offerLinkRef = useRef<HTMLAnchorElement>(null)
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem(dismissedKey)) return

    setIsVisible(true)
    const frame = requestAnimationFrame(() => setIsOpen(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    }
  }, [isVisible])

  function dismiss() {
    if (!isOpen) return

    sessionStorage.setItem(dismissedKey, 'true')
    setIsOpen(false)
    dismissTimerRef.current = setTimeout(() => setIsVisible(false), 300)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      dismiss()
      return
    }

    if (event.key !== 'Tab') return

    const first = closeButtonRef.current
    const last = offerLinkRef.current
    if (!first || !last) return

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navratri Special Offer"
        aria-hidden={!isOpen}
        className={`relative max-h-[calc(100svh-2rem)] max-w-[calc(100vw-2rem)] transition duration-300 ease-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={dismiss}
          aria-label="Close Navratri offer"
          className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#fffdf5] text-[#2a1b14] shadow-lg transition-colors hover:bg-[#f0d99b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <a
          ref={offerLinkRef}
          href={offerUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enquire about the Navratri Special Offer on WhatsApp"
          tabIndex={isOpen ? 0 : -1}
          className="block max-h-[calc(100svh-2rem)] max-w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        >
          <Image
            src="/images/navratrioffer500.png"
            alt="Saheli Fashion Navratri Special Offer"
            width={864}
            height={1232}
            priority
            className="h-auto max-h-[calc(100svh-2rem)] w-auto max-w-full rounded-md object-contain shadow-2xl"
          />
        </a>
      </div>
    </div>
  )
}
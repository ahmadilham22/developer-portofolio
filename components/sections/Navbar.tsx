'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled ? 'glass-dark' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="#" className="text-xl font-bold gradient-text">
          Dev Portfolio
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-sm text-text-secondary hover:text-foreground transition-colors">
            Work
          </a>
          <a href="#about" className="text-sm text-text-secondary hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm text-text-secondary hover:text-foreground transition-colors">
            Contact
          </a>
        </div>

        <Button
          className="bg-accent hover:bg-accent hover:shadow-lg hover:shadow-accent/50 text-white rounded-full px-6"
          size="sm"
        >
          Resume
        </Button>
      </div>
    </nav>
  )
}

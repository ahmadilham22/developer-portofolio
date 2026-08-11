'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export function Navbar({ resumeUrl }: { resumeUrl?: string | null }) {
  const [isHidden, setIsHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > 150 && latest > previous) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  })

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] w-[90%] max-w-2xl px-6 py-3 glass-dark rounded-full shadow-[0_0_30px_0_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-between">
        <Link href="#" className="text-lg font-bold gradient-text">
          Portfolio
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#work" className="text-sm text-text-secondary hover:text-accent transition-colors">
            Work
          </a>
          <a href="#about" className="text-sm text-text-secondary hover:text-accent transition-colors">
            Experience
          </a>
          <a href="#contact" className="text-sm text-text-secondary hover:text-accent transition-colors">
            Contact
          </a>
        </div>

        {resumeUrl ? (
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-5 h-9" size="sm">
              Resume
            </Button>
          </a>
        ) : (
          <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-5 h-9" size="sm">
            Resume
          </Button>
        )}
      </div>
    </motion.nav>
  )
}

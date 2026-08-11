'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Social media icons as SVG components
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
)

import Image from 'next/image'

export function Hero({ profile }: { profile?: any }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen blur-3xl animate-float" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full mix-blend-screen blur-3xl animation-float animation-delay-2000" 
        />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full relative z-10">
        
        {/* Left Column: Text & CTA */}
        <div className="text-left space-y-8 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-400">Available for work</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            <span className="text-text-primary text-2xl md:text-3xl font-medium mb-4 block">
              {profile?.greeting || "Hi, I'm a Developer ✌️"}
            </span>
            <span className="gradient-text">
              {profile?.titleLine1 || "Crafting Digital"}
            </span>
            <br />
            <span className="text-white">
              {profile?.titleLine2 || "Experiences"}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
          >
            {profile?.description || "I design and develop modern web applications with a focus on performance, scalability, and beautiful user interfaces."}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <a 
              href="#work" 
              className={cn(buttonVariants({ size: "lg" }), "bg-accent hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/50 text-white rounded-full")}
            >
              View My Work
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#contact"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full border-white/20 hover:bg-white/5")}
            >
              Let's Talk
            </a>
          </motion.div>
        </div>

        {/* Right Column: Avatar/Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Outer glow rings */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute inset-4 border border-accent/30 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-8 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Photo Container */}
            <div className="absolute inset-0 rounded-full border border-white/10 bg-card overflow-hidden glass-dark flex flex-col items-center justify-center text-center p-6 shadow-2xl">
              {profile?.heroImage ? (
                <Image src={profile.heroImage} alt="Profile" fill className="object-cover" priority />
              ) : (
                <>
                  <div className="w-16 h-16 mb-4 rounded-xl bg-accent/20 flex items-center justify-center rotate-12">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <span className="text-text-secondary text-sm font-medium">Your Photo Here</span>
                  <span className="text-text-secondary/50 text-xs mt-2">Upload in CMS</span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  )
}

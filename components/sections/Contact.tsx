'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

// Icon components
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

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

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 002.856-3.475 9.93 9.93 0 01-2.824.774 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
)

export function Contact({ profile }: { profile?: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Let's Work Together</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          I'm always interested in hearing about new projects and opportunities.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="glass-dark p-8 rounded-3xl border border-white/10 hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <MailIcon />
              </div>
              <span className="text-sm text-text-secondary uppercase tracking-wider font-bold">Email</span>
            </div>
            <a href={`mailto:${profile?.email || 'hello@example.com'}`} className="text-2xl font-bold text-text-primary hover:text-accent transition-colors break-all">
              {profile?.email || 'hello@example.com'}
            </a>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-text-primary">Connect with me</h3>
            <div className="flex gap-4">
              {profile?.githubUrl && (
                <Link
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full glass-dark border border-white/10 hover:bg-accent/20 hover:border-accent hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
                >
                  <GithubIcon />
                </Link>
              )}
              {profile?.linkedinUrl && (
                <Link
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full glass-dark border border-white/10 hover:bg-accent/20 hover:border-accent hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
                >
                  <LinkedinIcon />
                </Link>
              )}
              {profile?.twitterUrl && (
                <Link
                  href={profile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full glass-dark border border-white/10 hover:bg-accent/20 hover:border-accent hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
                >
                  <TwitterIcon />
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          onSubmit={handleSubmit} 
          className="glass-dark p-8 md:p-10 rounded-3xl border border-white/10 space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-text-secondary">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              required
              className="w-full px-5 py-4 rounded-xl bg-bg-dark border border-white/10 focus:border-accent focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] focus:outline-none transition-all duration-300 text-text-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              className="w-full px-5 py-4 rounded-xl bg-bg-dark border border-white/10 focus:border-accent focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] focus:outline-none transition-all duration-300 text-text-primary"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-text-secondary">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Tell me about your project..."
              rows={4}
              required
              className="w-full px-5 py-4 rounded-xl bg-bg-dark border border-white/10 focus:border-accent focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] focus:outline-none transition-all duration-300 resize-none text-text-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] text-white rounded-xl py-6 font-bold text-lg transition-all duration-300"
          >
            {isSubmitted ? '✨ Message Sent!' : 'Send Message'}
          </Button>
        </motion.form>
      </div>

    </section>
  )
}

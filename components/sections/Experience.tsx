'use client'

import type { Experience } from '@/types/portfolio'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, MouseEvent as ReactMouseEvent } from 'react'

interface ExperienceProps {
  experiences: Experience[]
}

function ExperienceCard({ exp, index }: { exp: Experience, index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative pl-8 md:pl-12 group"
    >
      {/* Timeline dot */}
      <div className="absolute left-[3px] md:left-[5px] top-6 w-3 h-3 md:w-3 md:h-3 rounded-full bg-bg-dark border-2 border-white/20 group-hover:border-accent group-hover:bg-accent transition-all duration-500 z-10 shadow-[0_0_0_0_rgba(168,85,247,0)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]" />

      {/* Glass Card with Spotlight */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="glass-dark p-6 md:p-8 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-300 relative overflow-hidden"
      >
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0 mix-blend-screen"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,0.1), transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
            <div>
              <h3 className="text-2xl font-bold text-text-primary">{exp.role}</h3>
              <p className="text-accent text-sm md:text-base">{exp.company}</p>
            </div>
            <span className="text-text-secondary text-sm md:text-base mt-2 md:mt-0">
              {exp.dateStart} - {exp.dateEnd}
            </span>
          </div>

          <ul className="space-y-3 mb-6">
            {exp.description.map((item, idx) => (
              <li key={idx} className="text-text-secondary flex gap-3">
                <span className="text-accent flex-shrink-0 mt-1">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full border border-accent/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Experience({ experiences }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-text-secondary text-lg mb-16 max-w-2xl">
          A timeline of my professional journey and the impact I&apos;ve made at each role.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative space-y-8">
        {/* Background static line */}
        <div className="absolute left-[8px] md:left-[10px] top-6 bottom-6 w-[2px] bg-white/10" />
        
        {/* Animated Laser line */}
        <motion.div 
          style={{ height: lineHeight }} 
          className="absolute left-[8px] md:left-[10px] top-6 w-[2px] bg-accent shadow-[0_0_15px_rgba(168,85,247,0.8)] origin-top z-0" 
        />

        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.id} exp={exp} index={index} />
        ))}
      </div>
    </section>
  )
}

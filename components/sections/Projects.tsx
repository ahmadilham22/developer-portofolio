'use client'

import type { Project } from '@/types/portfolio'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProjectCard } from './ProjectCard'
import { motion } from 'framer-motion'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Work</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">
            My best projects showcasing expertise in full-stack development, AI, and beautiful user interfaces.
          </p>
        </div>
      </motion.div>

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 auto-rows-[350px] md:auto-rows-[450px]">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            size={index === 0 ? 'large' : 'small'}
          />
        ))}
      </div>

      {/* View All Projects Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="flex justify-center"
      >
        <Link
          href="/projects"
          className="group px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-accent/10 hover:border-accent text-white font-medium transition-all duration-300 flex items-center gap-2 shadow-lg backdrop-blur-md"
        >
          View Project Archive
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 text-accent" />
        </Link>
      </motion.div>
    </section>
  )
}

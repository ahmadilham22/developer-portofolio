'use client'

import type { Project } from '@/types/portfolio'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProjectCard } from './ProjectCard'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <section id="work" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Featured Work</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          My three best projects showcasing expertise in full-stack development, AI, and enterprise solutions.
        </p>
      </div>

      {/* Prominent Bento Grid - 3 Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 auto-rows-[350px]">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            size="large"
          />
        ))}
      </div>

      {/* View All Projects Button */}
      <div className="flex justify-center">
        <Link
          href="/projects"
          className="group px-8 py-4 rounded-lg border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-all duration-300 flex items-center gap-2"
        >
          View All Projects
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  )
}

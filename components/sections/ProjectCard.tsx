'use client'

import type { Project } from '@/types/portfolio'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProjectCardProps {
  project: Project
  size?: 'small' | 'medium' | 'large'
}

export function ProjectCard({ project, size = 'medium' }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1',
    large: 'col-span-1',
  }

  return (
    <Link href={`/projects/${project.slug || project.id}`} className="block">
      <div
        className={`${sizeClasses[size]} h-full group relative overflow-hidden rounded-2xl bg-card border border-white/10 hover:border-accent/50 transition-all duration-300 hover:scale-105 ${
        isHovered ? 'glow' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      {project.image && (
        <div className="relative w-full h-64 md:h-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div>
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm text-gray-200 line-clamp-3">{project.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs bg-accent/20 rounded-full border border-accent/50 text-white">
                {tag}
              </span>
            ))}
          </div>
          {project.url && (
            <button
              onClick={(e) => {
                e.preventDefault();
                window.open(project.url, '_blank');
              }}
              className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors relative z-10"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Static content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
    </Link>
  )
}

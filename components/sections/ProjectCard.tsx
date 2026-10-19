'use client'

import type { Project } from '@/types/portfolio'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: Project
  size?: 'small' | 'medium' | 'large'
}

export function ProjectCard({ project }: ProjectCardProps) {
  const tags = project.tags ?? []

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative h-full min-w-0 overflow-hidden rounded-lg border border-white/10 bg-card transition-colors duration-300 hover:border-accent/50 focus-within:border-accent/50"
    >
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 600px"
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />

      <Link
        href={`/projects/${project.slug || project.id}`}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
      >
        <span className="sr-only">View {project.title}</span>
      </Link>

      <div className="pointer-events-none relative z-20 flex h-full flex-col justify-end p-5 text-white">
        <h3 className="line-clamp-2 text-xl font-bold leading-snug [overflow-wrap:anywhere]">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-200 [overflow-wrap:anywhere]">
            {project.description}
          </p>
        )}

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="flex min-w-0 flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                title={tag}
                className="max-w-full truncate rounded border border-white/15 bg-black/40 px-2 py-1 text-xs text-gray-200"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span
                title={tags.slice(3).join(', ')}
                className="px-2 py-1 text-xs text-gray-300"
              >
                +{tags.length - 3}
              </span>
            )}
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} in a new tab`}
              title="Open project in a new tab"
              className="pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-black/40 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

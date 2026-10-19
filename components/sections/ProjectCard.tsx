import Image from 'next/image'
import Link from 'next/link'
import { AppWindow, ArrowUpRight, Braces, ExternalLink, Star } from 'lucide-react'
import type { Project } from '@/types/portfolio'
import { getProjectKind, getProjectKindLabel } from '@/lib/projectPresentation'
import { ProjectLinks } from '@/components/portfolio/ProjectLinks'
import styles from '@/components/portfolio/portfolio.module.css'

interface ProjectCardProps {
  project: Project
  priority?: boolean
  size?: 'small' | 'medium' | 'large'
  detailed?: boolean
}

export function ProjectCard({ project, priority = false, detailed = false }: ProjectCardProps) {
  const tags = project.tags ?? []
  const projectHref = `/projects/${project.slug || project.id}`
  const isApi = getProjectKind(project) === 'backend-api'
  const KindIcon = isApi ? Braces : AppWindow

  return (
    <article className={`${styles.projectCard} ${detailed ? styles.indexCard : ''}`}>
      <Link href={projectHref} className={styles.projectImage} aria-label={`View ${project.title}`}>
        {project.image ? <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(max-width: 700px) 100vw, 500px" loading={priority ? 'eager' : 'lazy'} /> : <span className={styles.imageFallback}>{project.title}</span>}
      </Link>
      <div className={styles.projectBody}>
        {detailed && <div className={styles.cardMeta}>
          <span className={`${styles.projectKind} ${isApi ? styles.apiKind : ''}`}><KindIcon size={13} aria-hidden="true" />{getProjectKindLabel(project)}</span>
          {project.featured && <span className={styles.featuredLabel}><Star size={11} aria-hidden="true" />Featured</span>}
        </div>}
        <div className={styles.projectTitleRow}>
          <h3><Link href={projectHref}>{project.title}</Link></h3>
          {!detailed && project.url && <a className={styles.projectExternal} href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} project link in a new tab`} title="Open project link"><ExternalLink size={16} aria-hidden="true" /></a>}
        </div>
        <p className={styles.projectDescription}>{project.description}</p>
        <ul className={styles.projectTags} aria-label="Technologies">
          {tags.slice(0, 3).map((tag) => <li key={tag} title={tag}>{tag}</li>)}
          {tags.length > 3 && <li className={styles.moreTags} title={tags.slice(3).join(', ')}>+{tags.length - 3}</li>}
        </ul>
      </div>
      {detailed && <div className={styles.cardFooter}>
        <Link href={projectHref} className={styles.detailsLink}>View details <ArrowUpRight size={14} aria-hidden="true" /></Link>
        <ProjectLinks project={project} />
      </div>}
    </article>
  )
}

import { BookOpen, Code2, ExternalLink } from 'lucide-react'
import type { Project } from '@/types/portfolio'
import { getProjectLinks } from '@/lib/projectPresentation'
import styles from './portfolio.module.css'

export function ProjectLinks({ project, buttons = false }: { project: Project; buttons?: boolean }) {
  const links = getProjectLinks(project)
  if (!links.length) return null

  return (
    <div className={buttons ? styles.resourceButtons : styles.resourceLinks}>
      {links.map((link, index) => {
        const Icon = link.kind === 'source' ? Code2 : link.kind === 'docs' ? BookOpen : ExternalLink
        return <a key={link.kind} href={link.href} target="_blank" rel="noopener noreferrer" className={buttons ? (index === 0 ? styles.primaryButton : styles.secondaryButton) : undefined} aria-label={`${link.label} for ${project.title} (opens in a new tab)`}>
          <Icon size={buttons ? 16 : 14} aria-hidden="true" />{link.label}
        </a>
      })}
    </div>
  )
}

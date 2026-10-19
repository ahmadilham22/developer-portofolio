import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { getPortfolioContent } from '@/lib/portfolio'
import { getProjectKind } from '@/lib/projectPresentation'
import styles from '@/components/portfolio/portfolio.module.css'

export const metadata: Metadata = {
  title: 'All Projects | Ahmad Ilham',
  description: 'Selected and archived APIs and web applications by Ahmad Ilham.',
}

export const revalidate = 0

export default async function ProjectsPage() {
  const { profile, projects, experience, skills } = await getPortfolioContent()
  const featuredProjects = projects.filter((project) => project.featured)
  const archivedProjects = projects.filter((project) => !project.featured)
  const apiCount = projects.filter((project) => getProjectKind(project) === 'backend-api').length
  const webCount = projects.length - apiCount

  return (
    <PortfolioShell profile={profile} hasExperience={experience.length > 0} hasStack={skills.length > 0}>
      <div className={`${styles.pageIntro} ${styles.projectIndexIntro}`}>
        <Link href="/#work" className={styles.textLink}><ArrowLeft size={15} aria-hidden="true" /> Back to home</Link>
        <h1>All projects<span>.</span></h1>
        <p>APIs, web applications, and the work behind them.</p>
        <div className={styles.indexSummary}><span>{String(projects.length).padStart(2, '0')} projects</span>{webCount > 0 && <span>{webCount} web {webCount === 1 ? 'application' : 'applications'}</span>}{apiCount > 0 && <span>{apiCount} backend {apiCount === 1 ? 'API' : 'APIs'}</span>}</div>
      </div>
      {featuredProjects.length > 0 && <section className={styles.collection} aria-labelledby="featured-title">
        <div className={styles.sectionHeading}><div className={styles.headingGroup}><h2 id="featured-title">Featured projects</h2><span className={styles.projectCount}>{String(featuredProjects.length).padStart(2, '0')}</span></div></div>
        <div className={styles.projectGrid}>{featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} priority={index < 2} detailed />)}</div>
      </section>}
      {archivedProjects.length > 0 && <section className={styles.collection} aria-labelledby="archived-title">
        <div className={styles.sectionHeading}><div className={styles.headingGroup}><h2 id="archived-title">Archived projects</h2><span className={styles.projectCount}>{String(archivedProjects.length).padStart(2, '0')}</span></div></div>
        <div className={styles.projectGrid}>{archivedProjects.map((project) => <ProjectCard key={project.id} project={project} detailed />)}</div>
      </section>}
      {projects.length === 0 && <p className={styles.emptyState}>No projects published yet.</p>}
    </PortfolioShell>
  )
}

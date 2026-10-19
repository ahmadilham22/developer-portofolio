import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { AppWindow, ArrowRight, ArrowUpRight, Braces, ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import { ProjectLinks } from '@/components/portfolio/ProjectLinks'
import { ProjectScreenshot } from '@/components/portfolio/ProjectScreenshot'
import { getProjectContent } from '@/lib/portfolio'
import { getProjectKind, getProjectKindLabel } from '@/lib/projectPresentation'
import { client } from '@/sanity/lib/client'
import styles from '@/components/portfolio/portfolio.module.css'

interface ProjectCaseStudyProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true
export const revalidate = 0

export async function generateStaticParams() {
  return client.fetch<{ slug: string }[]>(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`)
}

export async function generateMetadata({ params }: ProjectCaseStudyProps): Promise<Metadata> {
  const { slug } = await params
  const { project } = await getProjectContent(slug)
  return {
    title: project ? `${project.title} | Ahmad Ilham` : 'Project Not Found',
    description: project?.description,
  }
}

export default async function ProjectCaseStudy({ params }: ProjectCaseStudyProps) {
  const { slug } = await params
  const { profile, project, projects } = await getProjectContent(slug)
  if (!project) notFound()

  const isApi = getProjectKind(project) === 'backend-api'
  const KindIcon = isApi ? Braces : AppWindow
  const sections = [
    { id: 'overview', title: 'Overview', content: project.caseStudy?.fullDescription || project.description },
    { id: 'challenge', title: 'The challenge', content: project.caseStudy?.challenge },
    { id: 'solution', title: 'The solution', content: project.caseStudy?.solution },
    { id: 'outcome', title: 'Results & takeaways', content: project.caseStudy?.outcome },
  ].filter((section) => section.content?.trim())
  const architecture = (project.caseStudy?.architectureSteps ?? []).map((step) => step.trim()).filter(Boolean)
  const endpoints = (project.caseStudy?.apiEndpoints ?? []).filter((endpoint) => endpoint.method && endpoint.path?.trim())
  const highlights = (project.caseStudy?.highlights ?? []).filter((highlight) => highlight.trim())
  const contents = [
    ...sections.map(({ id, title }) => ({ id, title })),
    ...(architecture.length ? [{ id: 'system-flow', title: 'System flow' }] : []),
    ...(endpoints.length ? [{ id: 'api-overview', title: 'API overview' }] : []),
    ...(highlights.length ? [{ id: 'highlights', title: 'Key features' }] : []),
  ]
  const projectIndex = projects.findIndex((item) => item.id === project.id)
  const nextProject = projects.length > 1 ? projects[(projectIndex + 1) % projects.length] : null

  return (
    <PortfolioShell profile={profile}>
      <header className={`${styles.pageIntro} ${styles.studyIntro}`}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/projects">Projects</Link><ChevronRight size={13} aria-hidden="true" /><span aria-current="page">{project.title}</span>
        </nav>
        <div className={`${styles.projectKind} ${isApi ? styles.apiKind : ''}`}><KindIcon size={14} aria-hidden="true" />{getProjectKindLabel(project)}</div>
        <h1>{project.title}<span>.</span></h1>
        <p>{project.description}</p>
        <ProjectLinks project={project} buttons />
      </header>

      {!!project.tags.length && <dl className={styles.detailMeta}><dt>Built with</dt><dd><ul className={styles.stackTokens}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></dd></dl>}
      {project.image && <ProjectScreenshot src={project.image} title={project.title} />}

      {!!contents.length && <div className={styles.caseStudyLayout}>
        <aside className={styles.studySidebar}>
          <nav aria-label="Case study contents"><p>Contents</p><ol>{contents.map((item, index) => <li key={item.id}><a href={`#${item.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</a></li>)}</ol></nav>
        </aside>
        <div className={styles.studyBody}>
          {sections.map((section) => <section id={section.id} className={styles.studySection} key={section.id}><h2>{section.title}</h2><p>{section.content}</p></section>)}
          {!!architecture.length && <section id="system-flow" className={styles.studySection}><h2>System flow</h2><ol className={styles.systemFlow}>{architecture.map((step, index) => <li key={`${index}-${step}`}><span className={styles.flowNumber}>{String(index + 1).padStart(2, '0')}</span><span>{step}</span>{index < architecture.length - 1 && <ArrowRight size={16} aria-hidden="true" />}</li>)}</ol></section>}
          {!!endpoints.length && <section id="api-overview" className={styles.studySection}><h2>API overview</h2><table className={styles.endpointTable}><thead><tr><th scope="col">Method</th><th scope="col">Endpoint</th></tr></thead><tbody>{endpoints.map((endpoint) => <tr key={endpoint._key}><td><span className={styles.httpMethod} data-method={endpoint.method}>{endpoint.method}</span></td><td><code>{endpoint.path}</code>{endpoint.description && <p>{endpoint.description}</p>}</td></tr>)}</tbody></table></section>}
          {!!highlights.length && <section id="highlights" className={styles.studySection}><h2>Key features</h2><ul className={styles.featureList}>{highlights.map((highlight, index) => <li key={index}>{highlight}</li>)}</ul></section>}
        </div>
      </div>}

      {nextProject && <Link href={`/projects/${nextProject.slug || nextProject.id}`} className={styles.nextProject}>
        <div><span className={styles.nextLabel}>Next project <ArrowRight size={14} aria-hidden="true" /></span><h2>{nextProject.title}</h2><p>{getProjectKindLabel(nextProject)}</p></div>
        {nextProject.image && <div className={styles.nextImage}><Image src={nextProject.image} alt={`${nextProject.title} screenshot`} fill sizes="160px" /></div>}
      </Link>}
      <div className={styles.detailContact}><p>Interested in working together?</p><Link href="/#contact" className={styles.textLink}>Get in touch <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
    </PortfolioShell>
  )
}

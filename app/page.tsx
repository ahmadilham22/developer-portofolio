import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, ChevronDown, Mail } from 'lucide-react'
import { PortfolioShell } from '@/components/portfolio/PortfolioShell'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { getPortfolioContent, portfolioName } from '@/lib/portfolio'
import styles from '@/components/portfolio/portfolio.module.css'

export const revalidate = 0

export default async function Home() {
  const { profile, projects, experience, skills } = await getPortfolioContent()
  const featuredProjects = projects.filter((project) => project.featured)
  const greeting = profile?.greeting || `Hi, I'm ${portfolioName}`
  const role = [profile?.titleLine1, profile?.titleLine2].filter(Boolean).join(' ') || 'Backend & Web Developer'
  const skillsByCategory = skills.reduce<Record<string, string[]>>((groups, skill) => {
    const names = skill.name.split(',').map((name) => name.trim()).filter(Boolean)
    groups[skill.category] = [...(groups[skill.category] ?? []), ...names]
    return groups
  }, {})
  const orderedCategories = [...new Set(['Backend', 'Database', 'Frontend', 'Tools', 'Other', ...Object.keys(skillsByCategory)])]
    .filter((category) => skillsByCategory[category]?.length)

  return (
    <PortfolioShell profile={profile} home hasExperience={experience.length > 0} hasStack={orderedCategories.length > 0}>
      <section className={styles.intro} aria-labelledby="intro-title">
        <div className={styles.identity}>
          {profile?.heroImage && <Image src={profile.heroImage} alt={portfolioName} width={44} height={44} className={styles.avatar} priority />}
          <span>{role}</span>
        </div>
        <h1 id="intro-title">{greeting}{!/[.!?]$/.test(greeting.trim()) && <span>.</span>}</h1>
        <p className={styles.introDescription}>{profile?.description || 'I build APIs and web applications with Go, JavaScript, and PHP. Turning practical problems into clean, working software.'}</p>
        <div className={styles.introActions}>
          <a href="#work" className={styles.primaryButton}>Explore my work <ArrowDown size={16} aria-hidden="true" /></a>
          {profile?.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}>GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>}
        </div>
      </section>

      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <div className={styles.headingGroup}>
            <span className={styles.sectionNumber}>01</span>
            <h2 id="work-title">Selected projects</h2>
            <span className={styles.projectCount}>{String(featuredProjects.length).padStart(2, '0')}</span>
          </div>
          <Link href="/projects" className={styles.textLink}>All projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        {featuredProjects.length > 0 ? <div className={styles.projectGrid}>
          {featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} priority={index < 2} />)}
        </div> : <p className={styles.emptyState}>No featured projects yet.</p>}
      </section>

      {experience.length > 0 && <section id="experience" className={styles.splitSection} aria-labelledby="experience-title">
        <div className={styles.sideHeading}><span className={styles.sectionNumber}>02</span><h2 id="experience-title">Experience</h2><p>Where I&apos;ve contributed.</p></div>
        <div>
          {experience.map((job) => <article key={job.id} className={styles.experienceRow}>
            <div className={styles.jobHeading}><h3>{job.role}</h3><span>{job.dateStart} - {job.dateEnd}</span></div>
            <p className={styles.company}>{job.company}</p>
            <ul className={styles.responsibilities}>{job.description.slice(0, 2).map((item, index) => <li key={index}>{item}</li>)}</ul>
            {job.description.length > 2 && <details className={styles.jobDetails}>
              <summary>More details <ChevronDown size={14} aria-hidden="true" /></summary>
              <ul className={styles.responsibilities}>{job.description.slice(2).map((item, index) => <li key={index}>{item}</li>)}</ul>
            </details>}
            <p className={styles.jobSkills}>{job.skills.join(' / ')}</p>
          </article>)}
        </div>
      </section>}

      {orderedCategories.length > 0 && <section id="stack" className={styles.splitSection} aria-labelledby="stack-title">
        <div className={styles.sideHeading}><span className={styles.sectionNumber}>03</span><h2 id="stack-title">My stack</h2><p>The tools I work with.</p></div>
        <dl className={styles.stackList}>{orderedCategories.map((category) => <div className={styles.stackRow} key={category}>
          <dt>{category}</dt><dd>{skillsByCategory[category].join(', ')}</dd>
        </div>)}</dl>
      </section>}

      <section id="contact" className={`${styles.splitSection} ${styles.contact}`} aria-labelledby="contact-title">
        <div className={styles.sideHeading}><span className={styles.sectionNumber}>04</span><h2 id="contact-title">Get in touch</h2></div>
        <div className={styles.contactContent}>
          <p>Have something in mind?<br />Let&apos;s build it together.</p>
          {profile?.email && <a href={`mailto:${profile.email}`} className={styles.email}><Mail size={19} aria-hidden="true" />{profile.email}<ArrowUpRight size={19} aria-hidden="true" /></a>}
          <div className={styles.socialLinks}>
            {profile?.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>}
            {profile?.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>}
            {profile?.twitterUrl && <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer">X <ArrowUpRight size={14} aria-hidden="true" /></a>}
            {profile?.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={14} aria-hidden="true" /></a>}
          </div>
        </div>
      </section>
    </PortfolioShell>
  )
}

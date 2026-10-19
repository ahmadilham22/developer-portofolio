import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowUp, FileText } from 'lucide-react'
import type { Profile } from '@/types/portfolio'
import { portfolioName } from '@/lib/portfolio'
import styles from './portfolio.module.css'

interface PortfolioShellProps {
  children: ReactNode
  profile: Profile | null
  home?: boolean
  hasExperience?: boolean
  hasStack?: boolean
}

export function PortfolioShell({ children, profile, home = false, hasExperience = true, hasStack = true }: PortfolioShellProps) {
  const homeLink = (anchor: string) => home ? `#${anchor}` : `/#${anchor}`

  return (
    <div className={styles.page} id="top">
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link className={styles.wordmark} href={home ? '#top' : '/'}>{portfolioName}<span>.</span></Link>
          <nav className={styles.navigation} aria-label="Main navigation">
            <Link href={homeLink('work')}>Work</Link>
            {hasExperience && <Link href={homeLink('experience')} className={styles.desktopLink}>Experience</Link>}
            {hasStack && <Link href={homeLink('stack')} className={styles.desktopLink}>Stack</Link>}
            <Link href={homeLink('contact')}>Contact</Link>
          </nav>
          {profile?.resumeUrl && <a className={styles.resume} href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" aria-label="Open resume in a new tab" title="Open resume">
            <FileText size={15} aria-hidden="true" /><span>Resume</span>
          </a>}
        </div>
      </header>
      <main className={`${styles.container} ${styles.main}`} id="main-content">{children}</main>
      <footer className={`${styles.container} ${styles.footer}`}>
        <span>&copy; {new Date().getFullYear()} {portfolioName}</span>
        <a href="#top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
      </footer>
    </div>
  )
}

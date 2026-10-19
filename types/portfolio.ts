export interface Profile {
  greeting?: string | null
  titleLine1?: string | null
  titleLine2?: string | null
  description?: string | null
  email?: string | null
  githubUrl?: string | null
  linkedinUrl?: string | null
  twitterUrl?: string | null
  heroImage?: string | null
  resumeUrl?: string | null
}

export interface CaseStudy {
  challenge?: string | null
  solution?: string | null
  outcome?: string | null
  fullDescription?: string | null
  highlights?: string[] | null
  architectureSteps?: string[] | null
  apiEndpoints?: {
    _key: string
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
    path: string
    description?: string | null
  }[] | null
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  url?: string
  featured: boolean
  size?: 'small' | 'medium' | 'large'
  caseStudy?: CaseStudy | null
  projectType?: 'backend-api' | 'web-app' | null
  repositoryUrl?: string | null
  demoUrl?: string | null
  apiDocsUrl?: string | null
}

export interface Experience {
  id: string
  role: string
  company: string
  dateStart: string
  dateEnd: string
  description: string[]
  skills: string[]
}

export interface Skill {
  id: string
  name: string
  category: 'Frontend' | 'Backend' | 'Database' | 'Design' | 'Tools' | 'Other'
}

export interface PortfolioData {
  projects: Project[]
  archivedProjects?: Project[]
  experience: Experience[]
  skills: Skill[]
}

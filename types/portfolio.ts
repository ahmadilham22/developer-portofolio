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

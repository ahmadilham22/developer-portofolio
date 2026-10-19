import { cache } from 'react'
import { client } from '@/sanity/lib/client'
import type { Experience, Profile, Project, Skill } from '@/types/portfolio'

export const portfolioName = 'Ahmad Ilham'

const profileFields = `
  greeting, titleLine1, titleLine2, description,
  email, githubUrl, linkedinUrl, twitterUrl,
  "heroImage": heroImage.asset->url,
  "resumeUrl": resume.asset->url
`

const projectFields = `
  "id": _id,
  "slug": coalesce(slug.current, _id),
  title,
  "description": coalesce(description, ""),
  "image": mainImage.asset->url,
  "tags": coalesce(techStack, []),
  "url": link,
  projectType, repositoryUrl, demoUrl, apiDocsUrl,
  "featured": coalesce(featured, false)
`

interface PortfolioContent {
  profile: Profile | null
  projects: Project[]
  experience: Experience[]
  skills: Skill[]
}

export const getPortfolioContent = cache(async () =>
  client.fetch<PortfolioContent>(`{
    "profile": *[_type == "profile"][0]{ ${profileFields} },
    "projects": *[_type == "project"] | order(_createdAt asc){ ${projectFields} },
    "experience": *[_type == "experience"] | order(_createdAt desc){
      "id": _id, role, company, dateStart, dateEnd,
      "description": coalesce(description, []),
      "skills": coalesce(skills, [])
    },
    "skills": *[_type == "skill"]{ "id": _id, name, category }
  }`)
)

export const getProjectContent = cache(async (slug: string) =>
  client.fetch<{ profile: Profile | null; project: Project | null; projects: Project[] }>(`{
    "profile": *[_type == "profile"][0]{ ${profileFields} },
    "project": *[_type == "project" && (slug.current == $slug || _id == $slug)][0]{
      ${projectFields}, caseStudy
    },
    "projects": *[_type == "project"] | order(_createdAt asc){ ${projectFields} }
  }`, { slug })
)

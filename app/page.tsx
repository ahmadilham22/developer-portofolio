import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Navbar } from '@/components/sections/Navbar'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { mockData } from '@/lib/mockData'

import { client } from '@/sanity/lib/client'

export const revalidate = 0 // Disable caching for now to see immediate updates

export default async function Home() {
  // Fetch projects from Sanity
  const sanityProjects = await client.fetch(`*[_type == "project"]{
    "id": _id,
    "slug": slug.current,
    title,
    description,
    "image": mainImage.asset->url,
    "tags": techStack,
    "url": link,
    featured
  }`)

  const sanityExperience = await client.fetch(`*[_type == "experience"] | order(dateEnd desc) {
    "id": _id,
    role,
    company,
    dateStart,
    dateEnd,
    description,
    skills
  }`)

  const sanitySkills = await client.fetch(`*[_type == "skill"] {
    "id": _id,
    name,
    category
  }`)

  return (
    <main className="w-full bg-background">
      <Navbar />
      <Hero />
      <Projects projects={sanityProjects.length > 0 ? sanityProjects : mockData.projects} />
      <Experience experiences={sanityExperience.length > 0 ? sanityExperience : mockData.experience} />
      <Skills skills={sanitySkills.length > 0 ? sanitySkills : mockData.skills} />
      <Contact />
    </main>
  )
}

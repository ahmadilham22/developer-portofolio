import { Navbar } from '@/components/sections/Navbar'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { mockData } from '@/lib/mockData'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { client } from '@/sanity/lib/client'

export const metadata = {
  title: 'All Projects',
  description: 'Complete portfolio of projects and past work',
}

export const revalidate = 0

export default async function ProjectsPage() {
  const sanityProfile = await client.fetch(`*[_type == "profile"][0]{
    "resumeUrl": resume.asset->url
  }`)

  const sanityProjects = await client.fetch(`*[_type == "project"] | order(_createdAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    description,
    "image": mainImage.asset->url,
    "tags": techStack,
    "url": link,
    featured
  }`)

  // Separate featured and archived projects
  const validProjects = sanityProjects.length > 0 ? sanityProjects : mockData.projects
  const featuredProjects = validProjects.filter((p: any) => p.featured)
  const archivedProjects = validProjects.filter((p: any) => !p.featured)

  return (
    <main className="w-full bg-background">
      <Navbar resumeUrl={sanityProfile?.resumeUrl} />
      
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">All Projects</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            A comprehensive collection of all my projects, including featured work and archived projects from throughout my career.
          </p>
        </div>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
              {featuredProjects.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  size="large"
                />
              ))}
            </div>
          </div>
        )}

        {/* Archived Projects Section */}
        {archivedProjects.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Archived Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
              {archivedProjects.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  size="medium"
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

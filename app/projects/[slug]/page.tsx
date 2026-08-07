import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'

interface ProjectCaseStudyProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  const projects = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`)
  return projects.map((project: { slug: string }) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectCaseStudyProps) {
  const resolvedParams = await params
  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{ title, description }`,
    { slug: resolvedParams.slug }
  )
  
  return {
    title: project ? `${project.title} - Case Study` : 'Project',
    description: project?.description,
  }
}

export default async function ProjectCaseStudy({ params }: ProjectCaseStudyProps) {
  const resolvedParams = await params
  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      description,
      "image": mainImage.asset->url,
      "tags": techStack,
      caseStudy
    }`,
    { slug: resolvedParams.slug }
  )

  if (!project) {
    notFound()
  }

  // Fallback data if case study isn't fully filled out
  const caseStudy = project.caseStudy || {
    challenge: 'Information not provided.',
    solution: 'Information not provided.',
    outcome: 'Information not provided.',
    fullDescription: project.description || 'Information not provided.',
    highlights: [],
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass-dark border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section with Large Image */}
      <section className="relative w-full h-screen max-h-[600px] md:max-h-[700px] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-accent/10" />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </section>

      {/* Content Section */}
      <section className="relative z-10 -mt-40 mx-auto max-w-4xl px-6 pb-20">
        {/* Title and Tech Stack */}
        <div className="bg-card border border-white/10 rounded-2xl p-8 md:p-12 glass-dark mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text text-pretty">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-4 py-2 bg-accent/10 border border-accent/30 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-lg text-text-secondary leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Case Study Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-white/10 rounded-2xl p-8 glass-dark hover:border-accent/30 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-accent">Challenge</h2>
            <p className="text-text-secondary leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          <div className="bg-card border border-white/10 rounded-2xl p-8 glass-dark hover:border-accent/30 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-accent">Solution</h2>
            <p className="text-text-secondary leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        <div className="bg-card border border-white/10 rounded-2xl p-8 md:p-12 glass-dark mb-12 border-accent/20">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Outcome & Impact</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            {caseStudy.outcome}
          </p>
        </div>

        <div className="bg-card border border-white/10 rounded-2xl p-8 md:p-12 glass-dark mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Project Overview</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            {caseStudy.fullDescription}
          </p>

          {caseStudy.highlights?.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6 text-accent">Key Highlights</h3>
              <ul className="space-y-4">
                {caseStudy.highlights.map((highlight: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-text-secondary leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-text-secondary mb-6">Interested in working together?</p>
          <Link
            href="/#contact"
            className="inline-flex px-8 py-4 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  )
}

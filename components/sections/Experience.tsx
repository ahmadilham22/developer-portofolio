'use client'

import type { Experience } from '@/types/portfolio'

interface ExperienceProps {
  experiences: Experience[]
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="gradient-text">Experience</span>
      </h2>
      <p className="text-text-secondary text-lg mb-16 max-w-2xl">
        A timeline of my professional journey and the impact I&apos;ve made at each role.
      </p>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 md:pl-12">
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent border-4 border-bg-dark" />

            {/* Timeline line */}
            {index !== experiences.length - 1 && (
              <div className="absolute left-[7px] md:left-[9px] top-8 w-0.5 h-24 bg-gradient-to-b from-accent to-transparent" />
            )}

            <div className="glass-dark p-6 md:p-8 rounded-xl hover:border-accent/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">{exp.role}</h3>
                  <p className="text-accent text-sm md:text-base">{exp.company}</p>
                </div>
                <span className="text-text-secondary text-sm md:text-base mt-2 md:mt-0">
                  {exp.dateStart} - {exp.dateEnd}
                </span>
              </div>

              <ul className="space-y-3 mb-4">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="text-text-secondary flex gap-3">
                    <span className="text-accent flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full border border-accent/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

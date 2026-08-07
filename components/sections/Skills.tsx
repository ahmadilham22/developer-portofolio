'use client'

import type { Skill } from '@/types/portfolio'

interface SkillsProps {
  skills: Skill[]
}

export function Skills({ skills }: SkillsProps) {
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  const categories = Object.keys(skillsByCategory).sort()

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="gradient-text">Skills & Technologies</span>
      </h2>
      <p className="text-text-secondary text-lg mb-16 max-w-2xl">
        Technologies and tools I use to build exceptional digital products.
      </p>

      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-text-secondary mb-4">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {skillsByCategory[category].map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 rounded-full border border-accent/50 text-accent text-sm hover:bg-accent/10 hover:border-accent transition-all duration-300 cursor-default"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

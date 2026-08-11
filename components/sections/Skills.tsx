'use client'

import type { Skill } from '@/types/portfolio'
import { motion } from 'framer-motion'

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } }
  }

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Skills & Technologies</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          Technologies and tools I use to build exceptional digital products.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, idx) => (
          <motion.div 
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-dark p-6 md:p-8 rounded-2xl border border-white/10 hover:border-accent/30 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-text-primary mb-6">{category}</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {skillsByCategory[category].flatMap((skill) => 
                skill.name.split(',').map((name) => name.trim()).filter(Boolean).map((name, index) => (
                  <motion.div
                    variants={itemVariants}
                    key={`${skill.id}-${index}`}
                    className="px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium hover:bg-accent/20 hover:border-accent hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300 cursor-default"
                  >
                    {name}
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

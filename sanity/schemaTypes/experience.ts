import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateStart',
      title: 'Start Date',
      type: 'string',
      description: 'e.g., Jan 2022',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateEnd',
      title: 'End Date',
      type: 'string',
      description: 'e.g., Present or Dec 2023',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description Bullets',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points describing your responsibilities and achievements.',
    }),
    defineField({
      name: 'skills',
      title: 'Skills Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})

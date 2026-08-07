import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A brief description of the project for the portfolio card.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies used in this project (e.g., React, Next.js, Tailwind).',
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
      description: 'URL to the live project or GitHub repository.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Check this box if you want this project to appear on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study Details',
      type: 'object',
      description: 'Fill this in for the detailed project page.',
      fields: [
        defineField({
          name: 'challenge',
          title: 'Challenge',
          type: 'text',
        }),
        defineField({
          name: 'solution',
          title: 'Solution',
          type: 'text',
        }),
        defineField({
          name: 'outcome',
          title: 'Outcome & Impact',
          type: 'text',
        }),
        defineField({
          name: 'fullDescription',
          title: 'Full Description',
          type: 'text',
        }),
        defineField({
          name: 'highlights',
          title: 'Key Highlights',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
  ],
})

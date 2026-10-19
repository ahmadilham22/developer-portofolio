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
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Backend API', value: 'backend-api' },
          { title: 'Web Application', value: 'web-app' },
        ],
        layout: 'radio',
      },
      description: 'Optional. Existing projects are classified from their description until a type is selected.',
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
      name: 'repositoryUrl',
      title: 'Source Code URL',
      type: 'url',
      description: 'Optional GitHub, GitLab, or other repository URL. The existing Project Link remains supported.',
    }),
    defineField({
      name: 'demoUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'apiDocsUrl',
      title: 'API Documentation URL',
      type: 'url',
      description: 'Optional Swagger, OpenAPI, Postman, or other published API documentation.',
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
        defineField({
          name: 'architectureSteps',
          title: 'System Flow',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Optional. List the real components in request-flow order to display a simple system diagram.',
        }),
        defineField({
          name: 'apiEndpoints',
          title: 'API Endpoints',
          type: 'array',
          description: 'Optional. Add real endpoints to display an API overview.',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'method', title: 'Method', type: 'string', options: { list: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] }, validation: (Rule) => Rule.required() }),
              defineField({ name: 'path', title: 'Path', type: 'string', validation: (Rule) => Rule.required() }),
              defineField({ name: 'description', title: 'Description', type: 'string' }),
            ],
            preview: { select: { title: 'path', subtitle: 'method' } },
          }],
        }),
      ],
    }),
  ],
})

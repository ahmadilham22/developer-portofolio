import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'greeting',
      title: 'Greeting Text',
      type: 'string',
      description: 'e.g., Hi, I\'m a Developer ✌️',
    }),
    defineField({
      name: 'titleLine1',
      title: 'Hero Title (Line 1 - Gradient)',
      type: 'string',
      description: 'e.g., Crafting Digital',
    }),
    defineField({
      name: 'titleLine2',
      title: 'Hero Title (Line 2)',
      type: 'string',
      description: 'e.g., Experiences',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      description: 'Short bio or intro description under the title.',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter/X URL',
      type: 'url',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'resume',
      title: 'Resume/CV (PDF)',
      type: 'file',
      options: {
        accept: '.pdf'
      }
    }),
  ],
})

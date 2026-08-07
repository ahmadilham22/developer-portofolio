import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import experience from './experience'
import skill from './skill'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, experience, skill],
}

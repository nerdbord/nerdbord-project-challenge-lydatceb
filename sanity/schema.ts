import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './schemaTypes/postType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType],
}

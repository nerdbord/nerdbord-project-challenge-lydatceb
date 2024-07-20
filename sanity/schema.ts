import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './schemaTypes/postType'
import { emailType } from './schemaTypes/mailingEmail'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, emailType],
}

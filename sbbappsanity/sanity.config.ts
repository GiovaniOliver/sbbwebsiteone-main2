import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'sbbappsanity',

  projectId: 'zddq5mnz',
  dataset: 'production',

  basePath: "/admin",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

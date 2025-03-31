import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'BergenWorks',

  projectId: 'nur5m2dg',
  dataset: 'development',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure/index'  


export default defineConfig({
  name: 'default',
  title: 'BergenWorks',

  projectId: 'nur5m2dg',
  dataset: 'development',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

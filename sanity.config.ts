import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig([
  {
    title: 'Bergen Works Live',
    subtitle: 'production',
    name: 'production-workspace',
    basePath: '/production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'nur5m2dg',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    plugins: [structureTool({structure}), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
  {
    title: 'Bergen Works Preview',
    subtitle: 'development',
    name: 'development-workspace',
    basePath: '/development',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'nur5m2dg',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'development',
    plugins: [structureTool({structure}), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
])

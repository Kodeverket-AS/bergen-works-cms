import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig([
  {
    title: 'Bergen Works Live',
    subtitle: 'production',
    name: 'production-workspace',
    basePath: '/production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development" as string,
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
  {
    title: 'Bergen Works Preview',
    subtitle: 'development',
    name: 'development-workspace',
    basePath: '/development',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development" as string,
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
])

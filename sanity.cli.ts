import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "nur5m2dg",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
  },
  autoUpdates: true,
  studioHost: 'bergenworks',
})

import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'
import logger from '@adonisjs/core/services/logger'
import { isSSREnableForPage } from '#config/ssr'

const inertiaConfig = defineConfig({
  rootView: 'inertia_layout',

  encryptHistory: true,
  ssr: {
    enabled: true,
    entrypoint: 'app/core/ui/app/ssr.tsx',
    pages: (_, page) => {
      const ssrEnabled = isSSREnableForPage(page)
      logger.debug(`Page "${page}" SSR enabled: ${ssrEnabled}`)
      return ssrEnabled
    },
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}

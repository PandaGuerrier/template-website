import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'
import logger from '@adonisjs/core/services/logger'
import i18nManager from '@adonisjs/i18n/services/main'
import { isSSREnableForPage } from '#config/ssr'

import AbilitiesService from '#dashboard/services/abilities_service'
import {
  IMPERSONATE_TOKEN_SESSION_KEY,
  IMPERSONATE_ORIGINAL_USER_SESSION_KEY,
} from '#dashboard/controllers/impersonates_controller'
import UserDto from '#users/dtos/user'
import WebsiteSetting from '#common/models/website_setting'
import WebsiteSettingsDto from '#common/dtos/website_settings'
import env from '#start/env'

const inertiaConfig = defineConfig({
  rootView: 'inertia_layout',

  sharedData: {
    posthog: {
      apiKey: env.get('POSTHOG_API_KEY'),
      host: env.get('POSTHOG_HOST'),
    },
    locale: (ctx) => ctx.inertia.always(() => ctx.i18n?.locale || i18nManager.config.defaultLocale),
    fallbackLocale: (ctx: any) =>
      ctx.inertia.always(() => ctx.i18n?.fallbackLocale || 'en'),
    websiteSettings: async (_) => {
      const settings = await WebsiteSetting.query().firstOrFail()
      return new WebsiteSettingsDto(settings)
    },
    user: async ({ auth }) => {
      if (auth?.user) {
        // @ts-ignore
        await auth.user.load('role')
        return new UserDto(auth?.user)
      }
    },
    flashMessages: (ctx) => ctx.session?.flashMessages.all(),
    impersonating: ({ session, auth }) => {
      const originalUserId = session?.get(IMPERSONATE_ORIGINAL_USER_SESSION_KEY)
      if (!originalUserId || !auth?.user) return null
      return {
        token: session.get(IMPERSONATE_TOKEN_SESSION_KEY) as string,
        originalUserId: originalUserId as string,
      }
    },
    abilities: async (ctx) => {
      if (!ctx.auth?.user) {
        return []
      }

      // @ts-ignore
      await ctx.auth.user.load('role')
      return new AbilitiesService().getAllAbilities(ctx.auth?.user)
    },
  },

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

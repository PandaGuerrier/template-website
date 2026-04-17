import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware'
import { HttpContext } from '@adonisjs/core/http'
import type { PageProps } from '@adonisjs/inertia/types'
import i18nManager from '@adonisjs/i18n/services/main'
import WebsiteSetting from '#common/models/website_setting'
import WebsiteSettingsDto from '#common/dtos/website_settings'
import UserDto from '#users/dtos/user'
import {
  IMPERSONATE_ORIGINAL_USER_SESSION_KEY,
  IMPERSONATE_TOKEN_SESSION_KEY,
} from '#dashboard/controllers/impersonates_controller'
import AbilitiesService from '#dashboard/services/abilities_service'
import { NextFn } from '@adonisjs/core/types/http'

export default class InertiaMiddleware extends BaseInertiaMiddleware {
  async share(ctx: HttpContext): Promise<PageProps> {
    ctx.inertia.share(async () => ({
      websiteSettings: new WebsiteSettingsDto(await WebsiteSetting.firstOrFail()),
    }))

    if (ctx.auth.user) {
      await ctx.auth.user.load((preloader) => preloader.load('role'))
    }

    const originalUserId = ctx.session?.get(IMPERSONATE_ORIGINAL_USER_SESSION_KEY)

    return {
      locale: ctx.inertia.always(ctx.i18n?.locale || i18nManager.config.defaultLocale),
      fallbackLocale: ctx.inertia.always(ctx.i18n?.fallbackLocale || 'en'),
user: ctx.inertia.always(ctx.auth?.user ? new UserDto(ctx.auth.user) : null),
      flashMessages: ctx.inertia.always(ctx.session.flashMessages.all()),

      impersonating: ctx.inertia.always({
        token: ctx.session.get(IMPERSONATE_TOKEN_SESSION_KEY) as string,
        originalUserId: originalUserId as string,
      }),
      abilities: ctx.inertia.always(
        ctx.auth?.user ? await new AbilitiesService().getAllAbilities(ctx.auth?.user) : []
      ),
    }
  }

  async handle(ctx: HttpContext, next: NextFn) {
    await this.init(ctx)

    const output = await next()
    this.dispose(ctx)

    return output
  }
}

declare module '@adonisjs/inertia/types' {
  type _InferredMiddlewareProps = import('@adonisjs/inertia/types').InferSharedProps<InertiaMiddleware>
  interface SharedProps extends _InferredMiddlewareProps {}
}

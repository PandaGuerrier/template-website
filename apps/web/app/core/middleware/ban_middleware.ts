import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { DateTime } from 'luxon'

export default class BanMiddleware {
  allowedRoutes = ['/me/ban', '/logout']

  async handle({ auth, response, request }: HttpContext, next: NextFn) {
    const url = request.url()
    if (this.allowedRoutes.some((route) => url === route || url.startsWith(route + '/'))) {
      return await next()
    }

    if (auth.isAuthenticated) {
      const user = auth.user!
      if (user.isBanned) {
        // @ts-expect-error — Lucid BelongsTo relation load() is not fully typed for model instances fetched via auth
        await user.load('ban')

        const now = DateTime.now()
        if (user.ban && user.ban.expiresAt && user.ban.expiresAt <= now) {
          user.isBanned = false
          user.banUuid = null
          await user.save()
          return await next()
        }

        // check if the user is in mobile app, if so return json response instead of redirect
        if (request.header('X-Requested-With') === 'XMLHttpRequest' || request.accepts(['json', 'html']) === 'json') {
          return response.forbidden({ message: 'Your account has been banned.' })
        }

        return response.redirect().toRoute('ban.show')
      } else return await next()
    } else return await next()
  }
}

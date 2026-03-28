import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AccountConfigurationMiddleware {
  allowedRoutes = ['/verification', '/logout', '/account/configure', '/me/ban']

  async handle({ auth, response, request }: HttpContext, next: NextFn) {
    if (this.allowedRoutes.some((route) => request.url().includes(route))) return await next()

    const isApi = request.url().startsWith('/api/')
    const guard = isApi ? auth.use('api') : auth.use('web')

    await guard.check()


    if (!guard.isAuthenticated) return await next()

    const user = guard.user!

    if (!user.isEmailVerified) {
      if (isApi) return response.status(403).json({ error: 'mail_not_verified' })
      return response.redirect().toRoute('verification.wait')
    }

    if (user.campus == null) {
      if (isApi) return response.status(403).json({ error: 'account_not_configured', missing: 'campus' })
      return response.redirect().toRoute('configuration.campus.show')
    }

    if (user.program == null) {
      if (isApi) return response.status(403).json({ error: 'account_not_configured', missing: 'program' })
      return response.redirect().toRoute('configuration.program.show')
    }

    return await next()
  }
}

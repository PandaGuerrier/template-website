import { randomBytes } from 'node:crypto'
import type { HttpContext } from '@adonisjs/core/http'
import { afterAuthRedirectRoute } from '#config/auth'

import User from '#users/models/user'
import ImpersonateToken from '#dashboard/models/impersonate_token'
import ImpersonatePolicy from '#dashboard/policies/impersonate_policy'

export const IMPERSONATE_TOKEN_SESSION_KEY = 'impersonateToken'
export const IMPERSONATE_ORIGINAL_USER_SESSION_KEY = 'originalUserId'

export default class ImpersonatesController {
  async store({ session, bouncer, params, response, auth }: HttpContext) {
    const impersonatedUser = await User.findOrFail(params.id)
    await bouncer.with(ImpersonatePolicy).authorize('create', impersonatedUser)

    const plainToken = randomBytes(32).toString('hex')

    await ImpersonateToken.createForImpersonation(
      auth.user!.uuid,
      impersonatedUser.uuid,
      plainToken
    )

    session.put(IMPERSONATE_ORIGINAL_USER_SESSION_KEY, auth.user!.uuid)
    session.put(IMPERSONATE_TOKEN_SESSION_KEY, plainToken)

    await auth.use('web').login(impersonatedUser)

    return response.redirect().toRoute(afterAuthRedirectRoute)
  }

  async destroy({ session, request, response, auth }: HttpContext) {
    const originalUserId = session.get(IMPERSONATE_ORIGINAL_USER_SESSION_KEY) as string | undefined
    if (!originalUserId) {
      return response.redirect().toRoute(afterAuthRedirectRoute)
    }

    const { token } = request.only(['token'])

    if (!token) {
      session.forget(IMPERSONATE_ORIGINAL_USER_SESSION_KEY)
      session.forget(IMPERSONATE_TOKEN_SESSION_KEY)
      return response.forbidden({ error: 'Invalid or expired impersonate token' })
    }

    const record = await ImpersonateToken.verifyAndConsume(token, originalUserId)

    if (!record) {
      session.forget(IMPERSONATE_ORIGINAL_USER_SESSION_KEY)
      session.forget(IMPERSONATE_TOKEN_SESSION_KEY)
      return response.forbidden({ error: 'Invalid or expired impersonate token' })
    }

    const originalUser = await User.findOrFail(record.originalUserUuid)

    session.forget(IMPERSONATE_ORIGINAL_USER_SESSION_KEY)
    session.forget(IMPERSONATE_TOKEN_SESSION_KEY)

    await auth.use('web').login(originalUser)

    return response.redirect().toRoute('dashboard.show')
  }
}

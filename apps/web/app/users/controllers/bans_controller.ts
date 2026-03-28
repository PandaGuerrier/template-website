import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core/container'
import { DateTime } from 'luxon'

import UserPolicy from '#dashboard/policies/user_policy'
import { createBanValidator } from '#users/validator'
import User from '#users/models/user'
import BanService from '#users/services/ban_service'

@inject()
export default class BansController {
  constructor(private banService: BanService) {}

  public async ban({ request, response, bouncer, auth }: HttpContext) {
    const data = await request.validateUsing(createBanValidator)

    const user = await User.findByOrFail('uuid', data.userUuid)
    await bouncer.with(UserPolicy).authorize('ban', user)

    await this.banService.ban(user, auth.user!.uuid, {
      reason: data.reason,
      expiresAt: data.expiresAt ? DateTime.fromISO(data.expiresAt) : null,
      deletePosts: data.deletePosts,
    })

    return response.redirect().back()
  }

  public async unban({ params, response, bouncer }: HttpContext) {
    const user = await User.findByOrFail('uuid', params.userUuid)
    await bouncer.with(UserPolicy).authorize('unban', user)

    await this.banService.unban(user)

    return response.redirect().back()
  }

  public async show({ auth, inertia, response }: HttpContext) {
    if (!auth.user?.isBanned) {
      return response.redirect('/')
    }

    const user = auth.user! as User
    await user.load('ban')

    if (!user.ban) {
      return response.redirect('/')
    }

    return inertia.render('users/moderation/banned', { ban: user.ban })
  }
}

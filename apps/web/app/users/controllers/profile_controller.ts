import type { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'
import logger from '@adonisjs/core/services/logger'

import { updateProfileValidator } from '#dashboard/validators'

export default class ProfileController {
  public async show({ inertia }: HttpContext) {
    return inertia.render('users/profile')
  }

  public async handle({ auth, request, response }: HttpContext) {
    const { avatar } = await request.validateUsing(updateProfileValidator)

    const user = auth.user!

    await user.refresh()
    try {
      if (avatar) {
        user.merge({
          avatar: await attachmentManager.createFromFile(avatar),
        })
      }
    } catch (e) {
      logger.error({ err: e }, 'Failed to upload avatar')
    }

    await user.save()
    return response.redirect().toRoute('profile.show')
  }
}

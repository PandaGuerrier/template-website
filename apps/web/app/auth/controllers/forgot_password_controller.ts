import { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'
import { inject } from '@adonisjs/core/container'

import User from '#users/models/user'

import { forgotPasswordValidator } from '#auth/validators'

import PasswordResetService from '#users/services/password_reset_service'
import limiter from '@adonisjs/limiter/services/main'

@inject()
export default class ForgotPasswordController {
  private readonly passwordLimiter = limiter.use({ requests: 3, duration: '2 min', blockDuration: '5 min' })

  constructor(private passwordResetService: PasswordResetService) {}

  async show({ inertia }: HttpContext) {
    return inertia.render('auth/forgot_password')
  }

  async handle({ request, response, i18n, session }: HttpContext) {
    /**
     * Validate the email input.
     */
    const validatedData = await request.validateUsing(forgotPasswordValidator)

    /**
     * Check if the user exists, if not,
     * flash a success message to prevent user enumeration.
     */
    const user = await User.findBy('email', validatedData.email)

    if (!user) {
      return response.redirect().toRoute('auth.sign_in.show')
    }

    const key = `forgot_password_${request.ip()}_${validatedData.email}`

    try {
      await this.passwordLimiter.consume(key)
    } catch {
      session.flashErrors({ E_TOO_MANY_REQUESTS: i18n.t('errors.E_TOO_MANY_REQUESTS') })
      return response.redirect().toRoute('auth.sign_in.show')
    }

    const token = await this.passwordResetService.generateToken(user)

    const translations = {
      subject: i18n.t('auth.emails.reset_password.subject'),
      title: i18n.t('auth.emails.reset_password.title'),
      subtitle: i18n.t('auth.emails.reset_password.subtitle'),
      actionBtn: i18n.t('auth.emails.reset_password.action_btn'),
      defaultMessage: i18n.t('auth.emails.reset_password.default_message'),
    }

    /**
     * Send an email with the signed URL.
     */
    await emitter.emit('auth:forgot_password', { user, token: token.token, translations })

    /**
     * Redirect back with a success message.
     */
    return response.redirect().toRoute('auth.sign_in.show')
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import {
  configureProfileValidator,
  deleteAccountValidator,
  updatePreferencesValidator
} from '#users/validator'
import hash from '@adonisjs/core/services/hash'

export default class AccountController {
  public async showCampus({ auth, inertia, response }: HttpContext) {
    if (auth.user?.campus) {
      return response.redirect().toRoute('dashboard.show')
    }

    return inertia.render('users/configuration/select-campus')
  }

  public async showProgram({ auth, inertia, response }: HttpContext) {
    if (auth.user?.program) {
      return response.redirect().toRoute('dashboard.show')
    }
    return inertia.render('users/configuration/select-program')
  }

  public async handle({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(configureProfileValidator)
    const user = auth.user!

    user.merge(data)
    await user.save()

    return response.redirect().back()
  }

  public async preferences({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(updatePreferencesValidator)
    const user = auth.user!

    user.merge({ preferences: { ...user.preferences, ...data } })
    await user.save()

    return response.redirect().back()
  }

  public async deleteAccount({ auth, response, request, session }: HttpContext) {
    const { password } = await request.validateUsing(deleteAccountValidator)
    const user = auth.user!

    const isPasswordValid = await hash.verify(user.password || '', password)

    if (!isPasswordValid) {
      session.flashErrors({
        password: 'Le mot de passe est incorrect',
      })

      return response.redirect().back()
    }

    await auth.use('web').logout()
    await user.delete()

    return response.redirect().toRoute('home.show')
  }
}

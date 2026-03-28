/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import VerificationController from '#users/controllers/verification_controller'
import AccountController from '#users/controllers/account_controller'
import { throttle } from '#start/limiter'
import BansController from '#users/controllers/bans_controller'

const ProfileController = () => import('#users/controllers/profile_controller')
const PasswordController = () => import('#users/controllers/password_controller')
const TokensController = () => import('#users/controllers/tokens_controller')

router
  .get('/settings', ({ response }) => {
    return response.redirect().toRoute('profile.show')
  })
  .middleware(middleware.auth())
  .as('settings.index')

router.put('/settings/profile', [ProfileController]).middleware(middleware.auth())
router
  .get('/settings/profile', [ProfileController, 'show'])
  .middleware(middleware.auth())
  .as('profile.show')

router
  .resource('/settings/tokens', TokensController)
  .only(['index', 'destroy'])
  .middleware('*', middleware.auth())
  .as('tokens')

router.post('/api/tokens', [TokensController, 'store']).middleware(middleware.auth())

router.put('/settings/password', [PasswordController]).middleware(middleware.auth())
router
  .get('/settings/password', [PasswordController, 'show'])
  .middleware(middleware.auth())
  .as('password.show')

router
  .group(() => {
    router.on('/wait').renderInertia('users/verification/wait').as('verification.wait')
    router.get('/:token', [VerificationController, 'verify']).as('verification.token')
    router
      .post('/resend', [VerificationController, 'resend'])
      .use(throttle)
      .as('verification.resend')
  })
  .prefix('/verification')
  .middleware(middleware.auth())

router
  .group(() => {
    router
      .group(() => {
        router.put('/', [AccountController])
        router.get('/campus', [AccountController, 'showCampus']).as('configuration.campus.show')
        router.get('/program', [AccountController, 'showProgram']).as('configuration.program.show')
      })
      .prefix('/configure')
    router.put('/preferences', [AccountController, 'preferences']).as('account.preferences.update')
  })
  .prefix('/account')
  .middleware(middleware.auth())


router.group(() => {
  router.post('/ban', [BansController, 'ban']).as('users.ban')
  router.delete('/unban/:userUuid', [BansController, 'unban']).as('users.unban')

  router.delete('/me/delete', [AccountController, 'deleteAccount']).as('account.delete')
}).prefix('/users').middleware(middleware.auth())

router.get('/me/ban', [BansController, 'show']).as('ban.show').middleware(middleware.auth())

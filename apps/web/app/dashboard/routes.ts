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

const UsersController = () => import('#dashboard/controllers/users_controller')
const InviteController = () => import('#dashboard/controllers/invite_controller')
const ImpersonatesController = () => import('#dashboard/controllers/impersonates_controller')
const SettingsController = () => import('#dashboard/controllers/admin_controller')
const RolesAdminController = () => import('#dashboard/controllers/roles_admin_controller')

router.group(() => {
  router.get('/', ({ response }) => response.redirect().toRoute('users.index')).as('dashboard.show')

  router.group(() => {
    router
      .resource('/users', UsersController)
      .only(['index', 'store', 'update', 'destroy'])
      .use('*', middleware.auth())
      .as('users')

    router.post('/users/invite', [InviteController])

    router
      .post('/users/impersonate/:id', [ImpersonatesController, 'store'])
    router
      .delete('/admin/users/impersonate', [ImpersonatesController, 'destroy'])
      .as('users.impersonate.destroy')
  })

  router
    .get('/users/:uuid', [UsersController, 'show'])

  router.group(() => {
    router.get('/', [SettingsController, 'show']).as('admin.settings.show')
    router.put('/', [SettingsController]).as('admin.settings.update')
  }).prefix('/admin/settings')

  router
    .resource('/admin/roles', RolesAdminController)
    .as('admin.roles')
}).prefix('/dashboard').middleware(middleware.auth())

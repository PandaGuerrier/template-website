import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core/container'

import UserDto from '#users/dtos/user'
import UserPolicy from '#dashboard/policies/user_policy'
import Role from '#users/models/role'
import User from '#users/models/user'
import UserService from '#users/services/user_service'
import { createUserValidator, editUserValidator, listUserValidator } from '#dashboard/validators'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  public async index({ bouncer, inertia, request }: HttpContext) {
    await bouncer.with(UserPolicy).authorize('viewList')

    const payload = await request.validateUsing(listUserValidator)

    const users = await this.userService.search({
      q: payload.q || undefined,
      roleUuids: (payload.roleUuids as number[] | undefined) || [],
      page: payload.page || 1,
      perPage: payload.perPage || 10,
    })

    return inertia.render('dashboard/admin/users', {
      users: UserDto.fromPaginator(users),
      q: payload.q || undefined,
      selectedRoles: payload.roleUuids || [],
      roles: await Role.query().orderBy('name', 'asc'),
    })
  }

  public async show({ params, inertia, auth }: HttpContext) {
    const uuid = params.uuid === 'me' ? auth.user!.uuid : params.uuid
    const user = await User.findOrFail(uuid)

    return inertia.render('dashboard/users/profile', {
      profile: new UserDto(user),
    })
  }

  public async store({ bouncer, request, response }: HttpContext) {
    await bouncer.with(UserPolicy).authorize('create')

    const payload = await request.validateUsing(createUserValidator)

    await this.userService.create(payload)

    return response.redirect().toRoute('users.index')
  }

  public async update({ bouncer, params, request, response }: HttpContext) {
    const user = await User.query().where('uuid', params.id).firstOrFail()
    await bouncer.with(UserPolicy).authorize('update', user)

    const payload = await request.validateUsing(editUserValidator, {
      meta: { userUuid: params.id },
    })

    await this.userService.update(user, payload)

    return response.redirect().toRoute('users.index')
  }

  public async destroy({ bouncer, params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await bouncer.with(UserPolicy).authorize('delete', user)

    await this.userService.delete(user)

    return response.redirect().toRoute('users.index')
  }
}

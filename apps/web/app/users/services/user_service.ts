import { cuid } from '@adonisjs/core/helpers'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

import User from '#users/models/user'

export interface UserSearchFilters {
  q?: string
  roleUuids?: number[]
  page?: number
  perPage?: number
}

export interface CreateUserPayload {
  fullName?: string | null
  email: string
  password?: string
  roleUuid?: string
  [key: string]: any
}

export interface UpdateUserPayload {
  fullName?: string | null
  email?: string
  password?: string
  [key: string]: any
}

export default class UserService {
  async search(filters: UserSearchFilters): Promise<ModelPaginatorContract<User>> {
    const { q, roleUuids, page = 1, perPage = 10 } = filters

    const query = User.query()

    if (q === 'bans') {
      query.where('is_banned', true)
    } else if (q) {
      query.where((subquery) => {
        subquery.where('full_name', 'ilike', `%${q}%`).orWhere('email', 'ilike', `%${q}%`)
      })
    }

    if (Array.isArray(roleUuids) && roleUuids.length > 0) {
      query.andWhereIn('role_id', roleUuids as number[])
    }

    return query.preload('role').preload('ban').paginate(page, perPage)
  }

  async create(payload: CreateUserPayload): Promise<User> {
    const user = new User()
    user.merge({
      ...payload,
      password: payload.password ? payload.password : cuid(),
    })
    await user.save()
    return user
  }

  async update(user: User, payload: UpdateUserPayload): Promise<User> {
    user.merge({
      ...payload,
      password: payload.password ? payload.password : user.password,
    })
    await user.save()
    return user
  }

  async delete(user: User): Promise<void> {
    await user.delete()
  }
}

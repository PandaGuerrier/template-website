import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

import User from '#users/models/user'
import { can, PermissionActions } from '#users/utils/permission'

export default class ImpersonatePolicy extends BasePolicy {
  create(currentUser: User, user: User): AuthorizerResponse {
    return (
      can(currentUser, 'user', PermissionActions.MANAGE) &&
      currentUser.uuid !== user.uuid &&
      !can(user, 'user', PermissionActions.MANAGE)
    )
  }
}

/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import { Bouncer } from '@adonisjs/bouncer'
import { can, PermissionActions } from '#users/utils/permission'
import User from '#users/models/user'

export const editUser = Bouncer.ability((currentUser: User, targetUser: User) => {
  return can(currentUser, 'user', PermissionActions.UPDATE) || currentUser.uuid === targetUser.uuid
})

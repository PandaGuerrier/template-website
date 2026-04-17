/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'auth.sign_in.show': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.sign_in.show']['types'],
  },
  'sign_in': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['sign_in']['types'],
  },
  'auth.sign_out.show': {
    methods: ["GET","HEAD"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.sign_out.show']['types'],
  },
  'auth.sign_up.show': {
    methods: ["GET","HEAD"],
    pattern: '/sign-up',
    tokens: [{"old":"/sign-up","type":0,"val":"sign-up","end":""}],
    types: placeholder as Registry['auth.sign_up.show']['types'],
  },
  'auth.sign_up.handle': {
    methods: ["POST"],
    pattern: '/sign-up',
    tokens: [{"old":"/sign-up","type":0,"val":"sign-up","end":""}],
    types: placeholder as Registry['auth.sign_up.handle']['types'],
  },
  'auth.forgot_password.show': {
    methods: ["GET","HEAD"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['auth.forgot_password.show']['types'],
  },
  'auth.forgot_password.handle': {
    methods: ["POST"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['auth.forgot_password.handle']['types'],
  },
  'auth.reset_password.show': {
    methods: ["GET","HEAD"],
    pattern: '/reset-password/:token',
    tokens: [{"old":"/reset-password/:token","type":0,"val":"reset-password","end":""},{"old":"/reset-password/:token","type":1,"val":"token","end":""}],
    types: placeholder as Registry['auth.reset_password.show']['types'],
  },
  'auth.reset_password.handle': {
    methods: ["POST"],
    pattern: '/reset-password/:token',
    tokens: [{"old":"/reset-password/:token","type":0,"val":"reset-password","end":""},{"old":"/reset-password/:token","type":1,"val":"token","end":""}],
    types: placeholder as Registry['auth.reset_password.handle']['types'],
  },
  'dashboard.show': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard.show']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/users',
    tokens: [{"old":"/dashboard/users","type":0,"val":"dashboard","end":""},{"old":"/dashboard/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.store': {
    methods: ["POST"],
    pattern: '/dashboard/users',
    tokens: [{"old":"/dashboard/users","type":0,"val":"dashboard","end":""},{"old":"/dashboard/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.update': {
    methods: ["PUT","PATCH"],
    pattern: '/dashboard/users/:id',
    tokens: [{"old":"/dashboard/users/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/users/:id","type":0,"val":"users","end":""},{"old":"/dashboard/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/users/:id',
    tokens: [{"old":"/dashboard/users/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/users/:id","type":0,"val":"users","end":""},{"old":"/dashboard/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.destroy']['types'],
  },
  'invite': {
    methods: ["POST"],
    pattern: '/dashboard/users/invite',
    tokens: [{"old":"/dashboard/users/invite","type":0,"val":"dashboard","end":""},{"old":"/dashboard/users/invite","type":0,"val":"users","end":""},{"old":"/dashboard/users/invite","type":0,"val":"invite","end":""}],
    types: placeholder as Registry['invite']['types'],
  },
  'impersonates.store': {
    methods: ["POST"],
    pattern: '/dashboard/users/impersonate/:id',
    tokens: [{"old":"/dashboard/users/impersonate/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/users/impersonate/:id","type":0,"val":"users","end":""},{"old":"/dashboard/users/impersonate/:id","type":0,"val":"impersonate","end":""},{"old":"/dashboard/users/impersonate/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['impersonates.store']['types'],
  },
  'users.impersonate.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/admin/users/impersonate',
    tokens: [{"old":"/dashboard/admin/users/impersonate","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/users/impersonate","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/users/impersonate","type":0,"val":"users","end":""},{"old":"/dashboard/admin/users/impersonate","type":0,"val":"impersonate","end":""}],
    types: placeholder as Registry['users.impersonate.destroy']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/users/:uuid',
    tokens: [{"old":"/dashboard/users/:uuid","type":0,"val":"dashboard","end":""},{"old":"/dashboard/users/:uuid","type":0,"val":"users","end":""},{"old":"/dashboard/users/:uuid","type":1,"val":"uuid","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'admin.settings.show': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/admin/settings',
    tokens: [{"old":"/dashboard/admin/settings","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/settings","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['admin.settings.show']['types'],
  },
  'admin.settings.update': {
    methods: ["PUT"],
    pattern: '/dashboard/admin/settings',
    tokens: [{"old":"/dashboard/admin/settings","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/settings","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['admin.settings.update']['types'],
  },
  'admin_roles.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/admin/roles',
    tokens: [{"old":"/dashboard/admin/roles","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/roles","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['admin_roles.index']['types'],
  },
  'admin_roles.create': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/admin/roles/create',
    tokens: [{"old":"/dashboard/admin/roles/create","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/roles/create","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/roles/create","type":0,"val":"roles","end":""},{"old":"/dashboard/admin/roles/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin_roles.create']['types'],
  },
  'admin_roles.store': {
    methods: ["POST"],
    pattern: '/dashboard/admin/roles',
    tokens: [{"old":"/dashboard/admin/roles","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/roles","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['admin_roles.store']['types'],
  },
  'admin_roles.show': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/admin/roles/:id',
    tokens: [{"old":"/dashboard/admin/roles/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/roles/:id","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/roles/:id","type":0,"val":"roles","end":""},{"old":"/dashboard/admin/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin_roles.show']['types'],
  },
  'admin_roles.edit': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/admin/roles/:id/edit',
    tokens: [{"old":"/dashboard/admin/roles/:id/edit","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/roles/:id/edit","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/roles/:id/edit","type":0,"val":"roles","end":""},{"old":"/dashboard/admin/roles/:id/edit","type":1,"val":"id","end":""},{"old":"/dashboard/admin/roles/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin_roles.edit']['types'],
  },
  'admin_roles.update': {
    methods: ["PUT","PATCH"],
    pattern: '/dashboard/admin/roles/:id',
    tokens: [{"old":"/dashboard/admin/roles/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/roles/:id","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/roles/:id","type":0,"val":"roles","end":""},{"old":"/dashboard/admin/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin_roles.update']['types'],
  },
  'admin_roles.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/admin/roles/:id',
    tokens: [{"old":"/dashboard/admin/roles/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin/roles/:id","type":0,"val":"admin","end":""},{"old":"/dashboard/admin/roles/:id","type":0,"val":"roles","end":""},{"old":"/dashboard/admin/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin_roles.destroy']['types'],
  },
  'settings.index': {
    methods: ["GET","HEAD"],
    pattern: '/settings',
    tokens: [{"old":"/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['settings.index']['types'],
  },
  'profile': {
    methods: ["PUT"],
    pattern: '/settings/profile',
    tokens: [{"old":"/settings/profile","type":0,"val":"settings","end":""},{"old":"/settings/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/settings/profile',
    tokens: [{"old":"/settings/profile","type":0,"val":"settings","end":""},{"old":"/settings/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'tokens.index': {
    methods: ["GET","HEAD"],
    pattern: '/settings/tokens',
    tokens: [{"old":"/settings/tokens","type":0,"val":"settings","end":""},{"old":"/settings/tokens","type":0,"val":"tokens","end":""}],
    types: placeholder as Registry['tokens.index']['types'],
  },
  'tokens.destroy': {
    methods: ["DELETE"],
    pattern: '/settings/tokens/:id',
    tokens: [{"old":"/settings/tokens/:id","type":0,"val":"settings","end":""},{"old":"/settings/tokens/:id","type":0,"val":"tokens","end":""},{"old":"/settings/tokens/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tokens.destroy']['types'],
  },
  'tokens.store': {
    methods: ["POST"],
    pattern: '/api/tokens',
    tokens: [{"old":"/api/tokens","type":0,"val":"api","end":""},{"old":"/api/tokens","type":0,"val":"tokens","end":""}],
    types: placeholder as Registry['tokens.store']['types'],
  },
  'password': {
    methods: ["PUT"],
    pattern: '/settings/password',
    tokens: [{"old":"/settings/password","type":0,"val":"settings","end":""},{"old":"/settings/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['password']['types'],
  },
  'password.show': {
    methods: ["GET","HEAD"],
    pattern: '/settings/password',
    tokens: [{"old":"/settings/password","type":0,"val":"settings","end":""},{"old":"/settings/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['password.show']['types'],
  },
  'verification.wait': {
    methods: ["GET","HEAD"],
    pattern: '/verification/wait',
    tokens: [{"old":"/verification/wait","type":0,"val":"verification","end":""},{"old":"/verification/wait","type":0,"val":"wait","end":""}],
    types: placeholder as Registry['verification.wait']['types'],
  },
  'verification.token': {
    methods: ["GET","HEAD"],
    pattern: '/verification/:token',
    tokens: [{"old":"/verification/:token","type":0,"val":"verification","end":""},{"old":"/verification/:token","type":1,"val":"token","end":""}],
    types: placeholder as Registry['verification.token']['types'],
  },
  'verification.resend': {
    methods: ["POST"],
    pattern: '/verification/resend',
    tokens: [{"old":"/verification/resend","type":0,"val":"verification","end":""},{"old":"/verification/resend","type":0,"val":"resend","end":""}],
    types: placeholder as Registry['verification.resend']['types'],
  },
  'account': {
    methods: ["PUT"],
    pattern: '/account/configure',
    tokens: [{"old":"/account/configure","type":0,"val":"account","end":""},{"old":"/account/configure","type":0,"val":"configure","end":""}],
    types: placeholder as Registry['account']['types'],
  },
  'configuration.campus.show': {
    methods: ["GET","HEAD"],
    pattern: '/account/configure/campus',
    tokens: [{"old":"/account/configure/campus","type":0,"val":"account","end":""},{"old":"/account/configure/campus","type":0,"val":"configure","end":""},{"old":"/account/configure/campus","type":0,"val":"campus","end":""}],
    types: placeholder as Registry['configuration.campus.show']['types'],
  },
  'configuration.program.show': {
    methods: ["GET","HEAD"],
    pattern: '/account/configure/program',
    tokens: [{"old":"/account/configure/program","type":0,"val":"account","end":""},{"old":"/account/configure/program","type":0,"val":"configure","end":""},{"old":"/account/configure/program","type":0,"val":"program","end":""}],
    types: placeholder as Registry['configuration.program.show']['types'],
  },
  'account.preferences.update': {
    methods: ["PUT"],
    pattern: '/account/preferences',
    tokens: [{"old":"/account/preferences","type":0,"val":"account","end":""},{"old":"/account/preferences","type":0,"val":"preferences","end":""}],
    types: placeholder as Registry['account.preferences.update']['types'],
  },
  'users.ban': {
    methods: ["POST"],
    pattern: '/users/ban',
    tokens: [{"old":"/users/ban","type":0,"val":"users","end":""},{"old":"/users/ban","type":0,"val":"ban","end":""}],
    types: placeholder as Registry['users.ban']['types'],
  },
  'users.unban': {
    methods: ["DELETE"],
    pattern: '/users/unban/:userUuid',
    tokens: [{"old":"/users/unban/:userUuid","type":0,"val":"users","end":""},{"old":"/users/unban/:userUuid","type":0,"val":"unban","end":""},{"old":"/users/unban/:userUuid","type":1,"val":"userUuid","end":""}],
    types: placeholder as Registry['users.unban']['types'],
  },
  'account.delete': {
    methods: ["DELETE"],
    pattern: '/users/me/delete',
    tokens: [{"old":"/users/me/delete","type":0,"val":"users","end":""},{"old":"/users/me/delete","type":0,"val":"me","end":""},{"old":"/users/me/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['account.delete']['types'],
  },
  'ban.show': {
    methods: ["GET","HEAD"],
    pattern: '/me/ban',
    tokens: [{"old":"/me/ban","type":0,"val":"me","end":""},{"old":"/me/ban","type":0,"val":"ban","end":""}],
    types: placeholder as Registry['ban.show']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}

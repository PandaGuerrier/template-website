import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'auth.sign_in.show': { paramsTuple?: []; params?: {} }
    'sign_in': { paramsTuple?: []; params?: {} }
    'auth.sign_out.show': { paramsTuple?: []; params?: {} }
    'auth.sign_up.show': { paramsTuple?: []; params?: {} }
    'auth.sign_up.handle': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.show': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.handle': { paramsTuple?: []; params?: {} }
    'auth.reset_password.show': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.reset_password.handle': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'dashboard.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'invite': { paramsTuple?: []; params?: {} }
    'impersonates.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.impersonate.destroy': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin.settings.show': { paramsTuple?: []; params?: {} }
    'admin.settings.update': { paramsTuple?: []; params?: {} }
    'admin_roles.index': { paramsTuple?: []; params?: {} }
    'admin_roles.create': { paramsTuple?: []; params?: {} }
    'admin_roles.store': { paramsTuple?: []; params?: {} }
    'admin_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_roles.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.index': { paramsTuple?: []; params?: {} }
    'profile': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'tokens.index': { paramsTuple?: []; params?: {} }
    'tokens.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tokens.store': { paramsTuple?: []; params?: {} }
    'password': { paramsTuple?: []; params?: {} }
    'password.show': { paramsTuple?: []; params?: {} }
    'verification.wait': { paramsTuple?: []; params?: {} }
    'verification.token': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'verification.resend': { paramsTuple?: []; params?: {} }
    'account': { paramsTuple?: []; params?: {} }
    'configuration.campus.show': { paramsTuple?: []; params?: {} }
    'configuration.program.show': { paramsTuple?: []; params?: {} }
    'account.preferences.update': { paramsTuple?: []; params?: {} }
    'users.ban': { paramsTuple?: []; params?: {} }
    'users.unban': { paramsTuple: [ParamValue]; params: {'userUuid': ParamValue} }
    'account.delete': { paramsTuple?: []; params?: {} }
    'ban.show': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'auth.sign_in.show': { paramsTuple?: []; params?: {} }
    'auth.sign_out.show': { paramsTuple?: []; params?: {} }
    'auth.sign_up.show': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.show': { paramsTuple?: []; params?: {} }
    'auth.reset_password.show': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'dashboard.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin.settings.show': { paramsTuple?: []; params?: {} }
    'admin_roles.index': { paramsTuple?: []; params?: {} }
    'admin_roles.create': { paramsTuple?: []; params?: {} }
    'admin_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_roles.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.index': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'tokens.index': { paramsTuple?: []; params?: {} }
    'password.show': { paramsTuple?: []; params?: {} }
    'verification.wait': { paramsTuple?: []; params?: {} }
    'verification.token': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'configuration.campus.show': { paramsTuple?: []; params?: {} }
    'configuration.program.show': { paramsTuple?: []; params?: {} }
    'ban.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'auth.sign_in.show': { paramsTuple?: []; params?: {} }
    'auth.sign_out.show': { paramsTuple?: []; params?: {} }
    'auth.sign_up.show': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.show': { paramsTuple?: []; params?: {} }
    'auth.reset_password.show': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'dashboard.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'uuid': ParamValue} }
    'admin.settings.show': { paramsTuple?: []; params?: {} }
    'admin_roles.index': { paramsTuple?: []; params?: {} }
    'admin_roles.create': { paramsTuple?: []; params?: {} }
    'admin_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_roles.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.index': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'tokens.index': { paramsTuple?: []; params?: {} }
    'password.show': { paramsTuple?: []; params?: {} }
    'verification.wait': { paramsTuple?: []; params?: {} }
    'verification.token': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'configuration.campus.show': { paramsTuple?: []; params?: {} }
    'configuration.program.show': { paramsTuple?: []; params?: {} }
    'ban.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'sign_in': { paramsTuple?: []; params?: {} }
    'auth.sign_up.handle': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.handle': { paramsTuple?: []; params?: {} }
    'auth.reset_password.handle': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'users.store': { paramsTuple?: []; params?: {} }
    'invite': { paramsTuple?: []; params?: {} }
    'impersonates.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_roles.store': { paramsTuple?: []; params?: {} }
    'tokens.store': { paramsTuple?: []; params?: {} }
    'verification.resend': { paramsTuple?: []; params?: {} }
    'users.ban': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.update': { paramsTuple?: []; params?: {} }
    'admin_roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile': { paramsTuple?: []; params?: {} }
    'password': { paramsTuple?: []; params?: {} }
    'account': { paramsTuple?: []; params?: {} }
    'account.preferences.update': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.impersonate.destroy': { paramsTuple?: []; params?: {} }
    'admin_roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tokens.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.unban': { paramsTuple: [ParamValue]; params: {'userUuid': ParamValue} }
    'account.delete': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
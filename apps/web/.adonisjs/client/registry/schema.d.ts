/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'auth.sign_in.show': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/sign_in_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/sign_in_controller').default['show']>>>
    }
  }
  'sign_in': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators').signInValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/validators').signInValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/sign_in_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/sign_in_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.sign_out.show': {
    methods: ["GET","HEAD"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/sign_out_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/sign_out_controller').default['handle']>>>
    }
  }
  'auth.sign_up.show': {
    methods: ["GET","HEAD"]
    pattern: '/sign-up'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/sign_up_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/sign_up_controller').default['show']>>>
    }
  }
  'auth.sign_up.handle': {
    methods: ["POST"]
    pattern: '/sign-up'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators').signUpValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/validators').signUpValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/sign_up_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/sign_up_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.forgot_password.show': {
    methods: ["GET","HEAD"]
    pattern: '/forgot-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/forgot_password_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/forgot_password_controller').default['show']>>>
    }
  }
  'auth.forgot_password.handle': {
    methods: ["POST"]
    pattern: '/forgot-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators').forgotPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/validators').forgotPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/forgot_password_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/forgot_password_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.reset_password.show': {
    methods: ["GET","HEAD"]
    pattern: '/reset-password/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/reset_password_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/reset_password_controller').default['show']>>>
    }
  }
  'auth.reset_password.handle': {
    methods: ["POST"]
    pattern: '/reset-password/:token'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators').resetPasswordValidator)>>
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#auth/validators').resetPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/reset_password_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/reset_password_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'dashboard.show': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#dashboard/validators').listUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/dashboard/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#dashboard/validators').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#dashboard/validators').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.update': {
    methods: ["PUT","PATCH"]
    pattern: '/dashboard/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#dashboard/validators').editUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#dashboard/validators').editUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/dashboard/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['destroy']>>>
    }
  }
  'invite': {
    methods: ["POST"]
    pattern: '/dashboard/users/invite'
    types: {
      body: ExtractBody<InferInput<(typeof import('#dashboard/validators').inviteUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#dashboard/validators').inviteUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/invite_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/invite_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'impersonates.store': {
    methods: ["POST"]
    pattern: '/dashboard/users/impersonate/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/impersonates_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/impersonates_controller').default['store']>>>
    }
  }
  'users.impersonate.destroy': {
    methods: ["DELETE"]
    pattern: '/dashboard/admin/users/impersonate'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/impersonates_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/impersonates_controller').default['destroy']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/users/:uuid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { uuid: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/users_controller').default['show']>>>
    }
  }
  'admin.settings.show': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/admin/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/admin_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/admin_controller').default['show']>>>
    }
  }
  'admin.settings.update': {
    methods: ["PUT"]
    pattern: '/dashboard/admin/settings'
    types: {
      body: ExtractBody<InferInput<(typeof import('#dashboard/validators').editWebsiteSettingsValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#dashboard/validators').editWebsiteSettingsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/admin_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/admin_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin_roles.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/admin/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['index']>>>
    }
  }
  'admin_roles.create': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/admin/roles/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['create']>>>
    }
  }
  'admin_roles.store': {
    methods: ["POST"]
    pattern: '/dashboard/admin/roles'
    types: {
      body: ExtractBody<InferInput<(typeof import('#dashboard/validators').createRoleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#dashboard/validators').createRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin_roles.show': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/admin/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['show']>>>
    }
  }
  'admin_roles.edit': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/admin/roles/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['edit']>>>
    }
  }
  'admin_roles.update': {
    methods: ["PUT","PATCH"]
    pattern: '/dashboard/admin/roles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#dashboard/validators').updateRoleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#dashboard/validators').updateRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin_roles.destroy': {
    methods: ["DELETE"]
    pattern: '/dashboard/admin/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/roles_admin_controller').default['destroy']>>>
    }
  }
  'settings.index': {
    methods: ["GET","HEAD"]
    pattern: '/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'profile': {
    methods: ["PUT"]
    pattern: '/settings/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#dashboard/validators').updateProfileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#dashboard/validators').updateProfileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/profile_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/profile_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/settings/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/profile_controller').default['show']>>>
    }
  }
  'tokens.index': {
    methods: ["GET","HEAD"]
    pattern: '/settings/tokens'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['index']>>>
    }
  }
  'tokens.destroy': {
    methods: ["DELETE"]
    pattern: '/settings/tokens/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['destroy']>>>
    }
  }
  'tokens.store': {
    methods: ["POST"]
    pattern: '/api/tokens'
    types: {
      body: ExtractBody<InferInput<(typeof import('#dashboard/validators').createTokenValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#dashboard/validators').createTokenValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'password': {
    methods: ["PUT"]
    pattern: '/settings/password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#dashboard/validators').updatePasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#dashboard/validators').updatePasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/password_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/password_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'password.show': {
    methods: ["GET","HEAD"]
    pattern: '/settings/password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/password_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/password_controller').default['show']>>>
    }
  }
  'verification.wait': {
    methods: ["GET","HEAD"]
    pattern: '/verification/wait'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'verification.token': {
    methods: ["GET","HEAD"]
    pattern: '/verification/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'verification.resend': {
    methods: ["POST"]
    pattern: '/verification/resend'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'account': {
    methods: ["PUT"]
    pattern: '/account/configure'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'configuration.campus.show': {
    methods: ["GET","HEAD"]
    pattern: '/account/configure/campus'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'configuration.program.show': {
    methods: ["GET","HEAD"]
    pattern: '/account/configure/program'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'account.preferences.update': {
    methods: ["PUT"]
    pattern: '/account/preferences'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'users.ban': {
    methods: ["POST"]
    pattern: '/users/ban'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'users.unban': {
    methods: ["DELETE"]
    pattern: '/users/unban/:userUuid'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { userUuid: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'account.delete': {
    methods: ["DELETE"]
    pattern: '/users/me/delete'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'ban.show': {
    methods: ["GET","HEAD"]
    pattern: '/me/ban'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}

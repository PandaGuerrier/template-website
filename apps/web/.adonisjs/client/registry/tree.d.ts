/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  auth: {
    signIn: {
      show: typeof routes['auth.sign_in.show']
    }
    signOut: {
      show: typeof routes['auth.sign_out.show']
    }
    signUp: {
      show: typeof routes['auth.sign_up.show']
      handle: typeof routes['auth.sign_up.handle']
    }
    forgotPassword: {
      show: typeof routes['auth.forgot_password.show']
      handle: typeof routes['auth.forgot_password.handle']
    }
    resetPassword: {
      show: typeof routes['auth.reset_password.show']
      handle: typeof routes['auth.reset_password.handle']
    }
  }
  signIn: typeof routes['sign_in']
  dashboard: {
    show: typeof routes['dashboard.show']
  }
  users: {
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
    impersonate: {
      destroy: typeof routes['users.impersonate.destroy']
    }
    show: typeof routes['users.show']
    ban: typeof routes['users.ban']
    unban: typeof routes['users.unban']
  }
  invite: typeof routes['invite']
  impersonates: {
    store: typeof routes['impersonates.store']
  }
  admin: {
    settings: {
      show: typeof routes['admin.settings.show']
      update: typeof routes['admin.settings.update']
    }
  }
  adminRoles: {
    index: typeof routes['admin_roles.index']
    create: typeof routes['admin_roles.create']
    store: typeof routes['admin_roles.store']
    show: typeof routes['admin_roles.show']
    edit: typeof routes['admin_roles.edit']
    update: typeof routes['admin_roles.update']
    destroy: typeof routes['admin_roles.destroy']
  }
  settings: {
    index: typeof routes['settings.index']
  }
  profile: typeof routes['profile'] & {
    show: typeof routes['profile.show']
  }
  tokens: {
    index: typeof routes['tokens.index']
    destroy: typeof routes['tokens.destroy']
    store: typeof routes['tokens.store']
  }
  password: typeof routes['password'] & {
    show: typeof routes['password.show']
  }
  verification: {
    wait: typeof routes['verification.wait']
    token: typeof routes['verification.token']
    resend: typeof routes['verification.resend']
  }
  account: typeof routes['account'] & {
    preferences: {
      update: typeof routes['account.preferences.update']
    }
    delete: typeof routes['account.delete']
  }
  configuration: {
    campus: {
      show: typeof routes['configuration.campus.show']
    }
    program: {
      show: typeof routes['configuration.program.show']
    }
  }
  ban: {
    show: typeof routes['ban.show']
  }
}

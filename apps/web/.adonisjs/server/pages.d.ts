import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/forgot_password': ExtractProps<(typeof import('../../app/auth/ui/pages/forgot_password.tsx'))['default']>
    'auth/reset_password': ExtractProps<(typeof import('../../app/auth/ui/pages/reset_password.tsx'))['default']>
    'auth/sign_in': ExtractProps<(typeof import('../../app/auth/ui/pages/sign_in.tsx'))['default']>
    'auth/sign_up': ExtractProps<(typeof import('../../app/auth/ui/pages/sign_up.tsx'))['default']>
    'core/errors/not_found': ExtractProps<(typeof import('../../app/core/ui/pages/errors/not_found.tsx'))['default']>
    'core/errors/server_error': ExtractProps<(typeof import('../../app/core/ui/pages/errors/server_error.tsx'))['default']>
    'dashboard/admin/index': ExtractProps<(typeof import('../../app/dashboard/ui/pages/admin/index.tsx'))['default']>
    'dashboard/admin/roles/edit': ExtractProps<(typeof import('../../app/dashboard/ui/pages/admin/roles/edit.tsx'))['default']>
    'dashboard/admin/roles/index': ExtractProps<(typeof import('../../app/dashboard/ui/pages/admin/roles/index.tsx'))['default']>
    'dashboard/admin/users': ExtractProps<(typeof import('../../app/dashboard/ui/pages/admin/users.tsx'))['default']>
    'dashboard/index': ExtractProps<(typeof import('../../app/dashboard/ui/pages/index.tsx'))['default']>
    'dashboard/users/profile': ExtractProps<(typeof import('../../app/dashboard/ui/pages/users/profile.tsx'))['default']>
    'users/configuration/select-campus': ExtractProps<(typeof import('../../app/users/ui/pages/configuration/select-campus.tsx'))['default']>
    'users/configuration/select-program': ExtractProps<(typeof import('../../app/users/ui/pages/configuration/select-program.tsx'))['default']>
    'users/moderation/banned': ExtractProps<(typeof import('../../app/users/ui/pages/moderation/banned.tsx'))['default']>
    'users/password': ExtractProps<(typeof import('../../app/users/ui/pages/password.tsx'))['default']>
    'users/profile': ExtractProps<(typeof import('../../app/users/ui/pages/profile.tsx'))['default']>
    'users/tokens': ExtractProps<(typeof import('../../app/users/ui/pages/tokens.tsx'))['default']>
    'users/verification/failed': ExtractProps<(typeof import('../../app/users/ui/pages/verification/failed.tsx'))['default']>
    'users/verification/success': ExtractProps<(typeof import('../../app/users/ui/pages/verification/success.tsx'))['default']>
    'users/verification/wait': ExtractProps<(typeof import('../../app/users/ui/pages/verification/wait.tsx'))['default']>
  }
}

import type { SimpleTFunction } from '#common/ui/hooks/use_translation'

import {
  Settings2,
  Shield,
  Users,
  User,
} from 'lucide-react'

import type { NavMainItem, NavUserOptionsGroup } from '#common/ui/types/navigation'

export function getNavUser(_: SimpleTFunction): NavUserOptionsGroup[] {
  return [
    [
      {
        title: 'Mon Profil',
        url: '/dashboard/users/me',
        icon: User,
      },
      {
        title: 'Paramètres',
        url: '/settings/',
        icon: Settings2,
      },
    ],
  ]
}

export function getNavMain(t: SimpleTFunction): NavMainItem[] {
  return [
    {
      title: 'ADMINISTRATION',
      items: [
        {
          title: 'Paramètres',
          url: '/dashboard/admin/settings',
          icon: Settings2,
          subject: 'website_settings',
        },
        {
          title: t('common.layout.navMain.users'),
          url: '/dashboard/users',
          icon: Users,
          subject: 'user',
        },
        {
          title: 'Rôles & Permissions',
          url: '/dashboard/admin/roles',
          icon: Shield,
          subject: 'role',
        },
      ],
    },
  ]
}

export function getNavHome(_: SimpleTFunction): NavMainItem[] {
  return []
}

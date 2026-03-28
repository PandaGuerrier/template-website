import AppSidebarLayout from '#common/ui/components/app_sidebar_layout'
import AppHeaderLayout from '#common/ui/components/app_header_layout'

import useUser from '#auth/ui/hooks/use_user'
import { useTranslation } from '#common/ui/hooks/use_translation'

import { ThemeProvider } from '@workspace/ui/components/theme-provider'
import { Toaster } from '@workspace/ui/components/sonner'
import { toast } from '@workspace/ui/hooks/use-toast'

import { getNavHome, getNavMain, getNavUser } from '#common/ui/config/navigation.config'
import PostHogTracker from '#common/ui/components/posthog_tracker'
import ImpersonateBanner from '#dashboard/ui/components/impersonate_banner'
import { ReactNode, useEffect } from 'react'
import usePageProps from '#common/ui/hooks/use_page_props'

interface BreadcrumbItemProps {
  label: string
  href?: string
}

interface AppLayoutProps extends React.PropsWithChildren {
  breadcrumbs?: BreadcrumbItemProps[]
  layout?: 'sidebar' | 'header'
  mobileLeftElement?: ReactNode
  removePadding?: boolean
}

export default function AppLayout({
  children,
  breadcrumbs = [],
  layout = 'header',
  mobileLeftElement,
  removePadding = false,
}: AppLayoutProps) {
  const user = useUser()
  const { t } = useTranslation()
  const { flashMessages } = usePageProps<{ flashMessages: Record<string, any> }>()

  useEffect(() => {
    if (flashMessages?.errorsBag?.E_TOO_MANY_REQUESTS) {
      toast('Hep, tu vas trop vite !', { description: flashMessages.errorsBag.E_TOO_MANY_REQUESTS })
    }
  }, [flashMessages])

  const navMain = getNavMain(t)
  const navUser = getNavUser(t)
  const navHome = getNavHome(t)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <PostHogTracker />
      <ImpersonateBanner />
      {layout === 'header' ? (
        <AppHeaderLayout
          user={user}
          navMain={navHome}
          navUser={navUser}
          breadcrumbs={breadcrumbs}
        >
          {children}
        </AppHeaderLayout>
      ) : (
        <AppSidebarLayout
          user={user}
          navMain={navMain}
          navUser={navUser}
          breadcrumbs={breadcrumbs}
          mobileLeftElement={mobileLeftElement}
          removePadding={removePadding}
        >
          {children}
        </AppSidebarLayout>
      )}
    </ThemeProvider>
  )
}

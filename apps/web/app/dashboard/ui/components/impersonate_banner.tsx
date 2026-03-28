import { router } from '@inertiajs/react'
import { LogOut, UserRoundCog } from 'lucide-react'
import { useState } from 'react'

import usePageProps from '#common/ui/hooks/use_page_props'

import { Button } from '@workspace/ui/components/button'

interface ImpersonatingProps {
  token: string
  originalUserId: string
}

export default function ImpersonateBanner() {
  const { impersonating } = usePageProps<{ impersonating: ImpersonatingProps | null }>()
  const [isLoading, setIsLoading] = useState(false)

  if (!impersonating) return null

  function handleStop() {
    if (!impersonating) return
    setIsLoading(true)
    router.delete('/dashboard/admin/users/impersonate', {
      data: { token: impersonating.token },
      onFinish: () => setIsLoading(false),
    })
  }

  return (
    <div className="fixed bottom-18 md:bottom-4 right-4 z-50 flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar px-4 py-3 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sidebar-foreground">
        <UserRoundCog className="h-4 w-4 shrink-0" />
        <div className="flex flex-col">
          <span className="text-xs font-semibold leading-tight">Mode impersonation</span>
        </div>
      </div>
      <Button
        size="sm"
        variant="destructive"
        disabled={isLoading}
        onClick={handleStop}
      >
        <LogOut className="h-3 w-3" />
        Revenir
      </Button>
    </div>
  )
}

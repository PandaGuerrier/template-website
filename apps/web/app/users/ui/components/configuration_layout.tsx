import { ReactNode } from 'react'
import { Main } from '#common/ui/components/main'
import AppLayout from '#common/ui/components/app_layout'

export default function ConfigurationLayout({ children }: { children: ReactNode }) {
  return (
    <AppLayout layout={'sidebar'} breadcrumbs={[{ label: 'Configuration' }]}>
      <Main>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <section className="max-w-xl space-y-12">{children}</section>
        </div>
      </Main>
    </AppLayout>
  )
}

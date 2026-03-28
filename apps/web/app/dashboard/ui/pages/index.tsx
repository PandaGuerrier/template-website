import { useEffect } from 'react'
import { router } from '@inertiajs/react'

export default function Page() {
  useEffect(() => {
    router.visit('/dashboard/users')
  }, [])

  return null
}

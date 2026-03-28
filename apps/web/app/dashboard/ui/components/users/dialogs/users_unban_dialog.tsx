import { useForm } from '@inertiajs/react'

import { Button } from '@workspace/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@workspace/ui/components/dialog'
import { toast } from '@workspace/ui/hooks/use-toast'
import type UserDto from '#users/dtos/user'

interface Props {
  currentRow?: UserDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersUnBanDialog({ currentRow, open, onOpenChange }: Props) {
  const { data, setData, errors, clearErrors, reset, ...form } = useForm()

  function handleSubmit() {
    form.delete('/users/unban/' + currentRow?.uuid, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        onOpenChange(false)
        setTimeout(() => {
          reset()
          clearErrors()
        }, 500)
        toast('Ban réussi', {
          description: (
            <div className="mt-2 max-w-[320px] overflow-x-auto rounded-md bg-background p-4">
              <pre className="text-foreground whitespace-pre-wrap wrap-break-word">
                Utilisateur débanni avec succès.
              </pre>
            </div>
          ),
        })
      },
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        setTimeout(() => {
          reset()
          clearErrors()
        }, 500)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            Débannir l'utilisateur {currentRow?.fullName} ({currentRow?.email})
          </DialogTitle>
          <DialogDescription>
            Veuillez confirmer que vous souhaitez débannir cet utilisateur.
          </DialogDescription>
        </DialogHeader>
        <DialogDescription>
          En débannissant cet utilisateur, il retrouvera l'accès à son compte et pourra interagir à
          nouveau avec la plateforme conformément aux règles et politiques en vigueur.
        </DialogDescription>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Débannir l'utilisateur</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

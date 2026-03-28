import { FormEvent, useEffect, useState } from 'react'
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
import { ScrollArea } from '@workspace/ui/components/scroll-area'
import { Input } from '@workspace/ui/components/input'
import { Field, FieldLabel } from '@workspace/ui/components/field'
import { toast } from '@workspace/ui/hooks/use-toast'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@workspace/ui/components/select'
import { FieldErrorBag } from '@workspace/ui/components/field-error-bag'

import type UserDto from '#users/dtos/user'
import { DateTime } from 'luxon'
import { Switch } from '@workspace/ui/components/switch'
import { Label } from '@workspace/ui/components/label'

interface Props {
  currentRow?: UserDto
  open: boolean
  onOpenChange: (open: boolean) => void
}

const now = DateTime.now()

const durations = [
  { id: 0, label: '1 heure', value: now.plus({ hours: 1 }) },
  { id: 0, label: '6 heures', value: now.plus({ hours: 6 }) },
  { id: 0, label: '12 heures', value: now.plus({ hours: 12 }) },
  { id: 0, label: '1 jour', value: now.plus({ days: 1 }) },
  { id: 0, label: '3 jours', value: now.plus({ days: 3 }) },
  { id: 0, label: '7 jours', value: now.plus({ days: 7 }) },
  { id: 0, label: '30 jours', value: now.plus({ days: 30 }) },
  { id: 0, label: 'Permanent', value: null },
]

export function UsersBanDialog({ currentRow, open, onOpenChange }: Props) {
  const [date, setDate] = useState<typeof durations[0] | null>(null)

  const { data, setData, errors, post, clearErrors, reset } = useForm({
    userUuid: currentRow ? currentRow.uuid : '',
    reason: '',
    deletePosts: false,
    expiresAt: DateTime.now().toISO() as string | null,
  })

  useEffect(() => {
    if (date) {
      setData('expiresAt', date.value ? date.value.toISO() : null)
    } else {
      setData('expiresAt', null)
    }
  }, [date])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    post('/users/ban', {
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
                Utilisateur banni avec succès.
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
            Bannir l'utilisateur {currentRow?.fullName} ({currentRow?.email})
          </DialogTitle>
          <DialogDescription>
            Veuillez confirmer le bannissement de cet utilisateur en fournissant une raison et une
            date d'expiration (optionnelle).
          </DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <form id="user-form" onSubmit={handleSubmit} className="space-y-4 p-0.5">
            <Field>
              <FieldLabel htmlFor="fullName">Raison</FieldLabel>
              <Input
                id="reason"
                placeholder={'Raison du ban'}
                value={data.reason}
                onChange={(element) => setData('reason', element.target.value)}
                className={`${errors?.reason ? 'border-destructive' : ''}`}
              />
              <FieldErrorBag errors={errors} field="reason" />
            </Field>

            <Field>
              <FieldLabel htmlFor="passwordConfirmation">
                Date d'expiration (optionnelle)
              </FieldLabel>
              <Select
                value={date?.value?.toISO()}
                onValueChange={(v) =>
                  setDate(
                    durations.find(
                      (d) => d.value?.toISO() === v || (d.value === null && v === 'null')
                    ) || null
                  )
                }
              >
                <SelectTrigger className={`${errors?.expiresAt ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Combien de temps ?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {durations.map((dur) => {
                      return (
                        <SelectItem key={dur.id} value={dur.value ? dur.value.toISO() : 'null'}>
                          <span className="flex gap-x-2 items-center">
                            <span className="capitalize text-sm">{dur.label}</span>
                          </span>
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldErrorBag errors={errors} field="expiresAt" />
            </Field>
            <div className="flex items-center space-x-2">
              <Switch
                id="ano"
                checked={data.deletePosts}
                onCheckedChange={(checked) => setData('deletePosts', Boolean(checked))}
              />
              <Label htmlFor="ano">Supprimer tous les posts de cet utilisateur ?</Label>
            </div>
          </form>
        </ScrollArea>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button type="submit" form="user-form" variant={'destructive'}>
            Bannir l'utilisateur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

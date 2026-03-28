import { useUsers } from '#users/ui/context/users_context'
import { UsersActionDialog } from '#dashboard/ui/components/users/dialogs/users_action_dialog'
import { UsersDeleteDialog } from '#dashboard/ui/components/users/dialogs/users_delete_dialog'
import { UsersInviteDialog } from '#dashboard/ui/components/users/dialogs/users_invite_dialog'
import { UsersImpersonateDialog } from '#dashboard/ui/components/users/dialogs/users_impersonate_dialog'
import { UsersBanDialog } from '#dashboard/ui/components/users/dialogs/users_ban_dialog'
import { UsersUnBanDialog } from '#dashboard/ui/components/users/dialogs/users_unban_dialog'
import RoleDto from '#users/dtos/role'

export function UsersDialogs({ roles }: { roles: RoleDto[] }) {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  return (
    <>
      <UsersActionDialog
        key="user-add"
        roles={roles}
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <UsersInviteDialog
        key="user-invite"
        roles={roles}
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <UsersBanDialog
            key={`user-ban-${currentRow.uuid}`}
            open={open === 'ban'}
            onOpenChange={() => {
              setOpen('ban')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <UsersUnBanDialog
            key={`user-unban-${currentRow.uuid}`}
            open={open === 'unban'}
            onOpenChange={() => {
              setOpen('unban')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
          <UsersImpersonateDialog
            key={`user-impersonate-${currentRow.uuid}`}
            open={open === 'impersonate'}
            onOpenChange={() => {
              setOpen('impersonate')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <UsersActionDialog
            key={`user-edit-${currentRow.uuid}`}
            roles={roles}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <UsersDeleteDialog
            key={`user-delete-${currentRow.uuid}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}

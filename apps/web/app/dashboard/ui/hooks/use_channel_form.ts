import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import type { AccessRule, Channel } from '#dashboard/ui/components/channels/types'

export function useChannelForm() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null)

  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formRules, setFormRules] = useState<AccessRule[]>([])

  const createForm = useForm({
    name: '',
    description: '',
    rules: [] as AccessRule[],
  })

  const editForm = useForm({
    name: '',
    description: '',
    rules: [] as AccessRule[],
  })

  const { delete: destroy } = useForm()

  const resetForm = () => {
    setFormName('')
    setFormDescription('')
    setFormRules([])
  }

  const openCreate = () => {
    resetForm()
    setIsCreateOpen(true)
  }

  const openEdit = (channel: Channel) => {
    setEditingChannel(channel)
    setFormName(channel.name)
    setFormDescription(channel.description || '')
    setFormRules(
      channel.accessRules?.map((r) => ({
        type: r.type as 'role' | 'campus',
        value: r.value,
        action: r.action as 'view' | 'write',
        operator: r.operator,
      })) || []
    )
    setIsEditOpen(true)
  }

  const handleCreate = () => {
    createForm.setData({
      name: formName,
      description: formDescription,
      rules: formRules,
    })
    createForm.post('/channels', {
      onSuccess: () => {
        setIsCreateOpen(false)
        resetForm()
      },
    })
  }

  const handleEdit = () => {
    if (!editingChannel) return
    editForm.setData({
      name: formName,
      description: formDescription,
      rules: formRules,
    })
    editForm.put(`/channels/${editingChannel.uuid}`, {
      onSuccess: () => {
        setIsEditOpen(false)
        setEditingChannel(null)
        resetForm()
      },
    })
  }

  const handleDelete = (uuid: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce channel ?')) {
      destroy(`/channels/${uuid}`)
    }
  }

  return {
    // Create modal
    isCreateOpen,
    setIsCreateOpen,
    openCreate,
    handleCreate,
    createProcessing: createForm.processing,

    // Edit modal
    isEditOpen,
    setIsEditOpen,
    editingChannel,
    openEdit,
    handleEdit,
    editProcessing: editForm.processing,

    // Form state
    formName,
    setFormName,
    formDescription,
    setFormDescription,
    formRules,
    setFormRules,

    // Delete
    handleDelete,
  }
}

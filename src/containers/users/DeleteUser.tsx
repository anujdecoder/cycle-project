import React from 'react'
import ConfirmDialog from '../../components/ConfirmDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getFunctions, httpsCallable } from 'firebase/functions'
import FirestoreService from '../../services/FirestoreService'
import { UsersCollection } from '../../configs/firestore'

interface Props {
  userId: string
  open: boolean
  onClose: () => void
}

const functions = getFunctions()

const DeleteUser: React.FC<Props> = ({ userId, open, onClose }) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation<any, any, void, any>(
    async () => {
      const deleteUser = httpsCallable(functions, 'deleteUser')
      await deleteUser({
        userId
      })
      return FirestoreService.deleteDocument(UsersCollection, userId)
    },
    {
      mutationKey: ['inviteUser'],
      onSuccess: async () => {
        await queryClient.invalidateQueries(['listUsers'])
        onClose()
      }
    }
  )

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title={'Delete User'}
      message={'Are you sure you want to continue?'}
      loading={isLoading}
      onConfirm={mutateAsync}
    />
  )
}

export default DeleteUser

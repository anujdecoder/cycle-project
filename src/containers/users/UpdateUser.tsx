import React from 'react'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '../../types/users'
import FirestoreService from '../../services/FirestoreService'
import { UsersCollection } from '../../configs/firestore'
import { omit } from 'lodash-es'
import UserForm from './components/UserForm'

interface Props {
  open: boolean
  onClose: () => void
  user: User
}

const formId = 'update-user-form'
const functions = getFunctions()

const UpdateUser: React.FC<Props> = ({ open, onClose, user }) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation<any, any, User, any>(
    async input => {
      await FirestoreService.updateDocument({
        id: user.id,
        collection: UsersCollection,
        document: omit(input, 'password'),
      })
      if (input.manager !== user.manager) {
        const updateRole = httpsCallable(functions, 'updateRole')
        await updateRole({
          userId: user.id,
          manager: input!.manager,
        })
      }
    },
    {
      mutationKey: ['updateUser'],
      onSuccess: async () => {
        await queryClient.invalidateQueries(['listUsers'])
        onClose()
      },
    }
  )

  const handleSubmit = async (input: User) => {
    await mutateAsync(input)
  }
  return (
    <UserForm
      formId={formId}
      open={open}
      onClose={onClose}
      title="Update User"
      submitLabel="Update"
      onSubmit={handleSubmit}
      loading={isLoading}
      hidePassword
      user={user}
    />
  )
}

export default UpdateUser

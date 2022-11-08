import React from "react"
import { getFunctions, httpsCallable } from "firebase/functions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { User } from "../../types/users"
import FirestoreService from "../../services/FirestoreService"
import { UsersCollection } from "../../configs/firestore"
import { omit } from "lodash-es"
import UserForm from "./components/UserForm"

interface Props {
  open: boolean
  onClose: () => void
}

const formId = "create-user-form"
const functions = getFunctions()

const CreateUser: React.FC<Props> = ({ open, onClose }) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation<any, any, User, any>(
    async user => {
      const createUser = httpsCallable(functions, "createUser")
      const resp = await createUser({
        firstName: user!.firstName,
        lastName: user!.lastName,
        email: user!.email,
        password: user!.password,
        manager: user!.manager,
      })
      return FirestoreService.createDocument({
        collection: UsersCollection,
        document: { ...omit(user, "password"), id: resp.data + "" },
      })
    },
    {
      mutationKey: ["inviteUser"],
      onSuccess: async () => {
        await queryClient.invalidateQueries(["listUsers"])
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
      title="Invite User"
      submitLabel="Invite"
      onSubmit={handleSubmit}
      loading={isLoading}
    />
  )
}

export default CreateUser

import React from 'react'
import MainLayout from '../../components/MainLayout'
import UsersTable from './components/UsersTable'
import { useQuery } from '@tanstack/react-query'
import FirestoreService from '../../services/FirestoreService'
import { UsersCollection } from '../../configs/firestore'
import { User } from '../../types/users'
import { CircularProgress } from '@mui/material'

interface Props {}

const Users: React.FC<Props> = () => {
  const { data, isLoading } = useQuery(['listUsers'], async () => {
    const response = await FirestoreService.readDocuments({
      collectionName: UsersCollection,
      queries: []
    })
    return response.docs.map((userDoc) => {
      return userDoc.data() as User
    })
  })

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <MainLayout title={'Users'} addTooltip="Invite a new user">
      <UsersTable users={data!} />
    </MainLayout>
  )
}

export default Users

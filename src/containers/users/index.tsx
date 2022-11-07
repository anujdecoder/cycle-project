import React from 'react'
import MainLayout from '../../components/MainLayout'
import UsersTable from './components/UsersTable'
import { useQuery } from '@tanstack/react-query'
import FirestoreService from '../../services/FirestoreService'
import { UsersCollection } from '../../configs/firestore'
import { User } from '../../types/users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Loading from '../../components/Loading'

interface Props {}

const Users: React.FC<Props> = () => {
  const { data, isLoading } = useQuery(['listUsers'], async () => {
    const response = await FirestoreService.readDocuments({
      collectionName: UsersCollection,
      queries: [],
    })
    return response.docs.map(userDoc => {
      return userDoc.data() as User
    })
  })
  const [openCreate, setOpenCreate] = React.useState(false)
  const [openUpdate, setOpenUpdate] = React.useState(false)
  const userRef = React.useRef<User | null>(null)

  if (isLoading) {
    return <Loading />
  }

  const handleUpdate = (u: User) => {
    userRef.current = u
    setOpenUpdate(true)
  }
  const closeUpdateForm = () => {
    userRef.current = null
    setOpenUpdate(false)
  }

  return (
    <MainLayout
      title={'Users'}
      addTooltip="Invite a new user"
      onAddClick={() => setOpenCreate(true)}
    >
      <UsersTable users={data!} onEdit={handleUpdate} />
      {openCreate && <CreateUser open={openCreate} onClose={() => setOpenCreate(false)} />}
      {openUpdate && (
        <UpdateUser open={openUpdate} onClose={closeUpdateForm} user={userRef.current!} />
      )}
    </MainLayout>
  )
}

export default Users

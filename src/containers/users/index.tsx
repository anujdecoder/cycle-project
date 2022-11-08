import React from "react"
import MainLayout from "../../components/MainLayout"
import UsersTable from "./components/UsersTable"
import CreateUser from "./CreateUser"
import UpdateUser from "./UpdateUser"
import useUserDialogs from "./hooks/useUserDialogs"
import useFetchUsers from "./hooks/useFetchUsers"

const Users: React.FC = () => {
  const { users, loading, sortBy, sortDirection, onSort, loadMore } = useFetchUsers()
  const {
    showCreateDialog,
    onShowCreateDialog,
    onCloseCreateDialog,
    user,
    showUpdateDialog,
    onShowUpdateDialog,
    onCloseUpdateDialog,
  } = useUserDialogs()

  return (
    <MainLayout title="Users" addTooltip="Invite a new user" onAddClick={onShowCreateDialog}>
      <UsersTable
        users={users!}
        onEdit={onShowUpdateDialog}
        loading={loading}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
        loadMore={loadMore}
      />
      {showCreateDialog && <CreateUser open={showCreateDialog} onClose={onCloseCreateDialog} />}
      {showUpdateDialog && (
        <UpdateUser open={showUpdateDialog} onClose={onCloseUpdateDialog} user={user!} />
      )}
    </MainLayout>
  )
}

export default Users

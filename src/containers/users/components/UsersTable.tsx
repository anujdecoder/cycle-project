import React from 'react'
import { User } from '../../../types/users'
import DataTable from '../../../components/DataTable'
import { GridColDef } from '@mui/x-data-grid'
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams'

interface Props {
  users: User[]
}

const UsersTable: React.FC<Props> = ({ users }) => {
  const columns: GridColDef[] = React.useMemo(
    () => [
      { field: 'firstName', headerName: 'First Name', width: 180 },
      { field: 'lastName', headerName: 'Last Name', width: 180 },
      { field: 'email', headerName: 'Email', width: 180 },
      {
        field: 'manager',
        headerName: 'Role',
        width: 100,
        sortable: false,
        valueGetter: ({ row }: GridValueGetterParams<string, User>) => (row.manager ? 'Manager' : 'User')
      }
    ],
    []
  )
  return <DataTable localeText={{ noRowsLabel: 'No users' }} columns={columns} rows={users} />
}

export default UsersTable

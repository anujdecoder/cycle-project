import React from 'react'
import { User } from '../../../types/users'
import DataTable from '../../../components/DataTable'
import { GridColDef } from '@mui/x-data-grid'
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams'
import { Button } from '@mui/material'

interface Props {
  users: User[]
  onEdit: (user: User) => void
}

const UsersTable: React.FC<Props> = ({ users, onEdit }) => {
  const columns: GridColDef[] = React.useMemo(
    () => [
      { field: 'firstName', headerName: 'First Name', flex: 3 },
      { field: 'lastName', headerName: 'Last Name', flex: 3 },
      { field: 'email', headerName: 'Email', flex: 5 },
      {
        field: 'manager',
        headerName: 'Role',
        flex: 2,
        sortable: false,
        valueGetter: ({ row }: GridValueGetterParams<string, User>) =>
          row.manager ? 'Manager' : 'User',
      },
      {
        field: 'update',
        flex: 2,
        sortable: false,
        headerName: '',
        renderCell: ({ row }: GridValueGetterParams<string, User>) => (
          <Button size="small" variant="text" onClick={() => onEdit(row)}>
            Edit
          </Button>
        ),
      },
    ],
    [onEdit]
  )
  return <DataTable localeText={{ noRowsLabel: 'No users' }} columns={columns} rows={users} />
}

export default UsersTable

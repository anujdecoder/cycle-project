import React from "react"
import { User, UserSortDirection, UserSortFields } from "../../../types/users"
import DataTable from "../../../components/DataTable"
import { GridColDef } from "@mui/x-data-grid"
import { GridValueGetterParams } from "@mui/x-data-grid/models/params/gridCellParams"
import { Button } from "@mui/material"
import { GridSortDirection, GridSortModel } from "@mui/x-data-grid/models/gridSortModel"

interface Props {
  users: User[]
  onEdit: (user: User) => void
  sortBy?: UserSortFields
  sortDirection?: UserSortDirection
  onSort?: (sortBy: UserSortFields, sortDirection: UserSortDirection) => void
  loading: boolean
  loadMore?: () => void
}

const UsersTable: React.FC<Props> = ({
  users,
  onEdit,
  sortBy,
  sortDirection,
  onSort,
  loading,
  loadMore,
}) => {
  const columns: GridColDef[] = React.useMemo(
    () => [
      { field: "firstName", headerName: "First Name", flex: 3 },
      { field: "lastName", headerName: "Last Name", flex: 3 },
      { field: "email", headerName: "Email", flex: 5 },
      {
        field: "manager",
        headerName: "Role",
        flex: 2,
        valueGetter: ({ row }: GridValueGetterParams<string, User>) =>
          row.manager ? "Manager" : "User",
      },
      {
        field: "update",
        flex: 2,
        sortable: false,
        headerName: "",
        renderCell: ({ row }: GridValueGetterParams<string, User>) => (
          <Button size="small" variant="text" onClick={() => onEdit(row)}>
            Edit
          </Button>
        ),
      },
    ],
    [onEdit]
  )

  const handleSortModalChange = (model: GridSortModel) => {
    if (model.length && onSort) {
      onSort(model[0].field as UserSortFields, model[0].sort as UserSortDirection)
    }
  }

  return (
    <DataTable
      localeText={{ noRowsLabel: loading ? "" : "No users" }}
      columns={columns}
      rows={users}
      sortModel={[{ field: sortBy ?? "", sort: sortDirection as GridSortDirection }]}
      onSortModelChange={handleSortModalChange}
      loading={loading}
      loadMore={loadMore}
    />
  )
}

export default UsersTable

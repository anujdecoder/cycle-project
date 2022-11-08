import React from 'react'
import MainLayout from '../../components/MainLayout'
import UsersTable from './components/UsersTable'
import { useInfiniteQuery } from '@tanstack/react-query'
import FirestoreService from '../../services/FirestoreService'
import { UsersCollection } from '../../configs/firestore'
import { User, UserSortDirection, UserSortFields } from '../../types/users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import { useImmer } from 'use-immer'

interface State {
  showCreate: boolean
  showUpdate: boolean
  user: User | null
  sortBy?: UserSortFields
  sortDirection?: UserSortDirection
}

const PAGE_SIZE = 20

const Users: React.FC = () => {
  const { data, isFetching, refetch, fetchNextPage } = useInfiniteQuery(
    ['listUsers'],
    async ({ pageParam }) => {
      if (pageParam === '') {
        return []
      }
      const response = await FirestoreService.readDocuments({
        collectionName: UsersCollection,
        queries: [],
        orderByField: state.sortBy || 'id',
        orderByDirection: state.sortDirection || 'desc',
        pageSize: PAGE_SIZE,
        cursorId: pageParam,
      })
      return response.docs.map(userDoc => {
        return userDoc.data() as User
      })
    },
    {
      keepPreviousData: true,
      getNextPageParam: lastPage =>
        lastPage.length === PAGE_SIZE ? lastPage[PAGE_SIZE - 1].id : '',
    }
  )
  const users = React.useMemo(() => data?.pages.flatMap(page => page) || [], [data])
  const [state, setState] = useImmer<State>({
    showCreate: false,
    showUpdate: false,
    user: null,
  })

  const handleUpdate = React.useCallback(
    (u: User) => {
      setState(draft => {
        draft.user = u
        draft.showUpdate = true
      })
    },
    [setState]
  )
  const closeUpdateForm = () => {
    setState(draft => {
      draft.user = null
      draft.showUpdate = false
    })
  }
  const openCreateModal = () => {
    setState(draft => {
      draft.showCreate = true
    })
  }
  const closeCreateModal = () => {
    setState(draft => {
      draft.showCreate = false
    })
  }
  const handleSortChange = (sortBy: UserSortFields, sortDirection: UserSortDirection) => {
    setState(draft => {
      draft.sortBy = sortBy
      draft.sortDirection = sortDirection
    })
  }
  React.useEffect(() => {
    refetch()
  }, [state.sortBy, state.sortDirection, refetch])

  return (
    <MainLayout title="Users" addTooltip="Invite a new user" onAddClick={openCreateModal}>
      <UsersTable
        users={users!}
        onEdit={handleUpdate}
        loading={isFetching}
        sortBy={state.sortBy}
        sortDirection={state.sortDirection}
        onSort={handleSortChange}
        loadMore={fetchNextPage}
      />
      {state.showCreate && <CreateUser open={state.showCreate} onClose={closeCreateModal} />}
      {state.showUpdate && (
        <UpdateUser open={state.showUpdate} onClose={closeUpdateForm} user={state.user!} />
      )}
    </MainLayout>
  )
}

export default Users

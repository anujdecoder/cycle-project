import React from "react"
import { useImmer } from "use-immer"
import { User, UserSortDirection, UserSortFields } from "../../../types/users"
import { useInfiniteQuery } from "@tanstack/react-query"
import FirestoreService from "../../../services/FirestoreService"
import { UsersCollection } from "../../../configs/firestore"

interface State {
  sortBy: UserSortFields
  sortDirection: UserSortDirection
}

const PAGE_SIZE = 20

const useFetchUsers = () => {
  const [state, setState] = useImmer<State>({
    sortBy: UserSortFields.ID,
    sortDirection: UserSortDirection.DESC,
  })

  const { data, isFetching, refetch, fetchNextPage } = useInfiniteQuery(
    ["listUsers"],
    async ({ pageParam }) => {
      if (pageParam === -1) {
        return []
      }
      const response = await FirestoreService.readDocuments({
        collectionName: UsersCollection,
        queries: [],
        orderByField: state.sortBy,
        orderByDirection: state.sortDirection,
        pageSize: PAGE_SIZE,
        cursorId: pageParam,
      })
      return response.docs.map(userDoc => userDoc.data() as User)
    },
    {
      keepPreviousData: true,
      getNextPageParam: lastPage =>
        lastPage.length === PAGE_SIZE ? lastPage[PAGE_SIZE - 1].id : -1,
    }
  )

  React.useEffect(() => {
    refetch()
  }, [state.sortBy, state.sortDirection, refetch])

  const onSort = React.useCallback(
    (sortBy: UserSortFields, sortDirection: UserSortDirection) => {
      setState(draft => {
        draft.sortBy = sortBy
        draft.sortDirection = sortDirection
      })
    },
    [setState]
  )

  const users = React.useMemo(() => data?.pages.flatMap(page => page) || [], [data])

  return {
    ...state,
    users,
    onSort,
    loading: isFetching,
    loadMore: fetchNextPage,
  }
}

export default useFetchUsers

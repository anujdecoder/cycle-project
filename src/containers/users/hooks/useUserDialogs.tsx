import React from "react"
import { User } from "../../../types/users"
import { useImmer } from "use-immer"

interface State {
  showCreateDialog: boolean
  showUpdateDialog: boolean
  user: User | null
}

const useUserDialogs = () => {
  const [state, setState] = useImmer<State>({
    showCreateDialog: false,
    showUpdateDialog: false,
    user: null,
  })
  const onShowUpdateDialog = React.useCallback(
    (u: User) => {
      setState(draft => {
        draft.user = u
        draft.showUpdateDialog = true
      })
    },
    [setState]
  )
  const onCloseUpdateDialog = React.useCallback(() => {
    setState(draft => {
      draft.user = null
      draft.showUpdateDialog = false
    })
  }, [setState])

  const onShowCreateDialog = React.useCallback(() => {
    setState(draft => {
      draft.showCreateDialog = true
    })
  }, [setState])
  const onCloseCreateDialog = React.useCallback(() => {
    setState(draft => {
      draft.showCreateDialog = false
    })
  }, [setState])

  return {
    ...state,
    onShowCreateDialog,
    onCloseCreateDialog,
    onShowUpdateDialog,
    onCloseUpdateDialog,
  }
}

export default useUserDialogs

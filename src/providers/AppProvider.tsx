import React, { useCallback } from 'react'
import { getIdTokenResult, User } from 'firebase/auth'
import { useImmer } from 'use-immer'
import AuthService from '../services/AuthService'
import Loading from '../components/Loading'

interface Props {
  children?: React.ReactNode
}

type AppProviderType = {
  loggedIn: boolean
  user: User | null
  loading: boolean
  manager: boolean
}

const defaultValue: AppProviderType = {
  loggedIn: false,
  user: null,
  loading: true,
  manager: false,
}

const AppContext = React.createContext<AppProviderType>(defaultValue)

export const useApp = () => React.useContext(AppContext)

const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useImmer(defaultValue)
  const handleUserChange = useCallback(
    (user: User | null) => {
      setState(draft => {
        draft.user = user
        draft.loggedIn = !!user
        draft.loading = Boolean(user)
      })
    },
    [setState]
  )
  React.useEffect(() => {
    AuthService.subscribeToAuthChange(handleUserChange)
  }, [handleUserChange])

  React.useEffect(() => {
    if (state.user) {
      const fn = async () => {
        const response = await getIdTokenResult(state.user!)
        let manager = false
        if (response.claims.manager) {
          manager = true
        }
        setState(draft => {
          draft.manager = manager
          draft.loading = false
        })
      }
      fn()
    }
  }, [setState, state.user])

  return (
    <AppContext.Provider value={state}>
      {state.loading ? <Loading /> : children}
    </AppContext.Provider>
  )
}

export default AppProvider

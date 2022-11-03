import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { AppProvider } from './providers'
import Containers from './containers'

function App() {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60,
        refetchOnWindowFocus: true,
        retry: false,
        staleTime: Infinity
      },
      mutations: {
        onError: (e: any) => {
          enqueueSnackbar(e.message, { variant: 'error' })
        }
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Containers />
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App

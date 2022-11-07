import React, { Suspense } from 'react'
import { useApp } from '../providers'
import { Navigate, Outlet } from 'react-router-dom'
import routes from '../configs/routes'
import Loading from '../components/Loading'

const AppGuard: React.FC = () => {
  const { loggedIn } = useApp()

  if (!loggedIn) {
    return <Navigate to={'/' + routes.LOGIN} />
  }

  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  )
}

export default AppGuard

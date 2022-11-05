import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Authenticate from './auth'
import Home from './home'
import routes from '../configs/routes'

const Login = lazy(() => import('./auth/Login'))
const Register = lazy(() => import('./auth/Register'))

const Containers: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />

      <Route element={<Authenticate />}>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Containers

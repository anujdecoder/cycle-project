import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Authenticate from './auth'
import Home from './home'

const Login = lazy(() => import('./auth/Login'))
const Register = lazy(() => import('./auth/Register'))

const Containers: React.FC = () => {
  return (
    <Routes>
      <Route path={'*'} element={<Home />}></Route>

      <Route element={<Authenticate />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Containers

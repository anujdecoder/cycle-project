import React, { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import routes from "../configs/routes"
import AppGuard from "./AppGuard"
import AuthGuard from "./AuthGuard"
import Shell from "./Shell"
import ManagerGuard from "./ManagerGuard"
import Loading from "../components/Loading"

const Login = lazy(() => import("./auth/Login"))
const Register = lazy(() => import("./auth/Register"))
const Reservations = lazy(() => import("./reservations"))
const Bikes = lazy(() => import("./bikes"))
const Users = lazy(() => import("./users"))

const Containers: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<AppGuard />}>
        <Route element={<Shell />}>
          <Route index element={<>Hello world</>} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path={routes.RESERVATIONS} element={<Reservations />} />
          <Route path={routes.BIKES} element={<Bikes />} />
          <Route element={<ManagerGuard />}>
            <Route path={routes.USERS} element={<Users />} />
          </Route>
        </Route>
      </Route>

      <Route element={<AuthGuard />}>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
      </Route>
    </Routes>
  </Suspense>
)

export default Containers

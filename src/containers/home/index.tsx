import React, { lazy } from 'react'
import { SubApp } from '../../types/subApp'
import { FactCheckOutlined, GroupOutlined, TwoWheelerOutlined } from '@mui/icons-material'
import Content from './Content'
import routes from '../../configs/routes'

const Reservations = lazy(() => import('../reservations'))
const Bikes = lazy(() => import('../bikes'))
const Users = lazy(() => import('../users'))

const subApps: SubApp[] = [
  {
    icon: <FactCheckOutlined />,
    title: 'My Reservations',
    path: routes.RESERVATIONS,
    component: Reservations
  },
  {
    icon: <TwoWheelerOutlined />,
    title: 'Bikes',
    path: routes.BIKES,
    component: Bikes
  },
  {
    icon: <GroupOutlined />,
    title: 'Users',
    path: routes.USERS,
    component: Users
  }
]

const HomeRoutes: React.FC = () => <Content subApps={subApps} />

export default HomeRoutes

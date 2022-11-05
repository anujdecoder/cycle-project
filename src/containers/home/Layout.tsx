import React, { lazy } from 'react'
import { SubApp } from '../../types/subApp'
import { FactCheckOutlined, GroupOutlined, TwoWheelerOutlined } from '@mui/icons-material'
import Content from './Content'
import Container from '../../components/Container'

const Reservations = lazy(() => import('../reservations'))
const Bikes = lazy(() => import('../bikes'))
const Users = lazy(() => import('../users'))

const subApps: SubApp[] = [
  {
    icon: <FactCheckOutlined />,
    title: 'My Reservations',
    path: 'reservations',
    component: Reservations
  },
  {
    icon: <TwoWheelerOutlined />,
    title: 'Bikes',
    path: 'bikes',
    component: Bikes
  },
  {
    icon: <GroupOutlined />,
    title: 'Users',
    path: 'users',
    component: Users
  }
]

const Layout: React.FC = () => {
  return (
    <Container>
      <Content subApps={subApps} />
    </Container>
  )
}

export default Layout

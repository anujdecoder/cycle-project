import React, { Suspense } from 'react'
import { SubApp } from '../types/subApp'
import {
  FactCheckOutlined,
  GroupOutlined,
  LogoutOutlined,
  TwoWheelerOutlined,
} from '@mui/icons-material'
import routes from '../configs/routes'
import { Outlet, useNavigate } from 'react-router-dom'
import Flex from '../components/Flex'
import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Loading from '../components/Loading'
import AuthService from '../services/AuthService'
import { useApp } from '../providers'

interface Props {}

export const userApps: SubApp[] = [
  {
    icon: <FactCheckOutlined />,
    title: 'My Reservations',
    path: routes.RESERVATIONS,
  },
  {
    icon: <TwoWheelerOutlined />,
    title: 'Bikes',
    path: routes.BIKES,
  },
]

export const adminApps: SubApp[] = [
  {
    icon: <GroupOutlined />,
    title: 'Users',
    path: routes.USERS,
  },
]

const Shell: React.FC<Props> = () => {
  const navigate = useNavigate()
  const { manager } = useApp()
  const items = React.useMemo(() => {
    const subApps: SubApp[] = [...userApps, ...(manager ? adminApps : [])]
    return subApps.map(i => ({ ...i, onClick: () => navigate(i.path) }))
  }, [navigate, manager])
  const navItems = [
    ...items,
    {
      icon: <LogoutOutlined />,
      title: 'Logout',
      onClick: AuthService.logout, //todo: clear queries
    },
  ]

  return (
    <Flex flex={1} height="100%">
      <NavBar items={navItems} />
      <Container width="100%" className="main-area">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Container>
    </Flex>
  )
}

export default Shell

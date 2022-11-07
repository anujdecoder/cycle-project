import React, { Suspense } from 'react'
import { SubApp } from '../types/subApp'
import { FactCheckOutlined, GroupOutlined, TwoWheelerOutlined } from '@mui/icons-material'
import routes from '../configs/routes'
import { Outlet, useNavigate } from 'react-router-dom'
import Flex from '../components/Flex'
import NavBar from '../components/NavBar'
import Container from '../components/Container'
import Loading from '../components/Loading'

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

const subApps: SubApp[] = [...userApps, ...adminApps]

const Shell: React.FC<Props> = () => {
  const navigate = useNavigate()
  const navItems = React.useMemo(
    () => subApps.map(i => ({ ...i, onClick: () => navigate(i.path) })),
    [navigate]
  )

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

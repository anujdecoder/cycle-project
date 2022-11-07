import React from 'react'
import { SubApp } from '../../types/subApp'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useApp } from '../../providers'
import Flex from '../../components/Flex'
import NavBar from '../../components/NavBar'
import Container from '../../components/Container'

interface Props {
  subApps: SubApp[]
}

const Content: React.FC<Props> = ({ subApps }) => {
  const { manager } = useApp()
  const items = React.useMemo(
    () => (manager ? subApps : subApps.filter(s => !s.adminApp)),
    [subApps, manager]
  )
  const navigate = useNavigate()
  const navItems = React.useMemo(
    () => items.map(i => ({ ...i, onClick: () => navigate(i.path) })),
    [items, navigate]
  )

  return (
    <Flex flex={1} height="100%">
      <NavBar items={navItems} />
      <Container width="100%" className="main-area">
        <Routes>
          {/*<Route index element={<>Hello World</>} />*/}
          {items.map(({ path, component: C }) => (
            <Route path={path} element={<C />} />
          ))}
        </Routes>
      </Container>
    </Flex>
  )
}

export default Content

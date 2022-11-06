import React from 'react'
import Container from './Container'
import { IconButton, Tooltip, Typography } from '@mui/material'
import Flex from './Flex'
import { AddOutlined } from '@mui/icons-material'

interface Props {
  children?: React.ReactNode
  title?: React.ReactNode
  onAddClick?: () => void
  addTooltip?: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children, title, onAddClick, addTooltip = 'Add' }) => {
  return (
    <Container className="main-layout" pt={4} px={8}>
      <Flex py={2} justifyContent="space-between" className="header">
        <Typography variant="h6">{title}</Typography>
        <Flex alignItems="center">
          {
            <Tooltip title={addTooltip}>
              <IconButton onClick={onAddClick} sx={{ borderColor: 'divider', borderWidth: 1, borderStyle: 'solid' }}>
                <AddOutlined />
              </IconButton>
            </Tooltip>
          }
        </Flex>
      </Flex>
      <Container className="body">{children}</Container>
    </Container>
  )
}

export default MainLayout

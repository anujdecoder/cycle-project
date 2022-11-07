import React from 'react'
import Container from './Container'
import { IconButton, Paper, Tooltip, Typography } from '@mui/material'
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
    <Container className="main-layout" pt={4} px={8} maxWidth={1080} margin="0 auto">
      <Flex
        pt={1}
        pb={3}
        px={2}
        justifyContent="space-between"
        alignItems="center"
        className="header"
      >
        <Typography sx={{ padding: '8px 8px 0' }} variant="h6">
          {title}
        </Typography>
        <Flex alignItems="center">
          {
            <Tooltip title={addTooltip}>
              <IconButton
                onClick={onAddClick}
                sx={{ borderColor: 'divider', borderWidth: 1, borderStyle: 'solid' }}
              >
                <AddOutlined />
              </IconButton>
            </Tooltip>
          }
        </Flex>
      </Flex>
      <Paper className="body" elevation={0} sx={{ height: 'calc(100% - 76px)', padding: '0 16px' }}>
        {children}
      </Paper>
    </Container>
  )
}

export default MainLayout

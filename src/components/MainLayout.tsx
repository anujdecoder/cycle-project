import React from 'react'
import Container from './Container'
import { Box, IconButton, Theme, Tooltip, Typography } from '@mui/material'
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
    <Container className="main-layout" px={8} maxWidth={1080} margin="0 auto">
      <Flex
        pt={4}
        pb={3}
        px={10}
        justifyContent="space-between"
        alignItems="center"
        className="header"
        sx={(theme: Theme) => ({ backgroundColor: theme.palette.background.paper })}
      >
        <Typography sx={{ padding: '8px 8px 0' }} variant="h6">
          {title}
        </Typography>
        <Flex alignItems="center">
          {Boolean(onAddClick) && (
            <Tooltip title={addTooltip}>
              <IconButton
                onClick={onAddClick}
                sx={{ borderColor: 'divider', borderWidth: 1, borderStyle: 'solid' }}
              >
                <AddOutlined />
              </IconButton>
            </Tooltip>
          )}
        </Flex>
      </Flex>
      <Box
        className="body"
        height="calc(100% - 100px)"
        px={10}
        sx={(theme: Theme) => ({ backgroundColor: theme.palette.background.paper })}
      >
        {children}
      </Box>
    </Container>
  )
}

export default MainLayout

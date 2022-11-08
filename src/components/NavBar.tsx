import React from 'react'
import { Box, IconButton, Paper, Stack, Tooltip } from '@mui/material'
import Flex from './Flex'
import Logo from './Logo'

interface NavItem {
  icon: React.ReactElement
  title: React.ReactNode
  onClick: () => void
}

interface Props {
  items: NavItem[]
}

const NavBar: React.FC<Props> = ({ items }) => {
  return (
    <Paper elevation={0} sx={{ width: 64 }}>
      <Flex justifyContent="center">
        <Box width={40} sx={theme => ({ fill: theme.palette.primary.main })}>
          <Logo />
        </Box>
      </Flex>
      <Stack spacing={2} my={3}>
        {items.map(({ icon, title, onClick }, index) => (
          <Flex justifyContent="center">
            <Tooltip title={title} placement="right" arrow>
              <IconButton onClick={onClick} key={`nav-item-${index}`}>
                {icon}
              </IconButton>
            </Tooltip>
          </Flex>
        ))}
      </Stack>
    </Paper>
  )
}

export default NavBar

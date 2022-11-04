import React from 'react'
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'

const Layout: React.FC = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rent a Bike
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 80 }}>
          <Stack>
            <div>My Reservations</div>
            <div>Bikes</div>
            <div>Users</div>
          </Stack>
        </Box>
        <div>Content</div>
      </Box>
    </Box>
  )
}

export default Layout

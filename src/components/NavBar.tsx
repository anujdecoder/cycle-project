import React from "react"
import { Box, IconButton, Paper, Stack, Tooltip } from "@mui/material"
import Flex from "./Flex"
import Logo from "./Logo"

interface NavItem {
  icon: React.ReactElement
  title: React.ReactNode
  onClick: () => void
}

interface Props {
  items: NavItem[]
}

const NavBar: React.FC<Props> = ({ items }) => (
  <Paper elevation={0} sx={{ width: 64, borderRadius: 0 }}>
    <Flex justifyContent="center">
      <Box
        width={40}
        height={40}
        my={2.5}
        p={0.5}
        sx={theme => ({
          fill: theme.palette.primary.main,
          borderRadius: 20,
          border: `2px solid ${theme.palette.primary.main}`,
        })}
      >
        <Logo />
      </Box>
    </Flex>
    <Stack spacing={2}>
      {items.map(({ icon, title, onClick }, index) => (
        <Flex justifyContent="center" key={`sub-app-${index}`}>
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

export default NavBar

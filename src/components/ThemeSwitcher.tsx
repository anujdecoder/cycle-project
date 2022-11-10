import React from "react"
import { DarkMode } from "@mui/icons-material"
import Center from "./Center"

interface Props {
  toggleTheme: () => void
}

const ThemeSwitcher: React.FC<Props> = ({ toggleTheme }) => (
  <Center
    onClick={toggleTheme}
    position="absolute"
    bottom={40}
    right={80}
    p={1}
    height={56}
    width={56}
    sx={theme => ({
      backgroundColor: theme.palette.primary.main,
      borderRadius: 40,
      cursor: "pointer",
    })}
  >
    <DarkMode fontSize="large" />
  </Center>
)

export default ThemeSwitcher

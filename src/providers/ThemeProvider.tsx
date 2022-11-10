import React from "react"
import { ThemeProvider as MuiThemeProvider } from "@mui/material"
import { darkTheme, lightTheme } from "./theme"
import ThemeSwitcher from "../components/ThemeSwitcher"

interface Props {
  children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(false)
  const theme = darkMode ? darkTheme : lightTheme
  const toggleTheme = React.useCallback(() => setDarkMode(v => !v), [setDarkMode])

  return (
    <MuiThemeProvider theme={theme}>
      {children}
      <ThemeSwitcher toggleTheme={toggleTheme} />
    </MuiThemeProvider>
  )
}

export default ThemeProvider

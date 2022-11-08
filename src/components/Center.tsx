import React from "react"
import { Box, BoxProps } from "@mui/material"

const Center: React.FC<BoxProps> = props => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    {...props}
  />
)

export default Center

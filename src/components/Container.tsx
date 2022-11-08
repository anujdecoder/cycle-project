import React from "react"
import { Box, BoxProps } from "@mui/material"

interface Props extends BoxProps {}

const Container: React.FC<Props> = props => <Box {...props} height="100%"></Box>

export default Container

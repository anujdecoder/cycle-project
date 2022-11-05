import React from 'react'
import { Box, BoxProps } from '@mui/material'

interface Props extends BoxProps {}

const Flex: React.FC<Props> = (props) => {
  return <Box {...props} display="flex" />
}

export default Flex

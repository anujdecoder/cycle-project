import React from "react"
import { BoxProps, Card, CardContent, Typography } from "@mui/material"
import Center from "../../../components/Center"

type Props = BoxProps & {
  title: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children, title, ...props }) => (
  <Center minHeight="100%" {...props}>
    <Card sx={{ maxWidth: "100%", width: 400 }}>
      <CardContent sx={{ padding: 4 }}>
        <Typography
          textAlign="center"
          variant="subtitle1"
          fontWeight={600}
          my={2}
          color="text.secondary"
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  </Center>
)

export default AuthLayout

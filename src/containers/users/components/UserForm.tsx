import React from "react"
import { User } from "../../../types/users"
import FormDialog from "../../../components/FormDialog"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import * as yup from "yup"
import { Box, Fade, Grid, Typography } from "@mui/material"
import {
  CheckboxElement,
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui"

interface Props {
  open: boolean
  onClose: () => void
  user?: User
  loading?: boolean
  formId: string
  title: React.ReactNode
  submitLabel?: React.ReactNode
  onSubmit: (input: User) => void
  hidePassword?: boolean
  actions?: React.ReactNode
}

const UserForm: React.FC<Props> = ({
  open,
  onClose,
  user,
  loading,
  formId,
  onSubmit,
  title,
  submitLabel,
  hidePassword,
  actions,
}) => {
  const formContext = useForm<User>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: "",
      manager: user?.manager || false,
    },
    resolver: yupResolver(
      yup.object({
        firstName: yup.string().required("Required").max(100, "Should be less than 100 characters"),
        lastName: yup.string().max(100, "Should be less than 100 characters"),
        email: yup.string().email("Enter valid email").required("Required"),
        manager: yup.boolean(),
        ...(hidePassword
          ? {}
          : {
              password: yup
                .string()
                .required("Required")
                .matches(
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  "Choose a password with at least 8 characters. Choose a mixture of upper and lower case letters, numbers, and symbols."
                )
                .max(100, "Should be less than 100 characters"),
            }),
      })
    ),
  })

  const managerValue = formContext.watch("manager")

  return (
    <FormDialog
      formId={formId}
      open={open}
      onClose={onClose}
      title={title}
      loading={loading}
      submitLabel={submitLabel}
      actions={actions}
    >
      <FormContainer FormProps={{ id: formId }} formContext={formContext} onSuccess={onSubmit}>
        <Grid container spacing={2} pt={1}>
          <Grid item xs={12}>
            <TextFieldElement fullWidth name={"firstName"} label={"First Name"} />
          </Grid>
          <Grid item xs={12}>
            <TextFieldElement fullWidth name={"lastName"} label={"Last Name"} />
          </Grid>

          <Grid item xs={12}>
            <TextFieldElement fullWidth name={"email"} label={"Email"} />
          </Grid>
          {!hidePassword && (
            <Grid item xs={12}>
              <PasswordElement fullWidth name={"password"} label={"Password"} />
            </Grid>
          )}
          <Grid item xs={12}>
            <CheckboxElement name={"manager"} label={"Invite as manager?"} />
          </Grid>
          {Boolean(user) && (
            <Fade in={user!.manager !== managerValue}>
              <Box px={2}>
                <Typography variant="body2">Please ask user to login again</Typography>
              </Box>
            </Fade>
          )}
        </Grid>
      </FormContainer>
    </FormDialog>
  )
}

export default UserForm

import React from 'react'
import { User } from '../../../types/users'
import FormDialog from '../../../components/FormDialog'
import { useForm } from 'react-hook-form'
import { SignupInput } from '../../../types/auth'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../services/AuthService'
import { Grid } from '@mui/material'
import { CheckboxElement, FormContainer, PasswordElement, TextFieldElement } from 'react-hook-form-mui'

interface Props {
  open: boolean
  onClose: () => void
  user?: User
}

const formId = 'user-form'

const UserForm: React.FC<Props> = ({ open, onClose, user }) => {
  const formContext = useForm<SignupInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      manager: false
    },
    resolver: yupResolver(
      yup.object({
        firstName: yup.string().required('Required').max(100, 'Should be less than 100 characters'),
        lastName: yup.string().max(100, 'Should be less than 100 characters'),
        email: yup.string().email('Enter valid email').required('Required'),
        password: yup
          .string()
          .required('Required')
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Choose a password with at least 8 characters. Choose a mixture of upper and lower case letters, numbers, and symbols.'
          )
          .max(100, 'Should be less than 100 characters'),
        manager: yup.boolean()
      })
    )
  })
  const navigate = useNavigate()
  const { mutateAsync, isLoading } = useMutation<any, any, SignupInput, any>(AuthService.register, {
    mutationKey: ['registerUser'],
    onSuccess: () => navigate('../')
  })

  const handleSubmit = async (input: SignupInput) => {
    await mutateAsync(input)
  }

  return (
    <FormDialog
      formId={formId}
      open={open}
      onClose={onClose}
      title={'Invite User'}
      loading={isLoading}
      submitLabel={'Invite'}
    >
      <FormContainer formContext={formContext} onSuccess={handleSubmit}>
        <Grid container spacing={2} pt={1}>
          <Grid item xs={12}>
            <TextFieldElement fullWidth name={'firstName'} label={'First Name'} />
          </Grid>
          <Grid item xs={12}>
            <TextFieldElement fullWidth name={'lastName'} label={'Last Name'} />
          </Grid>

          <Grid item xs={12}>
            <TextFieldElement fullWidth name={'email'} label={'Email'} />
          </Grid>
          <Grid item xs={12}>
            <PasswordElement fullWidth name={'password'} label={'Password'} />
          </Grid>
          <Grid item xs={12}>
            <CheckboxElement name={'manager'} label={'Invite as manager?'} />
          </Grid>
        </Grid>
      </FormContainer>
    </FormDialog>
  )
}

export default UserForm

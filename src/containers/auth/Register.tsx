import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormContainer, PasswordElement, TextFieldElement } from 'react-hook-form-mui'
import { LoadingButton } from '@mui/lab'
import { useMutation } from '@tanstack/react-query'
import AuthService from '../../services/AuthService'
import { SignupInput } from '../../types/Auth'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import { Grid, Link } from '@mui/material'
import Center from '../../components/Center'

const Register: React.FC = () => {
  const formContext = useForm<SignupInput>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(
      yup.object({
        email: yup.string().email('Enter valid email').required('Required'),
        password: yup
          .string()
          .required('Required')
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Choose a password with at least 8 characters. Choose a mixture of upper and lower case letters, numbers, and symbols.'
          )
      })
    )
  })
  const navigate = useNavigate()
  const { mutateAsync, isLoading } = useMutation<any, any, SignupInput, any>(AuthService.login, {
    mutationKey: ['registerUser'],
    onSuccess: () => navigate('../')
  })

  const handleSubmit = async (input: SignupInput) => {
    await mutateAsync(input)
  }

  return (
    <AuthLayout title="Welcome!">
      <FormContainer formContext={formContext} onSuccess={handleSubmit}>
        <Grid container spacing={2}>
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
        </Grid>
        <Center my={2}>
          <LoadingButton fullWidth loading={isLoading}>
            Register
          </LoadingButton>
        </Center>
        <Center my={2}>
          <Link underline="none" variant="body2" color="inherit" to="/register" component={RouterLink}>
            Already have an account?
          </Link>
        </Center>
      </FormContainer>
    </AuthLayout>
  )
}

export default Register

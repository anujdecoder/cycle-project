import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormContainer, PasswordElement, TextFieldElement } from 'react-hook-form-mui'
import { LoadingButton } from '@mui/lab'
import { useMutation } from '@tanstack/react-query'
import AuthService from '../../services/AuthService'
import { SignupInput } from '../../types/Auth'
import { useNavigate } from 'react-router-dom'

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
    mutationKey: ['loginUser'],
    onSuccess: () => navigate('../..')
  })

  const handleSubmit = async (input: SignupInput) => {
    await mutateAsync(input)
  }

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmit}>
      <TextFieldElement name={'email'} />
      <PasswordElement name={'password'} />
      <LoadingButton loading={isLoading}>Signup</LoadingButton>
    </FormContainer>
  )
}

export default Register
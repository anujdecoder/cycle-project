export interface LoginInput {
  email: string
  password: string
}

export interface SignupInput {
  firstName: string
  lastName: string
  email: string
  password: string
  manager?: boolean
}

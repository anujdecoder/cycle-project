export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  manager: boolean
  password?: string
}

export enum UserSortDirection {
  ASC = "asc",
  DESC = "desc",
}

export enum UserSortFields {
  ID = "id",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL_NAME = "email",
  MANAGER = "manager",
}

export interface Auth {
  email: string
  password: string
}

export interface LocalUser extends Auth {
  username: string,
  role: string
}
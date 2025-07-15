type UserAPIRole = "sale"

type UserAPIResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
    filename: string
    phone: number
    role: UserAPIRole
  }
}
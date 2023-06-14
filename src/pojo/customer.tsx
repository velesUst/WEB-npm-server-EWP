export interface Address {
  country: string,
  state: string,
  city: string,
  street: string
}
export interface Customer {
  id: number,
  address: Address,
  avatarUrl: string,
  createdAt: number,
  email: string,
  name: string,
  phone: string
}
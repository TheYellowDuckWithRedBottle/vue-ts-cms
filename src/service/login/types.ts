export interface IAccount {
  name: string
  password: any
}
export interface ILoginResult {
  id: string
  name: string
  token: string
}
export interface IDataType<T> {
  code: number
  data: T
}

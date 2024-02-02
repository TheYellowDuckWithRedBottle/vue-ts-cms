export interface IAccount {
  username: string
  password: any
}
export interface ILoginResult {
  id: string
  username: string
  token: string
}
export interface IDataType<T> {
  code: number
  data: T
}
export interface Role {
  id: number
  username: string
  intro: string
  createAt: Date
  updateAt: Date
}

export interface Department {
  id: number
  name: string
  parentId?: any
  createAt: Date
  updateAt: Date
  leader: string
}

export interface Data {
  id: string
  username: string
  realname: string
  cellphone: number
  enable: number
  createAt: Date
  updateAt: Date
  role: Role
  department: Department
}
export interface MapTemplate {
  id: string|null
  name: string
  desc: string
  title: string
  cover: string
  epsg: string
}

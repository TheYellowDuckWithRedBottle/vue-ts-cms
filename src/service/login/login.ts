import { BASE_URL } from '../request/config'
import hyRequest from '..'
import { IAccount } from './types'
import { ILoginResult } from './types'
import { IDataType } from './types'
export function LoginAction(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: `${BASE_URL}/login`,
    data: account
  })
}

export function getUserInfo(id: string) {
  return hyRequest.get<IDataType<any>>({
    url: `${BASE_URL}/users/${id}`
  })
}

export function getUserMenu(id: string) {
  return hyRequest.get<IDataType<any>>({
    url: `${BASE_URL}/menu${id ? `/${id}` : ''}`
  })
}

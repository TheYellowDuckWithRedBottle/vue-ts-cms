import hyRequest from '..'
import { IAccount } from './types'
import { ILoginResult } from './types'
import { IDataType } from './types'
export function LoginAction(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: '/login ',
    data: account
  })
}

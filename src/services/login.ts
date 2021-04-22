import createFetch from '@xizher/fetch-helper'

export interface IAccount {
  id: string
  username: string
  email: string
}

export interface IAccountLoginError {
  success: false
}

export interface IAccountLoginSuccess {
  success: true
  token: string
  account: IAccount
}

export type IAccountLoginResult = IAccountLoginSuccess | IAccountLoginError

export function signIn (account: string, password: string) : Promise<IAccountLoginResult> {
  return createFetch()
    .setUrl('/api/account/login')
    .setHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    .setBody(JSON.stringify({ account, password }), true)
    .mountPost()
    .then(res => res.json())
    .then(res => res.data)
}

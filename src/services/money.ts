import createFetch from '@xizher/fetch-helper'
import { storageUtils } from '@xizher/js-utils'

export interface IMoney {
  id: number
  type: string
  value: number
  lonlat: string | null
  time: number
  comment: string
  timeFormat: string
}

export interface IAddMoneyDto {
  type: string
  value: number
  lonlat: string
  comment: string
}

export function list () : Promise<{ data: IMoney[] | null, code: string }> {
  const token = storageUtils.local.get('token') ?? ''
  return createFetch()
    .setUrl('/api/money/list')
    .setHeaders({ 'token': token })
    .mountGet()
    .then(res => res.json())
}

export function add (dto: IAddMoneyDto) : Promise<{ data: true | null, code: string }> {
  const token = storageUtils.local.get('token') ?? ''
  return createFetch()
    .setUrl('/api/money/add')
    .setHeaders({ 'token': token })
    .setHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    .setBody(JSON.stringify({ ...dto }), true)
    .mountPost()
    .then(res => res.json())
}

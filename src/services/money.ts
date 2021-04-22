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

export function list () : Promise<{ data: IMoney[] | null, code: string }> {
  const token = storageUtils.local.get('token') ?? ''
  return createFetch()
    .setUrl('/api/money/list')
    .setHeaders({ 'token': token })
    .mountGet()
    .then(res => res.json())
}

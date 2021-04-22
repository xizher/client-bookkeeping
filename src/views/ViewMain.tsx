import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { check as seriveCheck } from '../services/login'
import { storageUtils } from '@xizher/js-utils'
import MainRouter from '../router/MainRouter'

function ViewMain () : JSX.Element {
  const history = useHistory()
  useEffect(() => {
    const remove = history.listen(e => {
      if (e.pathname === '/login') {
        storageUtils.local.remove('account').remove('token')
      } else {
        const token = storageUtils.local.get('token') ?? ''
        seriveCheck(token).then(account => {
          if (!account) {
            storageUtils.local.remove('account').remove('token')
            history.push('/login')
          } else {
            storageUtils.local.set('account', account)
          }
        })
      }
      return remove()
    })
  }, [])
  const [value, setValue] = useState('/home')
  useEffect(() => history.push(value), [value])
  return (<>
    <div className="h-screen-56 overflow-auto">
      <MainRouter />
    </div>
    <BottomNavigation
      value={value}
      onChange={(_, val) => {
        setValue(val)
      }}
      showLabels
    >
      <BottomNavigationAction value="/home" label="概要" icon={<RestoreIcon />} />
      <BottomNavigationAction value="/table" label="详情" icon={<FavoriteIcon />} />
      <BottomNavigationAction value="/add" label="添加" icon={<FavoriteIcon />} />
      <BottomNavigationAction value="/login" label="退出" icon={<LocationOnIcon />} />
    </BottomNavigation>
  </>)
}

export default ViewMain

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { check as seriveCheck } from '../services/login'
import { storageUtils } from '@xizher/js-utils'

function ViewMain () : JSX.Element {
  const history = useHistory()
  const token = storageUtils.local.get('token') ?? ''
  seriveCheck(token).then(account => {
    if (!account) {
      storageUtils.local.remove('account').remove('token')
      history.push('/login')
    } else {
      storageUtils.local.set('account', account)
    }
  })
  return (
    <Button
      variant="contained"
      onClick={ () => history.push('/login')}
    >
      exit
    </Button>
  )
}

export default ViewMain

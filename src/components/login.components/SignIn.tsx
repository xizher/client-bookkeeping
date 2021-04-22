import React, { useCallback, useState } from 'react'
import {
  TextInput,
} from '../base.components'
import {
  Button,
} from '@material-ui/core'
import {
  signIn as serviceSignIn,
} from '../../services/login'
import { useHistory } from 'react-router-dom'
import useMsg from '../../hooks/useMsg'
import { storageUtils } from '@xizher/js-utils'

function SignIn () : JSX.Element {

  const [state, setState] = useState({
    account: '',
    password: '',
  })

  const history = useHistory()
  const [showMsg, MsgComponent] = useMsg()

  const signIn = useCallback(() => {
    const { account, password } = state
    serviceSignIn(account, password)
      .then(res => {
        if (res.success) {
          storageUtils.local
            .set('account', res.account)
            .set('token', res.token)
          history.push('/')
        } else {
          showMsg('登录失败', 'warning')
        }
      })
  }, [state])


  return (<>
    <MsgComponent />
    <TextInput
      label="邮箱或用户名"
      value={ state.account }
      onChange={ val => setState({ ...state, account: val }) }
    />
    <TextInput
      label="密码"
      type="password"
      value={ state.password }
      onChange={ val => setState({ ...state, password: val }) }
    />
    <div className="mt-4">
      <Button
        className="w-full"
        variant="contained"
        size="medium"
        onClick={ signIn }
      >
        Small
      </Button>
    </div>
  </>)
}

export default SignIn

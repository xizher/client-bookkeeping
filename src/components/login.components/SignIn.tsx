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
import { cryptoUtils, storageUtils } from '@xizher/js-utils'

function SignIn () : JSX.Element {

  const [state, setState] = useState({
    account: '',
    password: '',
  })

  const history = useHistory()
  const [showMsg, MsgComponent] = useMsg()

  const signIn = useCallback(() => {
    const { account } = state
    const password = cryptoUtils.encrypto(cryptoUtils.encrypto(state.password))
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
      onChange={ (val: any) => setState({ ...state, account: val }) } // eslint-disable-line
    />
    <TextInput
      label="密码"
      type="password"
      value={ state.password }
      onChange={ (val: any) => setState({ ...state, password: val }) } // eslint-disable-line
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

import React, { useCallback, useState } from 'react'
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
    <div className="login-wrap">
      <div className="form">
        <input
          type="text"
          placeholder="用户名或邮箱"
          value={ state.account }
          onChange={ e => setState({ ...state, account: e.target.value }) }
          onKeyDown={ e => e.key === 'Enter' && signIn() }
        />
        <input
          type="password"
          placeholder="密码"
          value={ state.password }
          onChange={ e => setState({ ...state, password: e.target.value }) }
          onKeyDown={ e => e.key === 'Enter' && signIn() }
        />
      </div>
    </div>
  </>)
}

export default SignIn

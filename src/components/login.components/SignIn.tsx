import React, { useCallback, useState } from 'react'
import {
  TextInput
} from '../base.components'
import {
  Button
} from '@material-ui/core'
import {
  signIn as serviceSignIn
} from '../../services/login'

function SignIn () : JSX.Element {

  const [state, setState] = useState({
    account: '',
    password: '',
  })

  const signIn = useCallback(() => {
    const { account, password } = state
    serviceSignIn(account, password)
  }, [state])

  return (<>
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

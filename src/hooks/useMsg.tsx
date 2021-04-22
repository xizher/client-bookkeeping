import React, { useCallback, useState } from 'react'
import {
  Snackbar,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

type MsgType = 'error' | 'success' | 'warning' | 'info'

interface IShowMsg {
  (message: string, type?: MsgType) : void
}

function useMsg () : [IShowMsg, () => JSX.Element] {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<MsgType>('info')
  const [msg, setMsg] = useState('')
  const MsgComponent = () => <Snackbar
    open={ visible }
    autoHideDuration={ 3000 }
    onClose={ () => setVisible(false) }
  >
    <Alert onClose={ () => setVisible(false) } severity={ type }>
      { msg }
    </Alert>
  </Snackbar>
  const showMsg: IShowMsg = useCallback((message: string, type: MsgType = 'info') => {
    setType(type)
    setMsg(message)
    setVisible(true)
  }, [])
  return [showMsg, MsgComponent]
}

export default useMsg

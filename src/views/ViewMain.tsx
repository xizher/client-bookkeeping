import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

function ViewMain () : JSX.Element {
  const history = useHistory()
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

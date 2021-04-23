import React, { useState } from 'react'
import {
  TextField, TextFieldProps,
} from '@material-ui/core'

interface IProp {
  label?: string
  value: any
  type?: string
  verification?: { [key: string]: (value: string) => boolean }
  onChange?: (value: any) => void
}

function TextInput (props: IProp & TextFieldProps) : JSX.Element {
  const { label, value, type, onChange, verification, ...other } = props
  const [state, setState] = useState({
    error: false,
    helperText: ''
  })

  function handleChange (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { value } = e.target
    onChange?.(value)
    setState({ error: false, helperText: '' })
    if (!verification) {
      return
    }
    const arr = Object.entries(verification)
    for (let i = 0; i < arr.length; i++) {
      const [key, func] = arr[i]
      if (!func(value)) {
        setState({ error: true, helperText: key })
        return
      }
    }
  }

  return (
    <TextField
      variant="outlined"
      margin="normal"
      size="small"
      label={ label ?? '' }
      type={ type ?? 'default' }
      value={ value }
      onChange={ handleChange }
      error={ state.error }
      helperText={ state.helperText }
      fullWidth
      { ...other }
    />
  )
}

export default TextInput

import React from 'react';
import TextField from '@material-ui/core/TextField';

interface IProps {
  classStyle: any
  input: string
  isError: boolean
  helperText: string
  resetError: () => void
  setInput: (value: string) => void
}

const Input: React.FC<IProps> = ({
  classStyle,
  input,
  isError,
  helperText,
  resetError,
  setInput,
}) => {
  const changeInputValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setInput(event.target.value);
    resetError();
  }

  return (
    <TextField
      value={input}
      onChange={changeInputValue}
      style={{marginBottom: '20px'}}
      className={classStyle}
      id="standard-basic"
      label="Строка или число"
      error={isError}
      helperText={helperText}
    />
  )
}

export default Input;
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface IProps {
  isCaseSensitive: boolean
  setIsCaseSensitive: ((prev: any) => any)
}

const MyCheckbox: React.FC<IProps> = ({
  isCaseSensitive,
  setIsCaseSensitive
}) => {
  const changCaseSensitive = (): void => {
    setIsCaseSensitive((prev: any) => !prev);
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          checked={isCaseSensitive}
          onChange={changCaseSensitive}
        />
      }
      label="Чувствительность к регистру"
    />
  )
}

export default MyCheckbox;
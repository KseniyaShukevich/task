import React from 'react';
import Button from '@material-ui/core/Button';

interface IProps {
  classStyle: any
  words: Array<string> | null
  input: string
  resetError: () => void
  setIsError: (value: boolean) => void
  setHelperText: (value: string) => void
  setSearchWords: (value: Array<string> | null) => void
}

const SearchSubstr: React.FC<IProps> = ({
  classStyle,
  words,
  input,
  resetError,
  setIsError,
  setHelperText,
  setSearchWords
}) => {
  const filterLengthStr = (): void => {
    if (!isNaN(+input)) {
      resetError();
      const result: Array<string> = words!.filter((word: string) => {
        if (word.length > +input) {
          return word;
        }
      });
      setSearchWords(result);
    } else {
      setIsError(true);
      setHelperText('Вы ввели строку, а не число');
    }
  }

  return (
    <Button
      className={classStyle}
      variant="contained"
      color="primary"
      onClick={filterLengthStr}
    >
      Фильтр по длине слов
    </Button>
  )
}

export default SearchSubstr;
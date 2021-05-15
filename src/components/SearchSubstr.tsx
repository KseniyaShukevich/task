import React from 'react';
import Button from '@material-ui/core/Button';

interface IProps {
  classStyle: any
  words: Array<string> | null
  isCaseSensitive: boolean
  input: string
  resetError: () => void
  setIsError: (value: boolean) => void
  setHelperText: (value: string) => void
  setSearchWords: (value: Array<string> | null) => void
}

const SearchSubstr: React.FC<IProps> = ({
  classStyle,
  words,
  isCaseSensitive,
  input,
  resetError,
  setIsError,
  setHelperText,
  setSearchWords
}) => {
  const getBySubstr = (): Array<string> => {
    return words!.filter((word: string) => {
      if (isCaseSensitive) {
        if (word.includes(input)) {
          return word;
        }
      } else {
        const newWord = word.toLowerCase();
        const subStr = input.toLowerCase();
        if (newWord.includes(subStr)) {
          return word;
        }
      }
    });
  }

  const filterBySubstr = (): void => {
    if (input === '' || isNaN(+input)) {
      resetError();
      const result: Array<string> = getBySubstr();
      setSearchWords(result);
    } else {
      setIsError(true);
      setHelperText('Вы ввели число, а не строку');
    }
  }

  return (
    <Button
      className={classStyle}
      variant="contained"
      color="primary"
      onClick={filterBySubstr}
    >
      Фильтр по подстроке
    </Button>
  )
}

export default SearchSubstr;
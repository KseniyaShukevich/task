import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import useStyles from './styles';

function App() {
  const classes = useStyles();
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [words, setWords] = useState<null | Array<string>>(null);
  const [searchWords, setSearchWords] = useState<null | Array<string>>(null);
  const [input, setInput] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>('');

  const resetError = (): void => {
    setIsError(false);
    setHelperText('');
  }

  const changCaseSensitive = (): void => {
    setIsCaseSensitive((prev) => !prev);
  }

  const changeInputValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setInput(event.target.value);
    resetError();
  }

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

  const filterBySubstr = (): void => {
    if (isNaN(+input)) {
      resetError();
      const result: Array<string> = words!.filter((word: string) => {
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
      setSearchWords(result);
    } else {
      setIsError(true);
      setHelperText('Вы ввели число, а не строку');
    }
  }

  const getData = async (): Promise<void> => {
    const response = await fetch('https://thingproxy.freeboard.io/fetch/https://www.mrsoft.by/data.json');
    const data = await response.json();
    setWords(data.data);
    setSearchWords(data.data);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <Container className={classes.container}>
      <form noValidate autoComplete="off">
        <Box className={classes.box}>
          <TextField
            value={input}
            onChange={changeInputValue}
            className={classes.input}
            id="standard-basic"
            label="Строка или число"
            error={isError}
            helperText={helperText}
          />
          <Box className={classes.boxButtons}>
            <Button
              className={classes.buttonLeft}
              variant="contained"
              color="primary"
              onClick={filterBySubstr}
            >
              Фильтр по подстроке
            </Button>
            <Button
              className={classes.buttonRight}
              variant="contained"
              color="primary"
              onClick={filterLengthStr}
            >
              Фильтр по длине слов
            </Button>
          </Box>
        </Box>
        <Box>
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
        </Box>
      </form>
      <Box className={classes.results}>
        {(searchWords && searchWords.length)
          ?
          (
            searchWords.map((word: any) => <div key={word}>{word}<hr/></div>)
          ) : (
            <div>Ничего не найдено</div>
          )
        }
      </Box>
    </Container>
  );
}

export default App;

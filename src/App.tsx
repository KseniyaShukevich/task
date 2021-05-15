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

  const changCaseSensitive = (): void => {
    setIsCaseSensitive((prev) => !prev);
  }

  const changeInputValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setInput(event.target.value);
  }

  const filterLengthStr = (): void => {
    if (!isNaN(+input)) {
      const result: Array<string> = words!.filter((word: string) => {
        if (word.length > +input) {
          return word;
        }
      });
      setSearchWords(result);
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
          />
          <Box className={classes.boxButtons}>
            <Button
              className={classes.buttonLeft}
              variant="contained"
              color="primary"
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
        {searchWords && (
            searchWords.map((word: any) => <div key={word}>{word}<hr/></div>)
          )
        }
      </Box>
    </Container>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import Result from './components/Result';
import SearchSubstr from './components/SearchSubstr';
import SearchByLength from './components/SearchByLength';
import Input from './components/Input';
import MyCheckbox from './components/MyCheckbox';

function App() {
  const classes = useStyles();
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [words, setWords] = useState<null | Array<string>>(null);
  const [foundedWords, setFoundedWords] = useState<null | Array<string>>(null);
  const [input, setInput] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>('');

  const resetError = (): void => {
    setIsError(false);
    setHelperText('');
  }

  const getData = async (): Promise<void> => {
    const response = await fetch('https://infinite-brook-27178.herokuapp.com/https://www.mrsoft.by/data.json');
    const data = await response.json();
    setWords(data.data);
    setFoundedWords(data.data);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <Container className={classes.container}>
      <form noValidate autoComplete="off">
        <Box className={classes.box}>
          <Input
            classStyle={classes.input}
            input={input}
            isError={isError}
            helperText={helperText}
            resetError={resetError}
            setInput={setInput}
          />
          <Box className={classes.boxButtons}>
            <SearchSubstr
              classStyle={classes.buttonLeft}
              words={words}
              isCaseSensitive={isCaseSensitive}
              input={input}
              resetError={resetError}
              setIsError={setIsError}
              setHelperText={setHelperText}
              setFoundedWords={setFoundedWords}
            />
            <SearchByLength
              classStyle={classes.buttonRight}
              words={words}
              input={input}
              resetError={resetError}
              setIsError={setIsError}
              setHelperText={setHelperText}
              setFoundedWords={setFoundedWords}
            />
          </Box>
        </Box>
        <Box>
          <MyCheckbox
            isCaseSensitive={isCaseSensitive}
            setIsCaseSensitive={setIsCaseSensitive}
          />
        </Box>
      </form>
      <Result
        classStyle={classes.results}
        foundedWords={foundedWords}
      />
    </Container>
  );
}

export default App;

import React from 'react';
import Box from '@material-ui/core/Box';

interface IProps {
  classStyle: any
  foundedWords: Array<string> | null
}

const Result: React.FC<IProps> = ({ classStyle, foundedWords }) => {
  return (
    <Box className={classStyle}>
      {(foundedWords && foundedWords.length)
        ?
        (
          foundedWords.map((word: any) => <div key={word}>{word}<hr/></div>)
        ) : (
          <div>Ничего не найдено</div>
        )
      }
    </Box>
  )
}

export default Result;
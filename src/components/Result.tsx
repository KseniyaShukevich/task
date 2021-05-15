import React from 'react';
import Box from '@material-ui/core/Box';

interface IProps {
  classStyle: any
  searchWords: Array<string> | null
}

const Result: React.FC<IProps> = ({ classStyle, searchWords }) => {
  return (
    <Box className={classStyle}>
      {(searchWords && searchWords.length)
        ?
        (
          searchWords.map((word: any) => <div key={word}>{word}<hr/></div>)
        ) : (
          <div>Ничего не найдено</div>
        )
      }
    </Box>
  )
}

export default Result;
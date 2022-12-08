import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom'

type Lang = {lang: number; english: string; russian: string; german: string}

export default function buttons(leftBook: number, rightBook: number, chapter: number, enBook: number, ruBook: number,
                                deBook: number, lang: number, lr: boolean) {

function langLinks(leftBook: number, rightBook: number, chapter: number, newBook: number, lr: boolean)
   {let url = '';
    switch (lr){
     case false: {url = "/lbid/"+newBook+"/rbid/"+rightBook+"/chid/"+chapter; break}
     case true: {url = "/lbid/"+leftBook+"/rbid/"+newBook+"/chid/"+chapter} }
     return <Link to={url}> Экземпляр на немецком </Link>
     }

function language(lang: number): Lang {
 let e = 'Английский'
 let r = 'Русский'
 let g = 'Немецкий'
 return {lang: lang, english: e, russian: r, german: g}
}

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="text button group">
        <Button component={Link} to="{langLinks(leftBook, rightBook, chapter, enBook)}"> {language(lang).english} </Button>
        <Button component={Link} to="/home">{language(lang).russian}</Button>
        <Button component={Link} to="/home">{language(lang).german}</Button>
      </ButtonGroup>
    </Box>
  );
}
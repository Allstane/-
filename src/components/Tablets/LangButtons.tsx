import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom'
import {MetabookF} from './../data/Metabook'
import {Book, dummyB} from './../data/Chapter'

export default function buttons(leftBook: number, rightBook: number, chapter: number, metabookF: MetabookF, lang: number, lr: boolean) {

const activeBooksLangs: Array<number> = metabookF.books.filter(book => book.is_ready && book.is_visible).map(book => book.language)

function langLinks(leftBook: number, rightBook: number, chapter: number, newBook: number, lr: boolean)
{let url = '';
    switch (lr){
     case false: {url = "/lbid/"+newBook+"/rbid/"+rightBook+"/chid/"+chapter; break}
     case true: {url = "/lbid/"+leftBook+"/rbid/"+newBook+"/chid/"+chapter} }
     return url
}

function newBook(metabookF: MetabookF, lang: number): number {
  const book: Book = metabookF.books.find(book => book.language === lang) ?? dummyB
  return book.id
}

type Lang = {n: number; title: string}

function language(lang: number): string {
 const langs: Lang[] = [{n: 0, title: 'dummy'}, {n: 1, title: 'Английский'},
                        {n: 2, title: 'Русский'},  {n: 3, title: 'Немецкий'}, {n: 4, title: 'Французский'}]
 const result = langs.find(l => l.n === lang) ?? {n: 0, title: "dummy"}
 return result.title
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
      {activeBooksLangs.map(lang => <Button component={Link}
                                  to={langLinks(leftBook, rightBook, chapter, newBook(metabookF, lang), lr)}> {language(lang)} </Button>)}
      </ButtonGroup>
    </Box>
  );
}
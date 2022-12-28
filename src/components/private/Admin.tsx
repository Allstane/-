import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import EditChapter from './EditBook'
import FullDialog from './Dialog'
import {BookF, dummyBF} from './../data/Chapter'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}));

function GridEditableBook(book: BookF) {
  return (
    <Box sx={{ width: '60%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={12}>
          <Item>{book.book.title}</Item>
        </Grid>
        {book.chapters.map(ch => <><Grid item xs={10}><Item>{ch.title}<br/>{ch.txt}</Item></Grid>
                                   <Grid item xs={2 }><Item>Edit</Item></Grid></>)}
      </Grid>
    </Box>
  );
}

export default function Private() {

   const {token, bId} = useParams();
   const [book, setBook] = useState<BookF>(dummyBF)

   const getBook = () => { instance.get<BookF>('/bookF/'+Number(1)).then((b) => {setBook(b.data) } )}

   useEffect( () => getBook() )

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Admin</p>
      </header>
      <main className="App-main">
      {GridEditableBook(book)}
      </main>
      <footer className="App-footer">
      </footer>
    </body>
    );
}
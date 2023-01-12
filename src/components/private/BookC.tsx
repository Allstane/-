import {BookF, dummyBF} from './../data/Chapter'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import {styled} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function BookC() {

   const {token, bId} = useParams()
   const [bookF, setBookF] = useState<BookF>(dummyBF)

   const getBookC = () => { instance.get<BookF>('/admin/bookFC/'+Number(bId)).then((b) => {console.log(b); setBookF(b.data) } ) }

   useEffect( () => getBookC() )

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Book-candidate</p>
      </header>
      <main className="App-main">
        {gridBook(bookF)}
      </main>
      <footer className="App-footer">
      </footer>
    </body>
    );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}));

function gridBook(book: BookF) {
  return (
    <Box sx={{ width: '60%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={10   }>
          <Item>{book.book.title}</Item>
        </Grid>
        {book.chapters.map(ch => <Grid item xs={10}><Item>{ch.title}<br/>{ch.txt}</Item></Grid>)}
      </Grid>
    </Box>
  );
}
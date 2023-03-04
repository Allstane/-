import {BookF, dummyBF} from './../data/Chapter'
import {Note} from './../data/Note'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import {styled} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function BookC() {

   const {bId} = useParams()
   const [bookF, setBookF] = useState<BookF>(dummyBF)
   const [notes, setNotes] = useState<Note[]>([])

   const getBookC = () => { instance.get<BookF>('/bookF/'+Number(bId)).then((b) => setBookF(b.data) ) }

   const getNotes = () => { instance.get<Note[]>('/notes/'+Number(bId)).then((b) => setNotes(b.data) ) }

   useEffect( () => getBookC(), [])
   useEffect( () => getNotes(), [])

   return (
    <body>
      <main className="App-main">
        {gridBook(bookF, notes)}
      </main>
      <footer className="App-footer">
      </footer>
    </body>
    )
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}))

function gridBook(book: BookF, notes: Note[]) {
  console.log(notes.length)
  return (
    <Box sx={{ width: '90%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={10   }>
          <Item>{book.book.title}</Item>
        </Grid>
        {book.chapters.map(ch => <Grid item xs={10}><Item>{ch.title}<br/>{ch.txt}</Item></Grid>)}
        {notes.map(note => <Grid item xs={10}><Item>{note.id}<br/>{note.txt}</Item></Grid>)}
      </Grid>
    </Box>
  )
}
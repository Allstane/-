import React, {useState, useEffect} from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import {Book} from '../data/Chapter'
import {instance} from './../AxiosInstance'
import {Link} from 'react-router-dom'

export default function BooksList(author: number) {
  const [books, setBooks] = useState<Book[]>([])
  const getBooks = () =>  { instance.get<Book[]>('/books/' + author).then((bs) => { setBooks(bs.data) } ) }

  useEffect( () => getBooks(), [books] )

  const bookContentLink = (id: number) => "/content/"+id

  return (
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        { books.sort((b1,b2)=> b2.metabook - b1.metabook)
               .map(b => <ListItem alignItems="flex-start">
                         <Link to={bookContentLink(b.id)}><ListItemText primary={b.title + " (" + b.author + ")"} /></Link>
                         </ListItem>) }
    </List>
  )
}

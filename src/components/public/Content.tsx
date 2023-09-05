import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import {BookF, dummyBF} from '../data/Chapter'
import {instance} from './../AxiosInstance'
import {Link} from 'react-router-dom'

export default function BookContent() {
  const {bid} = useParams()
  const [bookF, setBookF] = useState<BookF>(dummyBF)
  const headers = {headers: {'Origin': 'http://www.alefowl.com'}}
  const getBookF = () => {instance.get<BookF>('/bookF/'+Number(bid), headers).then((b) => {setBookF(b.data) } )}

  useEffect( () => getBookF(), [bookF] )

  return (
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        { bookF.chapters.filter(ch => ch.head === null).sort((ch1,ch2) => ch1.id - ch2.id)
                        .map(ch => <ListItem alignItems="flex-start">
                                   <Link to={"/lbid/" + bid + "/rbid/" + bid + "/chid/" + ch.id}>
                                   <ListItemText primary={ch.title} /></Link></ListItem>) }
    </List>
  )
}
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import {styled} from '@mui/material/styles'
import {Book, Library, dummyL} from './../data/Chapter'
import {Metabook, Metalibrary} from './../data/Metabook'
import {Creator, People, dummyP} from './../data/Creator'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { getToken } from '../../utils/helpers/tokenSettings'

export default function Adds() {
   const token = getToken()
   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Add books, authors and metabooks</p>
      </header>
      <main className="App-main">
        {Workspace(token)}
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

function Workspace(token: string = '') {
  const headers = {headers: {'Authorization': token}};

  const [people, setPeople] = useState<People>(dummyP)
  const getCreators = () => { instance.get<People>('/admin/creators', headers).then((p) => {setPeople(p.data) } ) }

  const [library, setLibrary] = useState<Library>(dummyL)
  const getLibrary = () => { instance.get<Library>('/admin/books', headers).then((l) => {console.log(l.data); setLibrary(l.data) } ) }

  const [metalibrary, setMetalibrary] = useState<Metalibrary>([])
  const getMetalibrary = () => { instance.get<Metalibrary>('/admin/metabooks', headers).then((ml) => {setMetalibrary(ml.data) } ) }

  useEffect( () => getCreators(), [people] )
  useEffect( () => getLibrary(), [library] )
  useEffect( () => getMetalibrary(), [metalibrary] )

  return (
    <Box sx={{ width: '90%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={6}>
          <Item>Вставка книги {AddBook(people, metalibrary, headers)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Все книги {GetBooks(library, headers)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Вставка автора или переводчика {AddCreator(headers)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Все авторы или переводчики {GetCreators(people, headers)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Вставка метакниги {AddMetabook(people, headers)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Все метакниги {GetMetabooks(metalibrary, headers)}</Item>
        </Grid>
      </Grid>
    </Box>
  )
}

function AddCreator(headers: any) {

  const [name, setName] = useState('')
  const [lang, setLang] = useState(1)

  function createAuthor() {
      const c: Creator =
      {id: 0, english_name: name, russian_name: '', german_name: '', original_language: lang, birth_date: 0,
       death_date: 0, is_author: true, is_translator: false, owner: 0}
      const json = JSON.stringify(c)
      console.log('Send a creator to backend for saving: ' + json)
      instance.post('/admin/insertCreator', json, headers)
        .then(r => { console.log('Response from backend after sending a creator: ' + r.data)
                     if (r.data === 1) {alert('Creator is created.')}})}

  const handleChangeName = (event:React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value)}

  const handleChangeLang = (event: SelectChangeEvent<number>) =>  { setLang(Number(event.target.value)) }

  return (
    <Box component="form" noValidate  autoComplete="off"   >
      <div><Button  onClick={()  => {createAuthor()}}> Сохранить автора  </Button></div>
      <div> <TextField id="name" label="Имя автора" multiline maxRows={4} onChange={handleChangeName} />  </div>
      <div>
         <Select id="original_language" label="Оригинальный язык" value={lang} onChange={handleChangeLang}>
           <MenuItem value={1}>Английский</MenuItem>
           <MenuItem value={2}>Русский</MenuItem>
           <MenuItem value={3}>Немецкий</MenuItem>
           </Select>
      </div>
    </Box>
  )
}

function GetCreators(people: People, headers: any) {

  function deleteCreator(id: number) { instance.delete('/admin/deleteCreator/' + id, headers)
                              .then(r => { console.log('Response from backend after deleting a creator: ' + r.data)
                                    if (r.data === 1) {alert('Creator is deleted.')}
                                      } ) }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {people.people.filter(c => c.owner != null).map(c => <Grid item xs={12} >
                                <Item>{c.english_name} <DeleteIcon onClick={()=>deleteCreator(c.id) } /></Item>
                                </Grid>)}
      </Grid>
    </Box>
  )}

function AddBook(people: People, ml: Metalibrary, headers: any) {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [lang, setLang] = useState(1)
  const [metabook, setMetabook] = useState(1)

  function createBook() {
      const b: Book =
      {id: 0, metabook: metabook, language: lang, title: title, author: author, translation_date: 0,
                                   translator: 1, is_ready: false, is_visible: false, owner: 0 }
      const json = JSON.stringify(b)
      console.log('Send a book to backend for saving: ' + json)
      instance.post('/admin/insertBook', json, headers)
        .then(r => { console.log('Response from backend after sending a book: ' + r.data)
                     if (r.data === 1) {alert('Book is created.')}})}

  const handleChangeName = (event:React.ChangeEvent<HTMLInputElement>) => { setTitle(event.target.value)}

  const handleChangeAuthor = (event:React.ChangeEvent<HTMLInputElement>) => { setAuthor(event.target.value) }

  const handleChangeLang = (event: SelectChangeEvent<number>) =>  { setLang(Number(event.target.value)) }

  const handleChangeMetabook = (event: SelectChangeEvent<number>) =>  { setMetabook(Number(event.target.value)) }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"   >
      <div><Button  onClick={()  => {createBook()}}> Сохранить книгу  </Button></div>
      <div><TextField id="title" label="Название книги" multiline maxRows={4} onChange={handleChangeName} /> </div>
      <div><TextField id="author" label="Автор" multiline maxRows={4} onChange={handleChangeAuthor} /> </div>
      <div>
         <Select id="language" label="Оригинальный язык" value={lang} onChange={handleChangeLang}>
           <MenuItem value={1}>Английский</MenuItem>
           <MenuItem value={2}>Русский</MenuItem>
           <MenuItem value={3}>Немецкий</MenuItem>
           </Select>
      </div>
      <div>
         <Select id="metabook" label="Метакнига" defaultValue={1} onChange={handleChangeMetabook}>
           {ml.map(m => <MenuItem value={m.id}>{m.title}</MenuItem> )}
           </Select>
      </div>
    </Box>
  )
}

function GetBooks(library: Library, headers: any) {

  function deleteBook(id: number) { instance.delete('/admin/deleteBook/' + id, headers)
                              .then(r => { console.log('Response from backend after deleting of a book: ' + r.data)
                                           if (r.data === 1) {alert('Book is deleted.')}})}

  const bookAddLink = (id: number) => "/private/"+id+"/load"

  const bookTextLink = (id: number) => "/private/"+id

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {library.library.filter(b => b.owner != null).map(b =>
        <Grid item xs={12} >
        <Item> Название книги: {b.title}.<br/> Автор: {b.author}.<br/> Метакнига: {b.metabook}.<br/>
               Язык: {b.language}<br/> Владелец: {b.owner}<br/>
         <Link to={bookAddLink(b.id)}>Добавить текст, если его нет</Link>
          <br/>
         <Link to={bookTextLink(b.id)}>Посмотреть текст, если есть</Link> <br/>
         <DeleteIcon onClick={()=>deleteBook(b.id) } />
        </Item> </Grid>)}
      </Grid>
    </Box>
  )}

function AddMetabook(people: People, headers: any) {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState(1)
  const [lang, setLang] = useState(1)

  function createMetabook() {
      const m: Metabook = {id: 0, author: author, language: lang, title: title, create_date: 0, size: 0, owner: 0}
      const json = JSON.stringify(m)
      instance.post('/admin/insertMetabook', json, headers)
        .then(r => { console.log('Response from backend after sending a metabook: ' + r.data)
                     if (r.data === 1) {alert('Metabook is created.')}})}

  const handleChangeTitle = (event:React.ChangeEvent<HTMLInputElement>) => {setTitle(event.target.value) }

  const handleChangeLang = (event: SelectChangeEvent<number>) =>  { setLang(Number(event.target.value)) }

  const handleChangeAuthor = (event: SelectChangeEvent<number>) =>  { setAuthor(Number(event.target.value)) }

  return (
    <Box component="form" noValidate autoComplete="off">
      <div><Button  onClick={()  => {createMetabook()}}> Сохранить метакнигу  </Button></div>
      <div><TextField id="title" label="Название метакниги" multiline maxRows={4} onChange={handleChangeTitle} /> </div>
      <div>
         <Select id="language" label="Язык метакниги" value={lang} onChange={handleChangeLang}>
           <MenuItem value={1}>Английский</MenuItem>
           <MenuItem value={2}>Русский</MenuItem>
           <MenuItem value={3}>Немецкий</MenuItem>
           </Select>
      </div>
      <div>
         <Select id="author" label="Автор метакниги" value={author} onChange={handleChangeAuthor}>
           {people.people.map(c => <MenuItem value={c.id}> {c.english_name}</MenuItem> )}
           </Select>
      </div>
    </Box>
  )
}

function GetMetabooks(ml: Metalibrary, headers: any) {

  function deleteMetabook(id: number) { instance.delete('/admin/deleteMetabook/' + id, headers)
                             .then(r => { console.log('Response from backend after deleting a metabook: ' + r.data)
                             if (r.data === 1) {alert('Metabook is deleted.')}
                                            } ) }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {ml.filter(mb => mb.owner != null).map(m =>
        <Grid item xs={12} >
        <Item>{m.title} <DeleteIcon onClick={()=>deleteMetabook(m.id) } />
        </Item> </Grid>)}
      </Grid>
    </Box>
  )}


import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
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

export default function Adds() {
   const {token} = useParams()

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
    );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}));

function Workspace(token: string = '') {

  const [people, setPeople] = useState<People>(dummyP);
  const getCreators = () => { instance.get<People>('/admin/getCreators').then((p) => {setPeople(p.data) } ) }

  const [library, setLibrary] = useState<Library>(dummyL);
  const getLibrary = () => { instance.get<Library>('/admin/getBooks').then((l) => {setLibrary(l.data) } ) }

  const [metalibrary, setMetalibrary] = useState<Metalibrary>([]);
  const getMetalibrary = () => { instance.get<Metalibrary>('/admin/getMetabooks').then((ml) => {setMetalibrary(ml.data) } ) }

  useEffect( () => getCreators() )
  useEffect( () => getLibrary() )
  useEffect( () => getMetalibrary() )

  return (
    <Box sx={{ width: '60%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={6}>
          <Item>Вставка книги {AddBook(people, metalibrary)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Все книги {GetBooks(library, token)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Вставка автора или переводчика {AddCreator()}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Все авторы или переводчики {GetCreators(people)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Вставка метакниги {AddMetabook(people)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Все метакниги {GetMetabooks(metalibrary, token)}</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

function AddCreator() {

  const [name, setName] = useState('');
  const [original_language, setLang] = useState(0);

  function createAuthor() {
      const c: Creator =
      {id: 0, english_name: name, russian_name: '', german_name: '', original_language: original_language, birth_date: 0,
       death_date: 0, is_author: true, is_translator: false}
      const json = JSON.stringify(c)
      instance.post('/admin/insertCreator', json)
    }

  const handleChangeName = (event:React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  const handleChangeLang = (event: SelectChangeEvent<number>) =>  { setLang(Number(event.target.value)) }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"   >
      <div><Button  onClick={()  => {createAuthor()}}> Сохранить автора  </Button></div>
      <div> <TextField id="name" label="Имя автора" multiline maxRows={4} onChange={handleChangeName} />  </div>
      <div>
         <Select id="original_language" label="Оригинальный язык" defaultValue={1} onChange={handleChangeLang}>
           <MenuItem value={1}>Английский</MenuItem>
           <MenuItem value={2}>Русский</MenuItem>
           <MenuItem value={3}>Немецкий</MenuItem>
           </Select>
      </div>
    </Box>
  );
}

function GetCreators(people: People) {

  function deleteCreator(id: number) { instance.delete('/admin/deleteCreator/' + id) }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {people.people.map(c => <Grid item xs={12} ><Item>{c.english_name} <DeleteIcon onClick={()=>deleteCreator(c.id) } /></Item></Grid>)}
      </Grid>
    </Box>
  );}

function AddBook(people: People, ml: Metalibrary) {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLang] = useState(0);
  const [metabook, setMetabook] = useState(0);

  function createBook() {
      const b: Book =
      {id: 0, metabook: metabook, language: language, title: title, author: author, translation_date: 0,
                                   translator: 1, is_ready: false, is_visible: false }
      const json = JSON.stringify(b)
      console.log(json)
      instance.post('/admin/insertBook', json, {headers: {'Content-Type': 'application/json'}})
    }

  const handleChangeName = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  };

  const handleChangeLang = (event: SelectChangeEvent<number>) =>  { setLang(Number(event.target.value)) }

  const handleChangeAuthor = (event: SelectChangeEvent<string>) =>  { setAuthor(event.target.value) }

  const handleChangeMetabook = (event: SelectChangeEvent<number>) =>  { setMetabook(Number(event.target.value)) }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"   >
      <div><Button  onClick={()  => {createBook()}}> Сохранить книгу  </Button></div>
      <div>  <TextField id="title" label="Название книги" multiline maxRows={4} onChange={handleChangeName} /> </div>
      <div>
         <Select id="language" label="Оригинальный язык" defaultValue={1} onChange={handleChangeLang}>
           <MenuItem value={1}>Английский</MenuItem>
           <MenuItem value={2}>Русский</MenuItem>
           <MenuItem value={3}>Немецкий</MenuItem>
           </Select>
      </div>
      <div>
         <Select id="author" label="Автор" value ={author} onChange={handleChangeAuthor}>
           {people.people.map(c => <MenuItem value={c.english_name}> {c.english_name}</MenuItem> )}
           </Select>
      </div>
      <div>
         <Select id="metabook" label="Метакнига" defaultValue={1} onChange={handleChangeMetabook}>
           {ml.map(m => <MenuItem value={m.id}>{m.title}</MenuItem> )}
           </Select>
      </div>
    </Box>
  );
}

function GetBooks(library: Library, token: string) {

  function deleteBook(id: number) { instance.delete('/admin/deleteBook/' + id) }

  const bookLink = (token: string, id: number) => "/private/"+token+"/"+id+"/load"

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {library.library.map(b =>
        <Grid item xs={12} >
        <Item><Link to={bookLink(token, b.id)}> {b.id} "{b.title}" {b.author}</Link><DeleteIcon onClick={()=>deleteBook(b.id) } />
         <br/> Метакнига: {b.metabook}, язык: {b.language}
        </Item> </Grid>)}
      </Grid>
    </Box>
  );}

function AddMetabook(people: People) {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(0)
  const [language, setLang] = useState(0);

  function createMetabook() {
      const m: Metabook = {id: 0, author: author, language: language, title: title, create_date: 0}
      const json = JSON.stringify(m)
      instance.post('/admin/insertMetabook', json)
    }

  const handleChangeTitle = (event:React.ChangeEvent<HTMLInputElement>) => {setTitle(event.target.value) };

  const handleChangeLang = (event: SelectChangeEvent<number>) =>  { setLang(Number(event.target.value)) }

  const handleChangeAuthor = (event: SelectChangeEvent<number>) =>  { setAuthor(Number(event.target.value)) }

  return (
    <Box component="form" noValidate autoComplete="off">
      <div><Button  onClick={()  => {createMetabook()}}> Сохранить метакнигу  </Button></div>
      <div><TextField id="title" label="Название метакниги" multiline maxRows={4} onChange={handleChangeTitle} /> </div>
      <div>
         <Select id="language" label="Язык метакниги" defaultValue={1} onChange={handleChangeLang}>
           <MenuItem value={1}>Английский</MenuItem>
           <MenuItem value={2}>Русский</MenuItem>
           <MenuItem value={3}>Немецкий</MenuItem>
           </Select>
      </div>
      <div>
         <Select id="author" label="Автор метакниги" defaultValue={0} onChange={handleChangeAuthor}>
           {people.people.map(c => <MenuItem value={c.id}> {c.english_name}</MenuItem> )}
           </Select>
      </div>
    </Box>
  );
}

function GetMetabooks(ml: Metalibrary, token: string) {

  function deleteMetabook(id: number) { instance.delete('/admin/deleteMetabook/' + id) }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {ml.map(m =>
        <Grid item xs={12} >
        <Item>{m.title} <DeleteIcon onClick={()=>deleteMetabook(m.id) } />
        </Item> </Grid>)}
      </Grid>
    </Box>
  );}


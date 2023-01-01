import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import {styled} from '@mui/material/styles'
import {Book, Library, dummyL} from './../data/Chapter'
import {Creator, People, dummyP} from './../data/Creator'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom'


export default function Adds() {
   const {token} = useParams()

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Admin</p>
      </header>
      <main className="App-main">
        {grid(token)}
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

function grid(token: string = '') {
  return (
    <Box sx={{ width: '60%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={6   }>
          <Item>Вставка автора или переводчика {AddCreator()}</Item>
        </Grid>
        <Grid item xs={6   }>
          <Item>Все авторы или переводчики {GetCreators()}</Item>
        </Grid>
        <Grid item xs={6   }>
          <Item>Вставка книги {AddBook()}</Item>
        </Grid>
        <Grid item xs={6   }>
          <Item>Все книги {GetBooks(token)}</Item>
        </Grid>
        <Grid item xs={10   }>
          <Item>Вставка метакниги</Item>
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
      instance.post('/admin/insertCreator', json, {headers: {'Content-Type': 'application/json'}})
    }

  const handleChangeName = (event:React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  const handleChangeLang = (event: SelectChangeEvent<number>) =>  { setLang(Number(event.target.value)) }

  return (
    <Box
      component="form"
      sx={{   '& .MuiTextField-root': { m: 1, width: '25ch' }, } }
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

function GetCreators() {

  const [people, setPeople] = useState<People>(dummyP);

  const getCreators = () => { instance.get<People>('/admin/getCreators').then((p) => {setPeople(p.data) } ) }

  function deleteCreator(id: number) { instance.delete('/admin/deleteCreator/' + id).then(r => console.log(r.data)  ) }

  useEffect( () => getCreators() )

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {people.people.map(c => <Grid item xs={12} ><Item>{c.english_name} <DeleteIcon onClick={()=>deleteCreator(c.id) } /></Item></Grid>)}
      </Grid>
    </Box>
  );}

function AddBook() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLang] = useState(0);

  function createBook() {
      const b: Book =
      {id: 0, metabook: 1, language: language, title: title, author: author, translation_date: 0,
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

  return (
    <Box
      component="form"
      sx={{   '& .MuiTextField-root': { m: 1, width: '25ch' }, } }
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
         <Select id="author" label="Автор" defaultValue={'Ницше'} onChange={handleChangeAuthor}>
           <MenuItem value={'Ницше'}>Ницше</MenuItem>
           <MenuItem value={'Достоевский'}>Достоевский</MenuItem>
           <MenuItem value={'Толстой'}>Толстой</MenuItem>
           </Select>
      </div>
    </Box>
  );
}

function GetBooks(token: string) {

  const [library, setLibrary] = useState<Library>(dummyL);

  const getLibrary = () => { instance.get<Library>('/admin/getBooks').then((l) => {setLibrary(l.data) } ) }

  function deleteBook(id: number) { instance.delete('/admin/deleteBook/' + id).then(r => console.log(r.data)  ) }

  const bookLink = (token: string, id: number) => "/private/"+token+"/"+id+"/load"

  return (
    <Box sx={{ width: '100%' }}>
      <Button  onClick={()  => {getLibrary()}}> Показать книги  </Button>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {library.library.map(b =>
        <Grid item xs={12} >
        <Item><Link to={bookLink(token, b.id)}> {b.id} "{b.title}" {b.author}</Link><DeleteIcon onClick={()=>deleteBook(b.id) } />
        </Item> </Grid>)}
      </Grid>
    </Box>
  );}


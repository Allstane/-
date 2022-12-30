import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import {styled} from '@mui/material/styles'
import {Chapter, Book, dummyB} from './../data/Chapter'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import {Metabook, dummyM} from './../data/Metabook'
import {Creator, dummyC, People, dummyP} from './../data/Creator'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';


export default function Adds() {
   const {token, bId} = useParams()
   const [rawBook, setRawBook] = useState<string>('')
   const [book, setBook] = useState<Book>(dummyB)
   const [metabook, setMetabook] = useState<Metabook>(dummyM)
   const [creator, setCreator] = useState<Creator>(dummyC)

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Admin</p>
      </header>
      <main className="App-main">
        {grid()}
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

function grid() {
  return (
    <Box sx={{ width: '60%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={10   }>
          <Item>Вставка автора или переводчика {AddCreator()}</Item>
        </Grid>
        <Grid item xs={10   }>
          <Item>Все авторы или переводчики {GetCreators()}</Item>
        </Grid>
        <Grid item xs={10   }>
          <Item>Вставка метакниги</Item>
        </Grid>
        <Grid item xs={10   }>
          <Item>Вставка книги</Item>
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
      console.log('Json creator = ' + json)
      instance.post('/admin/insertCreator', json, {headers: {'Content-Type': 'application/json'}})
    }

  const handleChangeName = (event:React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  const handleChangeLang = (event: SelectChangeEvent<number>) =>  { console.log(event.target.value); setLang(Number(event.target.value)) }

  return (
    <Box
      component="form"
      sx={{   '& .MuiTextField-root': { m: 1, width: '25ch' }, } }
      noValidate
      autoComplete="off"   >
      <div>
        <TextField id="name" label="Original_name" multiline maxRows={4} onChange={handleChangeName} />
        <Button  onClick={()  => {createAuthor()}}> Add  </Button>
      </div>
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

  useEffect( () => getCreators() )

  return (
    <Box sx={{ width: '60%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {people.people.map(p => <Grid item xs={10} ><Item>{p.english_name}</Item></Grid>)}
      </Grid>
    </Box>
  );}


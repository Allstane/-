import {BookF, dummyBF, Book, dummyB} from './../Chapter'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './App.css'
import {instance} from './../AxiosInstance'
import Button from '@mui/material/Button';
import gridBook from './GridForOne'

function Tablet() {

   const {bid} = useParams();
   const [book, setBook] = useState<BookF>(dummyBF)

   const [deBook, setDeBook] = useState<Book>(dummyB)
   const [ruBook, setRuBook] = useState<Book>(dummyB)
   const [enBook, setEnBook] = useState<Book>(dummyB)

   function getBooksByLang(book: number) {
      instance.get<Book>('/book/'+Number(book)+'/language/3').then((response) => {setDeBook(response.data) } )
      instance.get<Book>('/book/'+Number(book)+'/language/2').then((response) => {setRuBook(response.data) } )
      instance.get<Book>('/book/'+Number(book)+'/language/1').then((response) => {setEnBook(response.data) } )
   }

   const getBook = () => {
         instance.get<BookF>('/bookF/'+Number(bid)).then((b) => {setBook(b.data) } )
   }

   useEffect( () => {getBook(); getBooksByLang(Number(bid))} )

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Book</p>
      </header>
      <main className="App-main">
        {gridBook(book)}
      </main>
      <footer className="App-footer">
      </footer>
    </body>
    );
}
export default Tablet;
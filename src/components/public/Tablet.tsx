import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from '../AxiosInstance'
import GridBook from './GridForOne'
import {BookF, dummyBF} from '../data/Chapter'

function Tablet() {

   const {bid} = useParams()
   const [book, setBook] = useState<BookF>(dummyBF)
   const headers = {headers: {'Origin': 'http://www.alefowl.com'}}

   const getBookF = () => {  instance.get<BookF>('/bookF/'+Number(bid), headers).then((b) => {setBook(b.data) } ) }

   useEffect( () => getBookF(),  [] )

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Book</p>
      </header>
      <main className="App-main">
        <GridBook book={book.book} chapters={book.chapters}/>
      </main>
      <footer className="App-footer">
      </footer>
    </body>
    )
}

export default Tablet
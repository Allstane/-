import {BookF, dummyBF} from './../data/Chapter'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import gridBook from './GridForOne'

function Tablet() {

   const {bid} = useParams();
   const [book, setBook] = useState<BookF>(dummyBF)

   const getBook = () => {
         instance.get<BookF>('/bookF/'+Number(bid)).then((b) => {setBook(b.data) } )
   }

   useEffect( () => getBook() )

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
import { Chapter, dummyCh, Book, dummyB} from './../data/Chapter'
import {MetabookF, dummyMF} from './../data/Metabook'
import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import './App.css'
import {instance} from './../AxiosInstance'
import Button from '@mui/material/Button';
import gridTablets from './GridForTwo'

function Tablets() {

   const {ChId, LBId, RBId} = useParams();
   const [leftBook, setLeftBook] = useState<Book>(dummyB)
   const [rightBook, setRightBook] = useState<Book>(dummyB)
   const [leftChapter, setLeftChapter] = useState<Chapter>(dummyCh)
   const [rightChapter, setRightChapter] = useState<Chapter>(dummyCh)
   const [metabookF, setMetabookF] = useState<MetabookF>(dummyMF)

   useEffect( () => {getBooks(); getMetabookF(); getChapters() } )

   function getMetabookF() {
         instance.get<MetabookF>('/metabookF/'+Number(LBId)).then((response) => {setMetabookF(response.data) } )
   }

   function getBooks() {
         instance.get<Book>('/book/'+Number(LBId)).then((response) => {setLeftBook(response.data) } )
         instance.get<Book>('/book/'+Number(RBId)).then((response) => {setRightBook(response.data) } )
   }

   function getChapters() {
         instance.get<Chapter>('/book/'+Number(LBId)+'/chapter/'+Number(ChId)).then((ch) => {setLeftChapter(ch.data) } )
         instance.get<Chapter>('/book/'+Number(RBId)+'/chapter/'+Number(ChId)).then((ch) => {setRightChapter(ch.data) } )
   }

   function changeChapter(leftBook: number, rightBook: number, chapter: number): string
     {return "/lbid/"+leftBook+"/rbid/"+rightBook+"/chid/"+chapter}

   const MainTable = () => {
      return <>
      <table width='800'>
      <tr><td width='45%' valign='top'></td>
          <td width='10%'></td>
          <td width='45%' valign='top'></td></tr>
      <tr><td align='right'><Button component={Link} to={changeChapter(Number(LBId), Number(RBId), Number(ChId)-1)}
                                    variant="contained">Previous</Button></td>
          <td></td>
          <td align='left'><Button component={Link} to={changeChapter(Number(LBId), Number(RBId), Number(ChId)+1)}
                                   variant="contained">Next</Button></td>
      </tr>
      </table>
            </>
   }

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Chapters</p>
      </header>
      <main className="App-main">
        {gridTablets(leftBook, rightBook, leftChapter, rightChapter, metabookF)}
        <p>{MainTable() }</p>
      </main>
      <footer className="App-footer"><p> </p>
      </footer>
    </body>
    );
}
export default Tablets;
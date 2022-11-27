import { Chapter, dummyCh, Book, dummyB} from './../Chapter'
import React, {useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import './App.css'
import {instance} from './../AxiosInstance'

function Tablets() {

   const {ChId, LBId, RBId} = useParams();
   const [leftBook, setLeftBook] = useState<Book>(dummyB)
   const [rightBook, setRightBook] = useState<Book>(dummyB)
   const [leftChapter, setLeftChapter] = useState<Chapter>(dummyCh)
   const [rightChapter, setRightChapter] = useState<Chapter>(dummyCh)

   interface IApplicationProps {}
   function getBooks() {
         instance.get<Book>('/book/'+Number(LBId)).then((response) => {console.log(response); setLeftBook(response.data) } )
         instance.get<Book>('/book/'+Number(RBId)).then((response) => {console.log(response); setRightBook(response.data) } )
         return <></>
   }

   function getChapters() {
         instance.get<Chapter>('/book/'+Number(LBId)+'/chapter/'+Number(ChId))
          .then((response) => {console.log(response); setLeftChapter(response.data) } )
         instance.get<Chapter>('/book/'+Number(RBId)+'/chapter/'+Number(ChId))
          .then((response) => {console.log(response); setRightChapter(response.data) } )
          return <></>
   }

   function changeChapter(leftBook: number, rightBook: number, chapter: number): string
     {return "/lbid/"+leftBook+"/rbid/"+rightBook+"/chid/"+chapter}

   const MainTable: React.FunctionComponent<IApplicationProps> = (props) => {
              return <>{getBooks()} {getChapters()}
              <table width='800'><tr><td width='45%' valign='top'>{leftBook.author} "{leftBook.title}"</td>
                                     <td width='10%'></td>
                                     <td width='45%' valign='top'>{rightBook.author} "{rightBook.title}"</td></tr>
                     <tr><td>{leftChapter.title}</td><td width='10%'></td><td>{rightChapter.title}</td></tr>
                     <tr><td valign='top' align='justify'>{leftChapter.txt}</td><td></td>
                         <td  valign='top' align='justify'>{rightChapter.txt}</td></tr>
                     <tr><td></td><td></td>
                         <td></td></tr></table></>
   }

   return (
    <body>
      <header className="App-header">
        <p>Project - Library</p>
      </header>
      <main className="App-main">
        <p></p>
        <p>{<MainTable />}</p>
      </main>
      <footer className="App-footer">
        <p><Link to={changeChapter(Number(LBId), Number(RBId), Number(ChId)-1)}> Previous </Link>
        <Link to={changeChapter(Number(LBId), Number(RBId), Number(ChId)+1)}> Next </Link></p>
      </footer>
    </body>
    );
}
export default Tablets;
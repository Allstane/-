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

   const [deBook, setDeBook] = useState<Book>(dummyB)
   const [ruBook, setRuBook] = useState<Book>(dummyB)
   const [enBook, setEnBook] = useState<Book>(dummyB)

   function getBooksByLang(book: number) {
      instance.get<Book>('/book/'+Number(book)+'/language/3').then((response) => {console.log(response); setDeBook(response.data) } )
      instance.get<Book>('/book/'+Number(book)+'/language/2').then((response) => {console.log(response); setRuBook(response.data) } )
      instance.get<Book>('/book/'+Number(book)+'/language/1').then((response) => {console.log(response); setEnBook(response.data) } )
   }

   interface IApplicationProps {}
   function getBooks() {
         instance.get<Book>('/book/'+Number(LBId)).then((response) => {console.log(response); setLeftBook(response.data) } )
         instance.get<Book>('/book/'+Number(RBId)).then((response) => {console.log(response); setRightBook(response.data) } )
   }

   function getChapters() {
         instance.get<Chapter>('/book/'+Number(LBId)+'/chapter/'+Number(ChId))
          .then((response) => {console.log(response); setLeftChapter(response.data) } )
         instance.get<Chapter>('/book/'+Number(RBId)+'/chapter/'+Number(ChId))
          .then((response) => {console.log(response); setRightChapter(response.data) } )
   }

   function changeLanguage(leftBook: number, rightBook: number, chapter: number): string
     {return "/lbid/"+leftBook+"/rbid/"+rightBook+"/chid/"+chapter}

   function changeChapter(leftBook: number, rightBook: number, chapter: number): string
     {return "/lbid/"+leftBook+"/rbid/"+rightBook+"/chid/"+chapter}

   const MainTable: React.FunctionComponent<IApplicationProps> = (props) => {
              return <>{getBooks()} {getChapters()} {getBooksByLang(Number(LBId))}
              <table width='800'><tr><td width='45%' valign='top'>{leftBook.author} "{leftBook.title}"</td>
                                     <td width='10%'></td>
                                     <td width='45%' valign='top'>{rightBook.author} "{rightBook.title}"</td></tr>
                     <tr><td>{leftChapter.title}</td><td width='10%'></td><td>{rightChapter.title}</td></tr>
                     <tr><td valign='top' align='justify'>{leftChapter.txt}</td><td></td>
                         <td  valign='top' align='justify'>{rightChapter.txt}</td></tr>
                     <tr><td>
                     <p><Link to={changeLanguage(Number(deBook.id),Number(RBId),Number(ChId))}> Экземпляр на немецком </Link></p>
                     <p><Link to={changeLanguage(Number(ruBook.id),Number(RBId),Number(ChId))}> Экземпляр на русском </Link></p>
                     </td><td></td>
                     <td>
                     <p><Link to={changeLanguage(Number(LBId),Number(deBook.id),Number(ChId))}> Экземпляр на немецком </Link></p>
                     <p><Link to={changeLanguage(Number(LBId),Number(ruBook.id),Number(ChId))}> Экземпляр на русском </Link></p>
                     </td></tr></table></>
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
        <p><Link to={changeChapter(Number(LBId), Number(RBId), Number(ChId)-1)}>  Previous .</Link>
           <Link to={changeChapter(Number(LBId), Number(RBId), Number(ChId)+1)}>. Next  </Link></p>
      </footer>
    </body>
    );
}
export default Tablets;
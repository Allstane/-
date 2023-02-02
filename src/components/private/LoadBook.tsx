import React, {useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import {Chapter, BookF, dummyB} from './../data/Chapter'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import { getToken } from '../../utils/helpers/tokenSettings'

export default function LoadBook() {
   const token = getToken()
   const {bId} = useParams()
   const [rawBook, setRawBook] = useState<string>('')
   const headers = {headers: {'Authorization': token}};

  function insertBookF(bF: BookF) {
      const json = JSON.stringify(bF)
      const headers = {headers: {'Content-Type': 'multipart/form-data', 'Content-Length': json.length}};
      instance.post('/admin/insertBookF', json, headers).then(r => { console.log('Response from backend after sending a bookF: ' + r.data)
                                                        if (r.data === 1) {alert('Book is created.')}
                                                                                                   } ) }

  function insertRawText(b: number, txt: string) {
      const r = {book: b, text: txt}
      const json = JSON.stringify(r)
      instance.post('/admin/raw', json, headers)
        .then(r => { console.log('Response from backend after sending a raw text: ' + r.data)
                     if (r.data === 1) {alert('Text is saved.')}
                     else {alert('Text is not saved.' )}  }) }

  function insertChapters(bF: BookF) {
    bF.chapters.map(ch => {
      instance.post('/admin/insertChapter', JSON.stringify(ch), headers)
        .then(r => { console.log('Response from backend after sending a chapter: ' + r.data) } )
                            }
                    )
   }

   function MinHeightTextarea() {
     return (
       <TextareaAutosize name="rawBook" minRows={10} placeholder="Text of a book" style={{ width: 800 }}
         onChange={(e) => {setRawBook(e.target.value) }}/>
     )
   }

   function TypographyTheme() {
     return <Box>
     <div>{String(outer(rawBook, false))}</div>
     <div><Button  onClick={()  => { outer(rawBook, true)   }}> Сохранить главы книги  </Button></div></Box>
   }

   function outer(book: string, isSave: boolean): string {
     let text = book
     let chs: Chapter[] = new Array<Chapter>()
     const nSticks: number = book.split('|').length - 1
     const nBrackets: number = book.split('{').length - 1
     let res = 'Number of |-s and {-s is '
     if (nSticks === nBrackets - 1) {
       res = res + 'right.'
       for (let i = 1; i <= nSticks; i++) {
         const ch: Chapter = parseChapter(text, i, Number(bId))
         chs.push(ch)
         text = text.substring(text.indexOf("|") + 1)
       }
      console.log('In outer we have ' + chs.length + ' chapter.')
     }
     else res = res + 'not right. |-s: ' + nSticks + ', {-s: ' + nBrackets + '.'
     if (isSave) { const bookF: BookF = {book: dummyB, chapters: chs}; insertChapters(bookF) }
     return res + ' Number of parsed chapters is ' + chs.length + '.'
   }

   function parseChapter(book: string, i: number, bId: number): Chapter {
     const symbol = "{"
     const endTitleSymbol = "|"
     const begin = book.indexOf(symbol)
     const cuttedBook = book.substring(begin+1)
     const end = cuttedBook.indexOf(symbol)
     const endTitle = cuttedBook.indexOf(endTitleSymbol)
     const title = cuttedBook.substring(0, endTitle).trim()
     const txt = cuttedBook.substring(endTitle + 1, end).trim()
     const ch: Chapter = {id: i, book: bId, title: title, head: 0, txt: txt}
     return ch
   }

   const backUrl = "/private/" + token

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Add text <br/> <Link to={backUrl}> Back </Link> </p>
      </header>
      <main className="App-main">
        {TypographyTheme()}
        {MinHeightTextarea()}
      </main>
      <footer className="App-footer">
      </footer>
    </body>
    )
}


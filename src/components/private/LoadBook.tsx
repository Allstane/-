import React, {useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import {Chapter, BookF, dummyB} from './../data/Chapter'
import {Note} from './../data/Note'
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

  function insertNotes(notes: Note[]) {
      instance.post('/admin/insertNotes', JSON.stringify(notes), headers)
        .then(r => { console.log('Response from backend after sending notes: ' + r.data) } )
   }

   function MinHeightTextarea() {
     return (
       <TextareaAutosize name="rawBook" minRows={10} placeholder="Text of a book" style={{ width: 800 }}
         onChange={(e) => {setRawBook(e.target.value) }}/>
     )
   }

   function TypographyTheme() {

     function extractNotesAndChapters(book: string, isSave: boolean): string {
        let text = book
        let notes = new Array<Note>()
        const endNoteSymbol = "@"
        const numberOfNotes: number = book.split(endNoteSymbol).length - 1
        for (let i = numberOfNotes; i > 0; i--) {
                 const symbol = '[' + i + ']'
                 const from = text.lastIndexOf('[' + i + ']')
                 const to = text.lastIndexOf("@") + 1
                 const rawNoteTxt = text.substring(from, to)
                 const noteTxt = text.substring(from + String(i).length + 2, to - 1)
                 const note: Note = {id: i, book: Number(bId), chapter: 0, txt: noteTxt}
                 notes.push(note)
                 text = text.replace(rawNoteTxt, '')
               }

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
     }
     else res = res + 'not right. |-s: ' + nSticks + ', {-s: ' + nBrackets + '.'

     notes.forEach(note => note.chapter = Number(chs.find(ch => ch.txt.includes('[' + note.id + ']'))?.id) )

     if (isSave) { const bookF: BookF = {book: dummyB, chapters: chs}; insertChapters(bookF); insertNotes(notes) }
     return res + ' Number of parsed chapters is ' + chs.length + '. Number of parsed chapters is ' + numberOfNotes + '.'
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

     return <Box>
     <div>{extractNotesAndChapters(rawBook, false)}</div>
     <div><Button  onClick={()  => { extractNotesAndChapters(rawBook, true) }}> Сохранить главы книги </Button></div></Box>
   }

   const backUrl = "/private/main"

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


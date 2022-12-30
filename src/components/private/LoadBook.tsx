import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import {styled} from '@mui/material/styles'
import {Chapter, BookF, dummyB} from './../data/Chapter'
import TextareaAutosize from '@mui/material/TextareaAutosize';


export default function LoadBook() {
   const {token, bId} = useParams()
   const [rawBook, setRawBook] = useState<string>('')

   function MinHeightTextarea() {
     return (
       <TextareaAutosize
         name="rawBook"
         minRows={30}
         placeholder="Text of a book"
         style={{ width: 800 }}
         onChange={(e) => {setRawBook(e.target.value) }}
       />
     );
   }

   const Div = styled('div')(({ theme }) => ({
     ...theme.typography.button,
     backgroundColor: theme.palette.background.paper,
     padding: theme.spacing(1),
   }));

   function TypographyTheme() {
     return <Div>{String(outer(rawBook))}</Div>;
   }

   function outer(book: string): string {
     let text = book
     let chs: Chapter[] = new Array<Chapter>()
     const nSticks: number = book.split('|').length - 1
     const nBrackets: number = book.split('{').length - 1
     let res = 'Number of |s and {s is '
     if (nSticks === nBrackets - 1) res = res + 'right.'
     else res = res + 'not right. |-s: ' + nSticks + ', {-s: ' + nBrackets + '.'
     for (let i = 1; i <= nSticks; i++) {
       const ch: Chapter = parseChapter(text, i)
       chs.push(ch)
       text = text.substring(text.indexOf("|") + 1)
     }
     const bF = {book: dummyB, chapters: chs}

     return res + ' Number of parsed chapters is ' + chs.length + '.'
   }

   function parseChapter(book: string, i: number): Chapter {
     const symbol = "{"
     const endTitleSymbol = "|"
     const begin = book.indexOf(symbol)
     const cuttedBook = book.substring(begin+1)
     const end = cuttedBook.indexOf(symbol)
     const endTitle = cuttedBook.indexOf(endTitleSymbol)
     const title = cuttedBook.substring(0, endTitle).trim()
     const txt = cuttedBook.substring(endTitle + 1, end).trim()
     const ch: Chapter = {id: i, book: 0, title: title, head: 0, txt: txt}
     return ch
   }

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Admin</p>
      </header>
      <main className="App-main">

        {TypographyTheme()}
        {MinHeightTextarea()}
      </main>
      <footer className="App-footer">
      </footer>
    </body>
    );
}


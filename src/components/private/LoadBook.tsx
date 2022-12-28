import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import EditChapter from './EditBook'
import FullDialog from './Dialog'
import {Chapter} from './../data/Chapter'
import TextareaAutosize from '@mui/material/TextareaAutosize';


export default function LoadBook() {
   const {token} = useParams();
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
     let chapters = new Array<Chapter>
     const nSticks: number = book.split('|').length - 1
     const nBrackets: number = book.split('{').length - 1
     if (nSticks == nBrackets - 1)
     {
     for (let i = 1; i <= nSticks; i++) {
       const ch = parseChapter(text, i)
       chapters.push(ch)
       text = text.substring(text.indexOf("|") + 1)
     }
     return 'Number of |s and {s is right. Chapters: ' + chapters.length + '. '
     }
     else return 'Number of |s and {s is not right. |s: ' + nSticks + ', {s: ' + nBrackets + '.'
   }

     function parseChapter(book: string, i: number): Chapter {
     const symbol = "{"
     const endTitleSymbol = "|"
     const begin = book.indexOf(symbol)
     const cuttedBook = book.substring(begin+1)
     const end = cuttedBook.indexOf(symbol)
     const endTitle = cuttedBook.indexOf(endTitleSymbol)
     console.log(endTitle)
     const title = cuttedBook.substring(0, endTitle).trim()
     console.log('Title: ' + title)
     const txt = cuttedBook.substring(endTitle + 1, end).trim()
     const ch: Chapter = {id: i, book: 0, title: title, head: 0, txt: txt}
     console.log(ch)
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


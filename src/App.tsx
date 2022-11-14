import { Paragraph} from './components/Paragraph'
import React, {ReactNode, FC, useState} from 'react'
import './App.css'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080/paragraph/11',
  timeout: 1000
});


function App() {

   const p: Paragraph = {paragraph_id: 0,
                        chapter_id: 0,
                        txt: '',
                        title: ''}
   const [left, setLeft] = useState('Пока без текста')
   const [right, setRight] = useState('Пока без текста')
   const [para, setP] = useState<Paragraph>(p)

   async function getParagraph1() {
         instance.get<Paragraph>('http://localhost:8080/paragraph/1')
           .then((response) => {console.log(response); setLeft(response.data.txt); setP(response.data)  } )
   }

   async function getParagraph17() {
         instance.get<Paragraph>('http://localhost:8080/paragraph/17')
           .then((response) => {console.log(response); setRight(response.data.txt); setP(response.data)  } )
   }

   function getParagraph(id: number) {
         instance.get<Paragraph>('http://localhost:8080/paragraph/{id}')
           .then((response) => {console.log(response); setRight(response.data.txt); setP(response.data)  } )
           return <></>
   }

   interface ButtontProps {
     play: React.MouseEventHandler<HTMLButtonElement> //what is the correct type here?
   }

   const Button: FC<ButtontProps> = ({ play }) => (
     <button onClick={play}>Play</button>
   )

   function num(id: number) {return <p>{id}</p>}

   function par () {return <>
              <table width='800'><tr><td width='50%' valign='top'>{left}</td><td width='50%' valign='top'>{right}</td></tr>
                     <tr><td>3 </td><td>4 = {para.txt}</td></tr></table></>
   }

   return (
    <body>
      <header className="App-header">
        <p>Header part</p>
        <div>
             <button onClick={getParagraph1}>Параграф</button>
        </div>
        <div>
             <button onClick={getParagraph17}>Параграф</button>
        </div>
      </header>
      <main className="App-main">
        <p>Main part</p>
        <p>{par()}</p>
      </main>
      <footer className="App-footer">
        <p>Footer part</p>
      </footer>
    </body>
    );
}
export default App;
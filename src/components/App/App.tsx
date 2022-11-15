import { dummyP, Paragraph} from './../Paragraphs/Paragraph'
import React, {FC, useState} from 'react'
import {Route, Link, Routes, useParams} from 'react-router-dom'
import './App.css'
import {instance} from './../AxiosInstance'

function App() {

   const [left, setLeft] = useState('Пока без текста')
   const [right, setRight] = useState('Пока без текста')
   const [para, setP] = useState<Paragraph>(dummyP)

   async function getParagraph1() {
         instance.get<Paragraph>('http://localhost:8080/paragraph/1')
           .then((response) => {console.log(response); setLeft(response.data.txt); setP(response.data)  } )
   }

   async function getParagraph17() {
         instance.get<Paragraph>('http://localhost:8080/paragraph/17')
           .then((response) => {console.log(response); setRight(response.data.txt); setP(response.data)  } )
   }

   function GetParagraph(id: number) {
         instance.get<Paragraph>('http://localhost:8080/paragraph/' + {id})
           .then((response) => {console.log(response); setRight(response.data.txt); setP(response.data)  } )
           return <></>
   }

   const About = () => { <div><h1>About</h1></div>}
   const Parag = () => { <div><h1>Paragraph</h1></div>}

   interface ButtontProps {
     play: React.MouseEventHandler<HTMLButtonElement>
   }
   const Button: FC<ButtontProps> = ({ play }) => (
     <button onClick={play}>Play</button>
   )

   function num(id: number) {return <p>{id}</p>}

   interface IApplicationProps {}
   const Par: React.FunctionComponent<IApplicationProps> = (props) => {
              let { pid: number = 1 } = useParams();
              return <>
              <table width='800'><tr><td width='50%' valign='top'>{left}</td><td width='50%' valign='top'>{right}</td></tr>
                     <tr><td>3 -  {GetParagraph(11)} </td><td>4 = {para.txt}</td></tr></table></>
   }

   return (
    <body>
      <header className="App-header">
        <p>Header</p>
        <div>
             <button onClick={getParagraph1}>Параграф</button>
        </div>
        <div>
             <button onClick={getParagraph17}>Параграф</button>
        </div>
      </header>
      <main className="App-main">
        <p>Main part</p>
        <p>{<Par />}</p>
      </main>
      <footer className="App-footer">
        <p>Footer part</p>
      </footer>
    </body>
    );
}
export default App;
import HelloWorld from './components/HelloWorld'
import { Paragraph} from './components/Paragraph'
import React, {ChangeEvent, useState} from 'react'
import './App.css'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080/paragraph/11',
  timeout: 1000
});

function App() {

   const [txt, setTxt] = useState('123')

   async function getParagraph() {
         instance.get<Paragraph>('http://localhost:8080/paragraph/11')
           .then((response) => {console.log(response); setTxt(response.data.txt)})
   }

   return (
    <body>
      <header>
        <p>Header part</p>
        <div><button onClick={getParagraph}>Параграф</button></div>
      </header>
      <main className="App-header">
        <p>Main part</p>
        <p>{txt}</p>
      </main>
      <footer>
        <p>Footer part</p>
      </footer>
    </body>
    );
}
export default App;
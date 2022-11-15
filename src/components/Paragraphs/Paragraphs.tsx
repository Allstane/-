import {useParams}  from 'react-router-dom'
import {useState} from 'react'
import { dummyP, Paragraph} from './Paragraph'
import {instance} from './../AxiosInstance'

interface IApplicationProps {}

const Table: React.FunctionComponent<IApplicationProps> = (props) => {
    const { left, right} = useParams();
    const [leftP, setLeft] = useState('Пока без текста')
    const [rightP, setRight] = useState('Пока без текста')

    const GetParagraph: React.FunctionComponent<IApplicationProps> = (props) => {
        instance.get<Paragraph>('http://localhost:8080/paragraph/'+left )
                .then((response) => {console.log(response); setLeft(response.data.txt)} )
        instance.get<Paragraph>('http://localhost:8080/paragraph/'+right )
                .then((response) => {console.log(response); setRight(response.data.txt)} )
        return <></>
       }
    return <>{<GetParagraph />}
           <table width='800'><tr><td width='50%' valign='top' align='justify'>{leftP}</td>
                                  <td width='50%' valign='top' align='justify'>{rightP}</td></tr>
                              <tr><td>{Number(left)}</td>
                                  <td>{right}</td></tr></table></>
}

const Paragraphs: React.FunctionComponent<IApplicationProps> = (props) => {
   return (
    <body>
      <header className="App-header">
      Какое-то меню, использовать внешнюю либу
      </header>
      <main className="App-main">
        <h1>Имя Автора, Название книги</h1>
        <p>{<Table />}</p>
      </main>
      <footer className="App-footer">
        <p>Footer part</p>
      </footer>
    </body>
    );
}

export default Paragraphs;
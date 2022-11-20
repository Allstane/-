import {useParams}  from 'react-router-dom'
import {useState} from 'react'
import { dummyP, Paragraph} from './Paragraph'
import {instance} from './../AxiosInstance'

interface IApplicationProps {}

const Table: React.FunctionComponent<IApplicationProps> = (props) => {
    const {left, right} = useParams();
    const [leftPar, setLeftPar] = useState<Paragraph>(dummyP)
    const [rightPar, setRightPar] = useState<Paragraph>(dummyP)

    const GetParagraph: React.FunctionComponent<IApplicationProps> = (props) => {
        instance.get<Paragraph>('/paragraph/'+left )
                .then((response) => {console.log(response); setLeftPar(response.data) } )
        instance.get<Paragraph>('/paragraph/'+right )
                .then((response) => {console.log(response); setRightPar(response.data) } )
        return <></>
       }
    return <>{<GetParagraph />}
           <table width='800'><tr><td width='50%' valign='top' align='justify'><p>{leftPar.title}</p><p>{leftPar.txt}</p></td>
                                  <td width='50%' valign='top' align='justify'>{rightPar.txt}</td></tr>
                              <tr><td>{Number(left)}</td>
                                  <td>4 - </td></tr></table></>
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
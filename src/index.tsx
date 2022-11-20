import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import App from './components/App/App';
import Paragraphs from './components/Paragraphs/Paragraphs'

interface IApplicationProps {}

const Home: React.FunctionComponent<IApplicationProps> = (props) => {
    return <div>Home</div>
}

const About: React.FunctionComponent<IApplicationProps> = (props) => {
    let { numb } = useParams();
    return <div>About {numb}</div>
}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return <BrowserRouter>
               <Routes>
               <Route path='/' element={<Home />} />
               <Route path='lbid/:LBId/rbid/:RBId/chid/:ChId' element={<App />} />
               <Route path='/pars/left/:left/right/:right' element={<Paragraphs />} />
               <Route path='/app/id/:id' element={<App />} />
               </Routes>
               </BrowserRouter>
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
  <Application/>
  </React.StrictMode>
)
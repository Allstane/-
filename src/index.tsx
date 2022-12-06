import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import Tablets from './components/Tablets/Tablets';
import Tablet from './components/Tablets/Tablet';
import Paragraphs from './components/Paragraphs/Paragraphs'

interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return <BrowserRouter>
               <Routes>
               <Route path='book/:bid' element={<Tablet />} />
               <Route path='lbid/:LBId/rbid/:RBId/chid/:ChId' element={<Tablets />} />
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
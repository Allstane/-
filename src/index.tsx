import React, {useState} from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Tablets from './components/Tablets/Tablets';
import Tablet from './components/Tablets/Tablet';
import Nietzsche from './components/Tablets/Nietzsche'
import Private from './components/private/Private'
import LoadBook from './components/private/LoadBook'
import Adds from './components/private/Adds'
import BookC from './components/private/BookC'
import Admin from './components/private/Admin'
import Settings from './pages/Settings/Settings';
import { verifyToken } from './utils/helpers/tokenSettings';
import LayoutWrapper from './components/Form/LayoutWrapper/LayoutWrapper';

interface IApplicationProps {}
const Application: React.FunctionComponent<IApplicationProps> = () => {
  const isTokenVerified = verifyToken()
  const [isRoleToggled, toggleIsRoleToggled] = useState<Boolean>(false) 
    return <BrowserRouter>
        <LayoutWrapper isRoleToggled={isRoleToggled} >
          <Routes>
          <Route path='/' element={<Nietzsche />} />
          <Route path='/private' element={<Private  isRoleToggled={isRoleToggled} toggleIsRoleToggled={toggleIsRoleToggled} />} />
          <Route path='/private/main' element={<Adds />} />
          {isTokenVerified && (
              <>
                <Route path='/private/:bId/load' element={<LoadBook />} />
                <Route path='/private/:bId' element={<BookC />} />
                <Route path='/private/:bId/admin' element={<Admin />} />
                <Route path='/settings' element={<Settings/>}/>
              </>
          )}
          <Route path='book/:bid' element={<Tablet />} />
          <Route path='bookc/:bid' element={<Tablet />} />
          <Route path='lbid/:LBId/rbid/:RBId/chid/:ChId' element={<Tablets />} />
          </Routes>
        </LayoutWrapper>
    </BrowserRouter>
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
      <Application />
  </React.StrictMode>
)

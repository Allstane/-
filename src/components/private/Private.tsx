import {BookF, dummyBF} from './../data/Chapter'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './../App.css'
import {instance} from './../AxiosInstance'
import SignIn from './Login'

export default function Private() {

   const {bid} = useParams();
   const [token, setToken] = useState<string>('')

   return (
    <body>
      <header className="App-header">
        <p>Project - Library: Admin</p>
      </header>
      <main className="App-main">
        <SignIn />
      </main>
      <footer className="App-footer">
      </footer>
    </body>
    );
}

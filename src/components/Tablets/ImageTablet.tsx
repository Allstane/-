import {BookF, dummyBF, Book, dummyB} from './../Chapter'
import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import './App.css'
import {instance} from './../AxiosInstance'
import Button from '@mui/material/Button';
import gridBook from './GridForOne'
import Images from './ImageList'

export default function ImageTablet() {
   return (
    <body>
      <header className="App-header">
        <p>Project - Library</p>
      </header>
      <main className="App-main">
        <Images/>
      </main>
      <footer className="App-footer"><p> </p>
      </footer>
    </body>
    );
}
import './../App.css'
import Images from './ImageList'
import BooksList from './Books'
import BookContent from './Content'

export default function Nietzsche() {

   return (
    <body>
      <main className="App-main">
        <Images />
        {BooksList(1)}
      </main>
      <footer className="App-footer"><p> </p>
      </footer>
    </body>
    )
}
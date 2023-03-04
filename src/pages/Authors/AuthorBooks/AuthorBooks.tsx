import React, {useState, useEffect} from "react"
import { Container, Grid, Stack, Pagination } from "@mui/material"
import { instance } from "../../../components/AxiosInstance"
import { Book } from "../../../components/data/Chapter"
import { Creator, dummyC } from "../../../components/data/Creator"
import { useParams, Link } from "react-router-dom"
import AuthorBookComponent from "../../../components/public/AuthorBookComponent/AuthorBookComponent"
import './style.css'

const AuthorBooks = () => {
    const {authorId} = useParams()

    const [author, setAuthor] = useState<Creator>(dummyC)
    const [authorBooks, setAuthorBooks] = useState<[Book] | []>([])
    useEffect(() => {
        instance.get<Creator>(`/author/${authorId}`)
            .then((response) => {
                setAuthor(response.data)
            })
        instance.get<[Book]>(`/books/${authorId}`)
            .then((response) => {
                setAuthorBooks(response.data)
            })
    }, [])
    return <Container>
         <h1 className="author-books-header">Books writed by {author?.english_name}</h1>
        <Grid container spacing={4} className="author-books-wrapper">
            {authorBooks.map( (book: Book) => 
              <Grid item key={book.id}>
                <Link to={`/lbid/${book.id}/rbid/${book.id}/chid/1`} style={{textDecoration: 'none'}}>
                <AuthorBookComponent 
                    id={book.id}
                    author={book.author}
                    language={book.language}
                    title={book.title}
                    owner={book.owner} 
                    metabook={book.metabook} 
                    translation_date={book.translation_date} 
                    translator={book.translator} 
                    is_ready={book.is_ready} 
                    is_visible={book.is_visible}               
                /> 
                </Link>
              </Grid>
            )}
        </Grid>
        <Stack spacing={2} className="pagination-wrapper">
          <Pagination 
            page={1}
            count={10} 
            color="primary" 
          />
        </Stack>
    </Container>
}

export default AuthorBooks
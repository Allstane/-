import React, {useState, useEffect} from "react"
import { Container, Grid, Stack, Pagination } from "@mui/material"
import { instance } from "../../AxiosInstance"
import { Creator } from "../../../components/data/Creator"
import { Link } from "react-router-dom"
import AuthorComponent from "../../../components/Form/AuthorComponent/AuthorComponent"
import './style.css'

const Authors = () => {

    const [authors, setAuthors] = useState<Creator[]>([])
    const headers = {headers: {'Origin': 'http://www.alefowl.com'}}
    useEffect(() => { instance.get<[Creator]>("/authors", headers).then((response) => { setAuthors(response.data) }) }, [])

    return <Container>
        <Grid container spacing={4} className="authors-wrapper">
            {authors.filter(a => a.is_author === true).map((data: Creator) => {
                return <Grid item key={data.id}>
                    <Link to={`/author/${data.id}`} style={{textDecoration: 'none', color: 'black'}}>
                        <AuthorComponent  
                            authorName={data.english_name}
                            birthDate={data.birth_date}
                            deathDate={data.death_date} 
                            language={data.original_language} 
                        />
                    </Link>
                </Grid>
            })}
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

export default Authors
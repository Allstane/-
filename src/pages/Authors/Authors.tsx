import React, {useState, useEffect} from "react";
import { Container, Grid, Stack, Pagination } from "@mui/material";
import { instance } from "../../components/AxiosInstance";
import { Author } from "./AuthorTypes";
// import { Link } from "react-router-dom";
import AuthorComponent from "../../components/Form/AuthorComponent/AuthorComponent";
import './style.css'

const Authors = () => {

    const [authors, setAuthors] = useState<[ Author] | []>([])
    useEffect(() => {
        instance.get<[Author]>("/authors")
            .then((response) => {
                setAuthors(response.data)
            })
    }, [])

    return <Container>
        <Grid container spacing={4} className="authors-wrapper">
            {authors.map((data: Author) => {
                return <Grid item key={data.id}>
                    <AuthorComponent  
                        authorName={data.english_name}
                        birthDate={data.birth_date}
                        deathDate={data.death_date} 
                        language={data.original_language} 
                    />
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
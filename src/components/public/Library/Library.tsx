import React, {useState, useEffect} from "react"
import { Container, Grid, Stack, Pagination } from "@mui/material"
import BookComponent from "../BookComponent/BookComponent"
import { instance } from "../../AxiosInstance"
import { Book } from "../../data/Chapter"
import { MetabookF } from "../../data/Metabook"
import {Metabook, Metalibrary} from './../../data/Metabook'
import { Link } from "react-router-dom"
import './style.css'

const Library = () => {
    const [metalibrary, setMetalibrary] = useState<Metalibrary>([])

    const getMetalibrary = () => { instance.get<Metalibrary>('/metabooks').then((ml) => {setMetalibrary(ml.data) } ) }

    useEffect( () => getMetalibrary(), [])

    return <Container>
        <header className="library-header">
            <p>Our Library</p>
        </header>
        <Grid container spacing={4} className="library-wrapper">
            {metalibrary.map( (metabook: Metabook) => 
              <Grid item key={metabook.id}>
                <Link to={`/lbid/${metabook.id}/rbid/${metabook.id}/chid/1`} style={{textDecoration: 'none'}}>
                  <BookComponent 
                    id={metabook.id} 
                    author={metabook.author} 
                    language={metabook.language} 
                    title={metabook.title} 
                    create_date={metabook.create_date} 
                    size={metabook.size} 
                    owner={metabook.size} 
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

export default Library
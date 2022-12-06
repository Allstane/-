import * as React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {Book, Chapter} from './../Chapter'
import langLinks from './LanguageLinks'
import {Link} from 'react-router-dom'
import changeLanguage from './Tablets'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}));

export default function gridTablets(leftBook: Book, rightBook: Book, leftChapter: Chapter, rightChapter: Chapter,
                                    deBook: number, ruBook: number) {
  return (
    <Box sx={{ width: '60%' }}>
      <Grid container  justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>{leftBook.author} "{leftBook.title}"</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{rightBook.author} "{rightBook.title}"</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{leftChapter.title}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{rightChapter.title}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{leftChapter.txt}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{rightChapter.txt}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{langLinks(leftBook.id, rightBook.id, leftChapter.id, deBook, ruBook, false)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{langLinks(leftBook.id, rightBook.id, leftChapter.id, deBook, ruBook, true)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><Button variant="contained">Previous</Button></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><Button variant="contained">Next</Button></Item>
        </Grid>
      </Grid>
    </Box>
  );
}
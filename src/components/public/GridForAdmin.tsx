import * as React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import {BookF} from '../data/Chapter'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}))

export default function gridBookAdmin(book: BookF) {
  return (
    <Box sx={{ width: '60%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={10   }>
          <Item>{book.book.title}</Item>
        </Grid>
        {book.chapters.map(ch => <Grid item xs={10}><Item>{ch.title}<br/>{ch.txt}</Item></Grid>)}
      </Grid>
    </Box>
  )
}
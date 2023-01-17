import * as React from 'react'
import {styled} from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import {BookF} from './../data/Chapter'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}))

const GridBook = ({book, chapters}: BookF) => {
  return (
    <Box sx={{ width: '60%' }}>
      <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={10}>
          <Item>{book.title}</Item>
        </Grid>
        {chapters.map((ch: any, idx: number) => <Grid key={idx} item xs={10}><Item>{ch.title}<br/>{ch.txt}</Item></Grid>)}
      </Grid>
    </Box>
  )
}

export default GridBook
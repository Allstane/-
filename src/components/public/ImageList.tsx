import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

export default function Imagest() {
  return (
    <ImageList sx={{ width:800, height: 600 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}><a href={item.link}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          /></a>
        </ImageListItem>
      ))}
    </ImageList>
  )
}

const itemData = [
  {
    img: './unknown.jpeg',
    title: 'Menschliches',
    link: '/lbid/10/rbid/10/chid/2'
  },
  {
    img: './unknown.jpeg',
    title: 'Burger',
    link: '/lbid/15/rbid/15/chid/3'
  },
  {
    img: './unknown.jpeg',
    title: 'Camera',
    link: '/lbid/16/rbid/16/chid/2'
  },
  {
    img: './antic.jpeg',
    title: 'Antichrist',
    link: '/lbid/2/rbid/1/chid/1'
  },
  {
    img: './nietzsche.jpeg',
    title: 'Nietzsche',
    link: '/'
  },
  {
    img: './zara.jpeg',
    title: 'Zarathustra',
    link: '/lbid/3/rbid/8/chid/3'
  },
  {
    img: './unknown.jpeg',
    title: 'Fern',
    link: '/lbid/14/rbid/14/chid/2'
  },
  {
    img: './ecce.jpg',
    title: 'Ecce homo',
    link: '/lbid/11/rbid/12/chid/2'
  },
  {
    img: './4.jpg',
    title: 'Beyond good and evil',
    link: '/lbid/7/rbid/9/chid/3'
  }
]
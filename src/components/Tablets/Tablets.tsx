import { Chapter, dummyCh, Book, dummyB } from "./../data/Chapter"
import { MetabookF, dummyMF } from "./../data/Metabook"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import "./../App.css"
import { instance } from "./../AxiosInstance"
import Button from "@mui/material/Button"
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import BookView from "./BookView"
import Tags from "./Tags"
import {TagInUse} from './../data/Tag'

function Tablets() {
  const {ChId, LBId, RBId} = useParams()
  const [maxBookPage, setMaxBookPage] = useState<Number>(0)
  const [currentPage, setCurrentPage] = useState<Number>(1)
  const [leftChapter, setLeftChapter] = useState<Chapter>(dummyCh)
  const [rightChapter, setRightChapter] = useState<Chapter>(dummyCh)
  const [metabookF, setMetabookF] = useState<MetabookF>(dummyMF)
  const [isSplitView, onToggleSplitView] = useState(false)

  useEffect(() => {
    getMetabookF()
    getChapters()
    setCurrentPage(Number(ChId))
  }, [ChId, LBId, RBId])

  function getMetabookF() {
    instance.get<MetabookF>("/metabookF/" + Number(LBId)).then((response) => { setMetabookF(response.data); updateBookPage(response.data.metabook.size) })
  }

  function updateBookPage(bookSize: number) {
    if (!!bookSize) {
      setMaxBookPage(bookSize)
    } else {
      setMaxBookPage(0)
    }
  }

  function getChapters() {
    instance
      .get<Chapter>("/book/" + Number(LBId) + "/chapter/" + Number(ChId))
      .then((ch) => {
        setLeftChapter(ch.data)
      })
    instance
      .get<Chapter>("/book/" + Number(RBId) + "/chapter/" + Number(ChId))
      .then((ch) => {
        setRightChapter(ch.data)
      })
  }

  function findBook(metabookF: MetabookF, bookId: number): Book {
    const book: Book =
      metabookF.books.find((book) => book.id === bookId) ?? dummyB
    return book
  }

  function actualTags(book: number, chapter: number, tags: Array<TagInUse>): Array<TagInUse> {
    return tags.filter(tag => tag.book === book && tag.chapter === chapter )
  }

  const PageSwitchWrapper = () => {
    return (
        <Stack spacing={2}>
          <Pagination 
            page={+currentPage}
            count={(Number(maxBookPage) - 1)} 
            color="primary" 
            renderItem={(item) => {
              return <PaginationItem
                  component={Link}
                  to={`/lbid/${Number(LBId)}/rbid/${Number(RBId)}/chid/${item.page}`}
                  {...item}
                />
            }}
              
          />
        </Stack>
    )
  }

   return (
    <>
      <header className="App-header">
        <p>{findBook(metabookF, Number(LBId)).title}</p>
        <Button variant="contained" onClick={() => onToggleSplitView(!isSplitView)}>Split View</Button>
        <p>{ Tags(actualTags(Number(LBId), Number(ChId), metabookF.tags))  }</p>
      </header>
      <main className="App-main">
        {BookView(
          findBook(metabookF, Number(LBId)),
          findBook(metabookF, Number(RBId)),
          leftChapter,
          rightChapter,
          metabookF,
          Number(ChId),
          isSplitView
        )}
        <PageSwitchWrapper />
      </main>
    </>
  )
}
export default Tablets

import { Chapter, dummyCh, Book, dummyB } from "./../data/Chapter"
import { MetabookF, dummyMF } from "./../data/Metabook"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import "./../App.css"
import { instance } from "./../AxiosInstance"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import BookView from "./BookView"

function Tablets() {
  const { ChId, LBId, RBId } = useParams()
  const [leftChapter, setLeftChapter] = useState<Chapter>(dummyCh)
  const [rightChapter, setRightChapter] = useState<Chapter>(dummyCh)
  const [metabookF, setMetabookF] = useState<MetabookF>(dummyMF)
  const [isSplitView, onToggleSplitView] = useState(false)

  useEffect(() => {
    getMetabookF()
    getChapters()
  }, [ChId, LBId, RBId])
  function getMetabookF() {
    instance.get<MetabookF>("/metabookF/" + Number(LBId)).then((response) => {
      setMetabookF(response.data)
    })
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

  function changeChapter(
    leftBook: number,
    rightBook: number,
    chapter: number
  ): string {
    return "/lbid/" + leftBook + "/rbid/" + rightBook + "/chid/" + chapter
  }

  function findBook(metabookF: MetabookF, bookId: number): Book {
    const book: Book =
      metabookF.books.find((book) => book.id === bookId) ?? dummyB
    return book
  }

  const PageSwitchWrapper = () => {
    return (
      <Grid
        container
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{marginTop: '10px'}}
      >
        <Grid container xs={3.5} style={{justifyContent: 'center'}}>
          <Button
            component={Link}
            to={changeChapter(Number(LBId), Number(RBId), Number(ChId) - 1)}
            variant="contained"
          >
            Previous
          </Button>
        </Grid>
        <Grid container xs={3.5} style={{justifyContent: 'center', paddingLeft: '24px'}}>
          <Button
            component={Link}
            to={changeChapter(Number(LBId), Number(RBId), Number(ChId) + 1)}
            variant="contained"
          >
            Next
          </Button>
        </Grid>
      </Grid>
    )
  }

   return (
    <>
      <header className="App-header">
        <p>{findBook(metabookF, Number(LBId)).title}</p>
        <Button variant="contained" onClick={() => onToggleSplitView(!isSplitView)}>Split View</Button>

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

import React, { useState } from "react"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { MetabookF } from "../data/Metabook"
import { Book, dummyB } from "../data/Chapter"

export default function LanguageSelect(
  props: { leftBook: number, rightBook: number, chapter: number, metabookF: MetabookF, lr: boolean }
) {
  const {leftBook,
    rightBook,
    chapter,
    metabookF,
    lr,} = props
  const [selectedLanguage, onLanguageChange] = useState("")
  const [isSelectOpen, onChangeSelectView] = useState(false)
  const activeBooks: Array<Book> = metabookF.books.filter(
    (book: { is_ready: any, is_visible: any }) => book.is_ready && book.is_visible
  )

  const langs: Lang[] = [
    { n: 0, title: "dummy" },
    { n: 1, title: "Английский" },
    { n: 2, title: "Русский" },
    { n: 3, title: "Немецкий" },
    { n: 4, title: "Французский" },
    { n: 5, title: "Итальянский" },
    { n: 6, title: "Испанский" },
  ]

  const handleTriggerSelect = (event: SelectChangeEvent) => {
    onLanguageChange(event.target.value as string)
    handleClose()
  }
  const handleClose = () => {
    onChangeSelectView(false)
  }

  const handleOpen = () => {
    onChangeSelectView(true)
  }
  function langLinks(
    leftBook: number,
    rightBook: number,
    chapter: number,
    newBook: number | undefined,
    lr: boolean
  ) {
    let url = ""
    switch (lr) {
      case false: {
        url = "/lbid/" + newBook + "/rbid/" + rightBook + "/chid/" + chapter
        break
      }
      case true: {
        url = "/lbid/" + leftBook + "/rbid/" + newBook + "/chid/" + chapter
      }
    }
    return url
  }

  function newBook(metabookF: MetabookF, lang: number): number {
    const book: Book =
      metabookF.books.find((book) => book.language === lang) ?? dummyB
    return book.id
  }

  type Lang = { n: number, title: string }

  function language(lang: number): string {
    const result = langs.find((l) => l.n === lang) ?? { n: 0, title: "dummy" }
    return result.title
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 125 }}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          value={selectedLanguage}
          label="Language"
          labelId="demo-controlled-open-select-label"
          open={isSelectOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          id="demo-controlled-open-select"
          onChange={handleTriggerSelect}
        >
          {activeBooks.map((book, idx) => (
            <MenuItem style={{position: 'relative'}} value={language(book.language)} key={idx}>
              <Link
                style={{
                  position: 'absolute',
                  width: '100%',
                  top: 0,
                  left: 0,
                  height: '100%'
                }}
                to={langLinks(
                  leftBook,
                  rightBook,
                  chapter,
                  newBook(metabookF, book.language),
                  lr
                )}
              />
                {language(book.language)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

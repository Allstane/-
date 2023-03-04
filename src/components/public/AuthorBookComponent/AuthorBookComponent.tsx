import React from "react"
import { Chip } from "@mui/material"
import { Book } from "../../data/Chapter"
import { getLanguageById } from "../../constants/language"
import './style.css'

export default function AuthorBookComponent (book: Book) {
    const bookLanguage = getLanguageById(book.language).english
    return <div className="book-wrapper">
        <img className="book-preview-image" src="https://images.unsplash.com/photo-1522770179533-24471fcdba45" alt="book preview"/>
        <div className="book-description">
            <p className="book-title">{book.title}</p>
            <p className="book-author">Author: {book.author}</p>
            <p>Language: <Chip label={bookLanguage} color="primary"/></p>
        </div>
    </div>
}
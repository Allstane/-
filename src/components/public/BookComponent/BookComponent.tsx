import React from "react"
import {Metabook} from './../../data/Metabook'
import './style.css'

export default function BookComponent (metabook: Metabook) {
    return <div className="book-wrapper">
        <img className="book-preview-image" src="https://images.unsplash.com/photo-1522770179533-24471fcdba45" alt="book preview"/>
        <div className="book-description">
            <p className="book-title">{metabook.title} {metabook.create_date ? metabook.create_date : ''} </p>
            <p className="book-author">Author: {metabook.author}</p>
        </div>
    </div>
}

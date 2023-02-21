import React from "react";
import { getLanguageById } from "../../../utils/constants/language";
import './style.css'
const AuthorComponent = ({birthDate, deathDate, language, authorName}: any) => {
    const originLanguage = getLanguageById(language).english
    return <div className="author-wrapper">
        <img className="author-image" src='https://kpi.ua/files/images/shevchenko.jpg' alt="author"/>
        <div className="author-description">
            <p className="author-name">{authorName}</p>
            <p className="author-life-date">{deathDate ? `${birthDate}-${deathDate}` : ''}</p>
            <div className="language-wrapper">Origin Language is: {originLanguage}</div>
        </div>
    </div>
}

export default AuthorComponent
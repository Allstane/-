import {Link} from 'react-router-dom'

export default function langLinks(leftBook: number, rightBook: number, chapter: number, newBook: number, lang: number, lr: boolean)
   {let url = '';
    switch (lr){
     case false: {url = "/lbid/"+newBook+"/rbid/"+rightBook+"/chid/"+chapter; break}
     case true: {url = "/lbid/"+leftBook+"/rbid/"+newBook+"/chid/"+chapter} }
     return <Link to={url}> Экземпляр на немецком </Link>
     }

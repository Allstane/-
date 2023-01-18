import {Book} from './Chapter'
import {TagInUse} from './Tag'

export type Metabook = {
  id: number
  author: number
  language: number
  title: string
  create_date: number
}

export type MetabookF = {
  metabook: Metabook
  books: Array<Book>
  tags: Array<TagInUse>
}

export const dummyM = {id: -1, author: 0, language: 0, title: '', create_date: 0}
export const dummyMF =  {metabook: dummyM, books: [], tags: []}

export type Metalibrary = Metabook[]
export const dummyML = []
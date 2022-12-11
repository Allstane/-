import {Book} from './Chapter'

export type Metabook = {
  id: number;
  author: number;
  language: number;
  title: string;
  create_date: number
}

export type MetabookF = {
  metabook: Metabook;
  books: Array<Book>;
}

export const dummyM = {id: 0, author: 0, language: 0, title: '', create_date: 0}
export const dummyMF =  {metabook: dummyM, books: []}
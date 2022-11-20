export type Chapter = {
  id: number;
  book: number;
  title: string;
  head: number;
  txt: string;
}

export const dummyCh: Chapter = {id: 0, book: 0, title: '', head: 0, txt: ''}

export type Book = {
  id: number;
  metabook: number;
  language: number;
  title: string;
  author: string;
  translation_date: number;
  translator: number;
  is_ready: boolean;
  is_visible: boolean;
}

export type BookF = {
  book: Book;
  chapters: Array<Chapter>;
}

export const dummyB: Book = {id: 0, metabook: 0, language: 0, title: '', author: '', translation_date: 0, translator: 0, is_ready: false, is_visible: false }
export const dummyBF: BookF = {book: dummyB, chapters: []}
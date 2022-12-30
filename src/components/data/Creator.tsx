export type Creator = {
  id: number;
  english_name: string;
  russian_name: string;
  german_name: string;
  original_language: number;
  birth_date: number;
  death_date: number;
  is_author: boolean;
  is_translator: boolean
}

export const dummyC: Creator =
  {id: 0, english_name: '', russian_name: '', german_name: '', original_language: 1,
   birth_date: 0, death_date: 0, is_author: false, is_translator: false}

export type People = {people: Array<Creator>}

export const dummyP = {people: []}

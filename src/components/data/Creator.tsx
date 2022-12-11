export type Creator = {
  id: number;
  original_name: string;
  original_language: number;
  birth_date: number;
  death_date: number;
  is_author: boolean;
  is_translator: boolean
}

export const dummyC: Creator =
  {id: 0, original_name: '', original_language: 1, birth_date: 0, death_date: 0, is_author: false, is_translator: false}

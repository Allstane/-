export type Tag = {
  id: number
}

export type TagInUse = {
  book: number,
  chapter: number,
  owners_title: string
  owners_description: string
}

export type TagsT = Array<TagInUse>

export interface TagTypes {
  sex: string,
  detective: string,
  war: string,
  drama: string,
  comedy: string,
}
export type User = {
  id: number
  login: string
  password: string
  token: string
  role: string
}

export type RegData = {
  login: string | FormDataEntryValue | null
  password: string | FormDataEntryValue | null 
  firstname: string | FormDataEntryValue | null 
  surname: string | FormDataEntryValue | null 
  email: string | FormDataEntryValue | null 
  tg?: null 
  favbooks?: null 
  origlang?: null 
  langs?: null 
  location?: null 
}
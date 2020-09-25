export interface User {
  _id?: string
  email: string
  password: string
  login?: string
  name?: string
  surname?: string
}

export interface Quest {
  _id?: string
  title: string
  image: string
  description: string
  user?: string
}

export interface Query {
  _id?: string
  title: string
  file?: string
  quest: string
  answer: string
  image?: string
  answers: [],
}

export interface Book {
  id: string
  isbn: string
  cCode: string
  title: string
  category: string
  author: string
  publishing: string
  amount: number
  available: boolean
  userId: string | null
}

export interface Category {
  id: string
  name: string
}

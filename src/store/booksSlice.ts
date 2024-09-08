// src/store/booksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Book {
  id: string
  isbn: string
  cCode: string
  title: string
  author: string
  publishing: string
  amount: number
  available: boolean
  userId: string | null
}

interface BooksState {
  list: Book[]
}

const initialState: BooksState = {
  list: [],
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.list = action.payload
    },
    addBook(state, action: PayloadAction<Book>) {
      state.list.push(action.payload)
    },
    updateBook(state, action: PayloadAction<Book>) {
      state.list = state.list.map((book) =>
        book.id === action.payload.id ? action.payload : book,
      )
    },
    deleteBook(state, action: PayloadAction<string>) {
      state.list = state.list.filter((book) => book.id !== action.payload)
    },
  },
})

export const { setBooks, addBook, updateBook, deleteBook } = booksSlice.actions
export default booksSlice.reducer

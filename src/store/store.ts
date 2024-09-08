// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './booksSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer, // books 상태를 관리하는 리듀서
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { useState, useEffect } from 'react'
import { Book } from '@/types/book'

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([])

  const fetchBooks = async () => {
    const response = await fetch('/api/books')
    const data = await response.json()
    setBooks(data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return { books, fetchBooks }
}

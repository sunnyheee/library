'use client'
import React, { useEffect, useState } from 'react'
import { Loan, Book } from '@prisma/client'
import SearchBar from './SearchBar'
import BookListTable from './BookListTable'
import BookDetailModal from '../admin/BookDetailModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setBooks } from '@/store/booksSlice'

interface BooklistProps {
  books: Book[]
  loans?: Loan[]
  isAdminPage?: boolean
  onUpdate?: (updatedBook: Book) => void
  onDelete?: (bookId: string) => void
}

const Booklist: React.FC<BooklistProps> = ({
  books = [],
  loans,
  isAdminPage = false,
  onUpdate,
  onDelete,
}) => {
  const dispatch = useDispatch()

  const reduxBooks = useSelector((state: RootState) => state.books.list)

  useEffect(() => {
    if (books.length > 0) {
      dispatch(setBooks(books))
    }
  }, [books, dispatch])

  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const handleCloseModal = () => {
    setSelectedBook(null)
  }

  const handleUpdateBook = (updatedBook: Book) => {
    if (onUpdate) {
      onUpdate(updatedBook)
    }
  }

  const handleDeleteBook = (bookId: string) => {
    if (onDelete) {
      onDelete(bookId)
    }
  }

  return (
    <div className="overflow-x-auto">
      <SearchBar
        searchIsbn={''}
        onSearchIsbnChange={() => {}}
        searchCCode={''}
        onSearchCCodeChange={() => {}}
        searchTitle={''}
        onSearchTitleChange={() => {}}
        searchAuthor={''}
        onSearchAuthorChange={() => {}}
        searchPublishing={''}
        onSearchPublishingChange={() => {}}
        searchAmount={''}
        onSearchAmountChange={() => {}}
        searchCategory={''}
        onSearchCategoryChange={() => {}}
        isAdmin={true}
      />
      <BookListTable
        books={reduxBooks}
        loans={loans}
        isAdmin={isAdminPage}
        onBookClick={setSelectedBook}
      />
      {selectedBook && isAdminPage && (
        <BookDetailModal
          book={selectedBook}
          isOpen={true}
          onClose={handleCloseModal}
          onUpdate={handleUpdateBook}
          onDelete={handleDeleteBook}
        />
      )}
    </div>
  )
}

export default Booklist

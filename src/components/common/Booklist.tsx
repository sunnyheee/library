'use client'

import React, { useState } from 'react'
import { Loan, Book } from '@prisma/client'
import SearchBar from './SearchBar'
import BookListTable from './BookListTable'
import BorrowReturnModal from './BorrowReturnModal'
import BookDetailModal from '../admin/BookDetailModal'

interface BooklistProps {
  books: Book[]
  loans?: Loan[]
  onUpdate?: (updatedBook: Book) => void
  onDelete?: (bookId: string) => void
  isAdminPage?: boolean
}

const Booklist: React.FC<BooklistProps> = ({
  books,
  loans,
  onUpdate,
  onDelete,
  isAdminPage = false,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [currentAction, setCurrentAction] = useState<
    'borrow' | 'return' | null
  >(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [localBooks, setLocalBooks] = useState<Book[]>(books)

  const handleBorrowOrReturnClick = (
    book: Book,
    action: 'borrow' | 'return',
  ) => {
    setSelectedBook(book)
    setCurrentAction(action)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedBook(null)
    setCurrentAction(null)
  }

  const handleUpdateBook = (updatedBook: Book) => {
    setLocalBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book,
      ),
    )
  }

  const handleDeleteBook = (bookId: string) => {
    setLocalBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
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
      />
      <BookListTable
        books={localBooks}
        loans={loans}
        isAdmin={isAdminPage}
        onBorrowOrReturnClick={handleBorrowOrReturnClick}
        onBookClick={setSelectedBook}
      />
      <BorrowReturnModal
        isOpen={isModalOpen}
        action={currentAction}
        book={selectedBook}
        onClose={handleCloseModal}
        onUpdate={(updatedBook) => {
          handleUpdateBook(updatedBook)
          handleCloseModal()
        }}
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

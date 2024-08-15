'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Book } from '@prisma/client'
import BookDetailModal from './BookDetailModal'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

interface BooklistProps {
  books: Book[]
  onUpdate?: (updatedBook: Book) => void
  onDelete?: (bookId: string) => void
}

const Booklist: React.FC<BooklistProps> = ({ books, onUpdate, onDelete }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ISBN</TableHead>
            <TableHead>Cコード</TableHead>
            <TableHead>区分</TableHead>
            <TableHead>タイトル</TableHead>
            <TableHead>著者</TableHead>
            <TableHead>出版社</TableHead>
            <TableHead>数量</TableHead>
            {isAdmin && <TableHead></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.code}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.publishing}</TableCell>
              <TableCell>{book.amount}</TableCell>
              {isAdmin && (
                <TableCell>
                  <Button onClick={() => handleBookClick(book)}>詳細</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </div>
  )
}

export default Booklist

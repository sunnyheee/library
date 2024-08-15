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
import { Book } from '@/types/book'
import BookDetailModal from '../admin/BookDetailModal'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { getCCodeLabel } from '@/utils/getCCodeLabel'
import SearchBar from './SearchBar'

interface BooklistProps {
  books: Book[]
  onUpdate?: (updatedBook: Book) => void
  onDelete?: (bookId: string) => void
}

const Booklist: React.FC<BooklistProps> = ({ books, onUpdate, onDelete }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [searchIsbn, setSearchIsbn] = useState('')
  const [searchCCode, setSearchCCode] = useState('')
  const [searchTitle, setSearchTitle] = useState('')
  const [searchAuthor, setSearchAuthor] = useState('')
  const [searchPublishing, setSearchPublishing] = useState('')
  const [searchAmount, setSearchAmount] = useState('')

  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const filteredBooks = books.filter(
    (book) =>
      (searchIsbn ? book.isbn.includes(searchIsbn) : true) &&
      (searchCCode ? book.cCode.includes(searchCCode) : true) &&
      (searchTitle
        ? book.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true) &&
      (searchAuthor
        ? book.author.toLowerCase().includes(searchAuthor.toLowerCase())
        : true) &&
      (searchPublishing
        ? book.publishing.toLowerCase().includes(searchPublishing.toLowerCase())
        : true) &&
      (searchAmount ? book.amount === Number(searchAmount) : true),
  )

  const indexOfLastBook = currentPage * itemsPerPage
  const indexOfFirstBook = indexOfLastBook - itemsPerPage
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)

  return (
    <div className="overflow-x-auto">
      <SearchBar
        searchIsbn={searchIsbn}
        onSearchIsbnChange={setSearchIsbn}
        searchCCode={searchCCode}
        onSearchCCodeChange={setSearchCCode}
        searchTitle={searchTitle}
        onSearchTitleChange={setSearchTitle}
        searchAuthor={searchAuthor}
        onSearchAuthorChange={setSearchAuthor}
        searchPublishing={searchPublishing}
        onSearchPublishingChange={setSearchPublishing}
        searchAmount={searchAmount}
        onSearchAmountChange={setSearchAmount}
      />
      <Table className="min-w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">ISBN</TableHead>
            <TableHead className="w-[120px]">Cコード</TableHead>
            <TableHead className="w-[180px]">区分</TableHead>
            <TableHead className="w-[180px]">タイトル</TableHead>
            <TableHead className="w-[180px]">著者</TableHead>
            <TableHead className="w-[180px]">出版社</TableHead>
            <TableHead className="w-[120px]">数量</TableHead>
            {isAdmin && <TableHead className="w-[120px]">詳細</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="w-[180px]">{book.isbn}</TableCell>
              <TableCell className="w-[120px]">{book.cCode}</TableCell>
              <TableCell className="w-[180px]">
                {getCCodeLabel(book.cCode)}
              </TableCell>
              <TableCell className="w-[180px]">{book.title}</TableCell>
              <TableCell className="w-[180px]">{book.author}</TableCell>
              <TableCell className="w-[180px]">{book.publishing}</TableCell>
              <TableCell className="w-[120px]">{book.amount}</TableCell>
              {isAdmin && (
                <TableCell className="w-[120px]">
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
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <Select onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="ml-2 w-[180px]">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Booklist

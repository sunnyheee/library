import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Book } from '@/types/book'

interface BooklistProps {
  books: Book[]
}

const Booklist: React.FC<BooklistProps> = ({ books }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">タイトル</TableHead>
          <TableHead>著者</TableHead>
          <TableHead>ISBN</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id}>
            <TableCell className="font-medium">{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.isbn}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Booklist

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Book, Loan } from '@prisma/client'
import { getCCodeLabel } from '@/utils/getCCodeLabel'
import { useSession } from 'next-auth/react'

interface BookListTableProps {
  books: Book[]
  loans?: Loan[]
  isAdmin: boolean
  onBorrowOrReturnClick: (book: Book, action: 'borrow' | 'return') => void
  onBookClick: (book: Book) => void
}

const BookListTable: React.FC<BookListTableProps> = ({
  books,
  loans,
  isAdmin,
  onBorrowOrReturnClick,
  onBookClick,
}) => {
  const { data: session, status } = useSession()
  const isBookLoaned = (bookId: string) => {
    return (
      loans?.some(
        (loan) =>
          loan.bookId === bookId &&
          loan.userId === session?.user?.id &&
          !loan.returned,
      ) ?? false
    )
  }

  return (
    <>
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
            {!isAdmin && <TableHead className="w-[120px]"></TableHead>}
            {isAdmin && <TableHead className="w-[120px]">詳細</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => {
            const loaned = isBookLoaned(book.id)

            return (
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
                {!isAdmin && (
                  <TableCell className="w-[120px]">
                    {loaned ? (
                      <Button
                        onClick={() => onBorrowOrReturnClick(book, 'return')}
                      >
                        반납하기
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onBorrowOrReturnClick(book, 'borrow')}
                        disabled={book.amount === 0}
                      >
                        {book.amount > 0 ? '빌리기' : '대출 불가'}
                      </Button>
                    )}
                  </TableCell>
                )}
                {isAdmin && (
                  <TableCell className="w-[120px]">
                    <Button onClick={() => onBookClick(book)}>詳細</Button>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default BookListTable

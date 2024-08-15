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
          <TableHead>ISBN</TableHead>
          <TableHead>Cコード</TableHead>
          <TableHead>区分</TableHead>
          <TableHead>タイトル</TableHead>
          <TableHead>著者</TableHead>
          <TableHead>出版社</TableHead>
          <TableHead>数量</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Booklist

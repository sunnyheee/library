'use client'

import React, { useState } from 'react'
import { Book } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface BookDetailModalProps {
  book: Book
  isOpen: boolean
  onClose: () => void
  onUpdate?: (updatedBook: Book) => void
  onDelete?: (bookId: string) => void
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [isbn, setIsbn] = useState(book.isbn)
  const [code, setCode] = useState(book.code)
  const [title, setTitle] = useState(book.title)
  const [category, setCategory] = useState(book.category)
  const [author, setAuthor] = useState(book.author)
  const [publishing, setPublishing] = useState(book.publishing)
  const [amount, setAmount] = useState(book.amount)

  const handleUpdate = async () => {
    const updatedBook = {
      ...book,
      isbn,
      code,
      title,
      category,
      author,
      publishing,
      amount,
    }

    const response = await fetch(`/api/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })

    if (response.ok && onUpdate) {
      onUpdate(updatedBook)
      onClose()
    }
  }

  const handleDelete = async () => {
    const response = await fetch(`/api/books/${book.id}`, {
      method: 'DELETE',
    })

    if (response.ok && onDelete) {
      onDelete(book.id)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <Input
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
        />
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Cコード"
        />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
        />
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="区分"
        />
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="著者"
        />
        <Input
          value={publishing}
          onChange={(e) => setPublishing(e.target.value)}
          placeholder="出版社"
        />
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="数量"
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={handleUpdate}>修正</Button>
          <Button onClick={handleDelete} variant="destructive">
            削除
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BookDetailModal

'use client'

import React, { useState } from 'react'
import { Book } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cCodeOptions } from '@/config/cCodeOptions'

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
  const [cCodeCategory, setCCodeCategory] = useState(book.cCode.slice(2))
  const [audience, setAudience] = useState(book.cCode.charAt(0))
  const [form, setForm] = useState(book.cCode.charAt(1))
  const [title, setTitle] = useState(book.title)
  const [author, setAuthor] = useState(book.author)
  const [publishing, setPublishing] = useState(book.publishing)
  const [amount, setAmount] = useState(book.amount)

  const handleUpdate = async () => {
    const updatedCCode = `${audience}${form}${cCodeCategory}`
    const updatedBook = {
      ...book,
      isbn,
      cCode: updatedCCode,
      title,
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
      <DialogContent className="pt-12">
        <DialogTitle>修正/削除</DialogTitle>
        <dl className="flex flex-wrap items-center mb-2">
          <dt className="w-[120px]">ISBN</dt>
          <dd className="flex-1">
            <Input
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="ISBN"
            />
          </dd>
        </dl>
        <dl className="flex flex-wrap items-center mb-2">
          <dt className="w-[120px]">販売対象</dt>
          <dd className="flex-1">
            <Select
              value={audience}
              onValueChange={(value) => setAudience(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="販売対象を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cCodeOptions.audiences.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </dd>
        </dl>
        <dl className="flex flex-wrap items-center mb-2">
          <dt className="w-[120px]">発行形態</dt>
          <dd className="flex-1">
            <Select value={form} onValueChange={(value) => setForm(value)}>
              <SelectTrigger>
                <SelectValue placeholder="発行形態を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cCodeOptions.forms.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </dd>
        </dl>
        <dl className="flex flex-wrap items-center mb-2">
          <dt className="w-[120px]">内容区分</dt>
          <dd className="flex-1">
            <Select
              value={cCodeCategory}
              onValueChange={(value) => setCCodeCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="内容区分を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cCodeOptions.categories.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </dd>
        </dl>
        <dl className="flex flex-wrap items-center mb-2">
          <dt className="w-[120px]">タイトル</dt>
          <dd className="flex-1">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトル"
            />
          </dd>
        </dl>
        <dl className="flex flex-wrap items-center mb-2">
          <dt className="w-[120px]">著者</dt>
          <dd className="flex-1">
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="著者"
            />
          </dd>
        </dl>
        <dl className="flex flex-wrap items-center mb-2">
          <dt className="w-[120px]">出版社</dt>
          <dd className="flex-1">
            <Input
              value={publishing}
              onChange={(e) => setPublishing(e.target.value)}
              placeholder="出版社"
            />
          </dd>
        </dl>
        <dl className="flex flex-wrap items-center mb-2">
          <dt className="w-[120px]">数量</dt>
          <dd className="flex-1">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="数量"
            />
          </dd>
        </dl>
        <div className="flex justify-end space-x-2">
          <Button onClick={handleDelete} variant="destructive">
            削除
          </Button>
          <Button onClick={handleUpdate}>修正</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BookDetailModal

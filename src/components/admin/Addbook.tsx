// components/admin/Addbook.tsx
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Book } from '@prisma/client'

interface AddbookProps {
  onBookAdded: (newBook: Book) => void
}

const Addbook: React.FC<AddbookProps> = ({ onBookAdded }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')

  const handleSubmit = async () => {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, isbn }),
    })

    if (response.ok) {
      const newBook = await response.json()
      onBookAdded(newBook) // 상태 업데이트
    }
  }

  return (
    <div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <Input
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="ISBN"
      />
      <Button onClick={handleSubmit}>Add Book</Button>
    </div>
  )
}

export default Addbook

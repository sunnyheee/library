'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Addbook from '@/components/admin/Addbook'
import Booklist from '@/components/common/Booklist'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Book, Loan } from '@prisma/client'

interface AdminTabsProps {
  books: Book[]
  loans?: Loan[]
}

const AdminTabs: React.FC<AdminTabsProps> = ({ books, loans }) => {
  const [book, setBook] = useState(books)

  const handleBookAdded = (newBook: Book) => {
    setBook((prevBooks) => [...prevBooks, newBook])
  }

  const handleBookUpdated = (updatedBook: Book) => {
    setBook((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book,
      ),
    )
  }

  const handleBookDeleted = (bookId: string) => {
    setBook((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
  }

  return (
    <Tabs defaultValue="booklist">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="booklist">本リスト</TabsTrigger>
        <TabsTrigger value="addbook">本登録</TabsTrigger>
        <TabsTrigger value="requestedbook">本申込リスト</TabsTrigger>
      </TabsList>
      <TabsContent value="booklist">
        <Booklist
          books={books}
          loans={loans}
          onUpdate={handleBookUpdated}
          onDelete={handleBookDeleted}
          isAdminPage={true}
        />
      </TabsContent>
      <TabsContent value="addbook">
        <Addbook onBookAdded={handleBookAdded} />
      </TabsContent>
      <TabsContent value="requestedbook">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default AdminTabs

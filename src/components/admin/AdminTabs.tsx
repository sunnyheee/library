'use client'
import React, { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { addBook, updateBook, deleteBook, setBooks } from '@/store/booksSlice'
import { RootState } from '@/store/store'

interface AdminTabsProps {
  books: Book[]
  loans?: Loan[]
}

const AdminTabs: React.FC<AdminTabsProps> = ({
  books: initialBooks,
  loans,
}) => {
  const dispatch = useDispatch()

  // Redux 상태에서 books 가져오기
  const reduxBooks = useSelector((state: RootState) => state.books.list)

  // 초기 로드 시 books 상태를 리덕스로 설정
  useEffect(() => {
    if (initialBooks.length > 0) {
      dispatch(setBooks(initialBooks))
    }
  }, [initialBooks, dispatch])

  // 책 추가 핸들러
  const handleBookAdded = (newBook: Book) => {
    dispatch(addBook(newBook)) // Redux 상태에 추가
  }

  // 책 업데이트 핸들러
  const handleBookUpdated = (updatedBook: Book) => {
    dispatch(updateBook(updatedBook)) // Redux 상태에 업데이트
  }

  // 책 삭제 핸들러
  const handleBookDeleted = (bookId: string) => {
    dispatch(deleteBook(bookId)) // Redux 상태에서 삭제
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
          books={reduxBooks}
          loans={loans}
          onUpdate={handleBookUpdated}
          onDelete={handleBookDeleted}
          isAdminPage={true}
        />
      </TabsContent>
      <TabsContent value="addbook">
        <Addbook />
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

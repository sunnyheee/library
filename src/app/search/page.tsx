import Booklist from '@/components/common/Booklist'
import LoginLayout from '@/components/common/LoginLayout'
import { PrismaClient } from '@prisma/client'
import React from 'react'

const prisma = new PrismaClient()

const SearchPage = async () => {
  const books = await prisma.book.findMany()
  const loans = await prisma.loan.findMany()

  console.log(books, 'books')
  return (
    <LoginLayout>
      <Booklist books={books} loans={loans} />
    </LoginLayout>
  )
}

export default SearchPage

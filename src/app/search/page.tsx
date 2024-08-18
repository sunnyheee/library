import Booklist from '@/components/common/Booklist'
import LoginLayout from '@/components/common/LoginLayout'
import prisma from '@/lib/prismaClient'
import React from 'react'

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

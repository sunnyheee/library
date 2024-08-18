import LoginLayout from '@/components/common/LoginLayout'
import React, { Suspense } from 'react'

import { PrismaClient } from '@prisma/client'

import AdminTabs from '@/components/admin/AdminTabs'
import Loading from '../loading'

const prisma = new PrismaClient()

const AdminPage = async () => {
  const books = await prisma.book.findMany()
  const loans = await prisma.loan.findMany()

  console.log(books, 'aa')

  return (
    <LoginLayout>
      <Suspense fallback={<Loading />}>
        <AdminTabs books={books} loans={loans} />
      </Suspense>
    </LoginLayout>
  )
}

export default AdminPage

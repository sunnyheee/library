import LoginLayout from '@/components/common/LoginLayout'
import React, { Suspense } from 'react'
import AdminTabs from '@/components/admin/AdminTabs'
import Loading from '../loading'

import prisma from '@/lib/prismaClient'

const AdminPage = async () => {
  const books = await prisma.book.findMany()
  const loans = await prisma.loan.findMany()

  return (
    <LoginLayout>
      <Suspense fallback={<Loading />}>
        <AdminTabs books={books} loans={loans} />
      </Suspense>
    </LoginLayout>
  )
}

export default AdminPage

import LoginLayout from '@/components/common/LoginLayout'
import React, { Suspense } from 'react'

import { fetchBooks } from '@/lib/api'
import AdminTabs from '@/components/admin/AdminTabs'
import Loading from '../loading'

const AdminPage = async () => {
  const books = await fetchBooks()

  return (
    <LoginLayout>
      <Suspense fallback={<Loading />}>
        <AdminTabs initialBooks={books} />
      </Suspense>
    </LoginLayout>
  )
}

export default AdminPage

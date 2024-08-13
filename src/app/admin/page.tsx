import LoginLayout from '@/components/common/LoginLayout'
import React from 'react'

import { fetchBooks } from '@/lib/api'
import AdminTabs from '@/components/admin/AdminTabs'

const AdminPage = async () => {
  const books = await fetchBooks()

  return (
    <LoginLayout>
      <AdminTabs initialBooks={books} />
    </LoginLayout>
  )
}

export default AdminPage

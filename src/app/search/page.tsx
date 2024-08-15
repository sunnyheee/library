import Booklist from '@/components/common/Booklist'
import LoginLayout from '@/components/common/LoginLayout'
import { fetchBooks } from '@/lib/api'
import React from 'react'

const SearchPage = async () => {
  const books = await fetchBooks()

  return (
    <LoginLayout>
      <Booklist books={books} />
    </LoginLayout>
  )
}

export default SearchPage

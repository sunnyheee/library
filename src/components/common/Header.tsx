import React from 'react'
import LoginButton from '../login/LoginButton'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
      <Link href="/" className="text-lg">
        LIBRARY
      </Link>
      <div>
        <LoginButton />
      </div>
    </header>
  )
}

export default Header

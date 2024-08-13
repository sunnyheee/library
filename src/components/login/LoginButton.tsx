'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const LoginButton = () => {
  const { data } = useSession()

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (data) {
      await signOut({ callbackUrl: '/login' })
    } else {
      await signIn()
    }
  }
  return (
    <div className="flex items-center gap-3">
      {data?.user && (
        <Avatar>
          <AvatarImage src={data.user.image ?? ''} alt="user image" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      )}
      <Button
        className="block w-full max-w-[120px] text-white bg-blue-500"
        onClick={onClick}
      >
        {data ? 'ログアウト' : 'ログイン'}
      </Button>
    </div>
  )
}

export default LoginButton

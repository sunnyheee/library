import * as React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import LoginButton from './LoginButton'

const LoginCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ログインしてください</CardTitle>
        <CardDescription>Welcome to BizlinkLibrary</CardDescription>
      </CardHeader>
      <CardFooter>
        <LoginButton />
      </CardFooter>
    </Card>
  )
}

export default LoginCard

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import React from 'react'
import Header from '@/components/common/Header'
import DashCard from '@/components/common/DashCard'
import { Card } from '@/components/ui/card'
import { cookies } from 'next/headers'

type LayoutProps = {
  children: React.ReactNode
}

const LoginLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const layout = cookies().get('react-resizable-panels:layout:mail')
  const collapsed = cookies().get('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <>
      <Header />
      <div className="flex">
        <DashCard
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        >
          <Card className="p-4 ml-4">{children}</Card>
        </DashCard>
      </div>
    </>
  )
}

export default LoginLayout

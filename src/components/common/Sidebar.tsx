import React from 'react'
import { Nav } from './Nav'
import {
  CircleUserRound,
  PanelsTopLeft,
  BookDown,
  UserCheck,
} from 'lucide-react'
import { useSession } from 'next-auth/react'

type Props = {
  isCollapsed: boolean
}

const Sidebar = ({ isCollapsed }: Props) => {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  return (
    <Nav
      isCollapsed={isCollapsed}
      links={[
        {
          title: 'TOP',
          icon: PanelsTopLeft,
          href: '/',
        },
        {
          title: 'My page',
          icon: CircleUserRound,
          href: '/mypage',
        },
        {
          title: '本を検索する',
          icon: BookDown,
          href: '/search',
        },
        ...(isAdmin
          ? [
              {
                title: '管理者ページ',
                icon: UserCheck,
                href: '/admin',
              },
            ]
          : []),
      ]}
    />
  )
}

export default Sidebar

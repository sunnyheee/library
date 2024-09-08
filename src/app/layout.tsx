import type { Metadata } from 'next'

import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import AuthSession from '@/components/providers/session-provider'
import { Providers } from './providers'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '図書館',
  description: '図書館',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={notoSansJP.className}>
        <Providers>
          <AuthSession>
            <main>{children}</main>
          </AuthSession>
        </Providers>
      </body>
    </html>
  )
}

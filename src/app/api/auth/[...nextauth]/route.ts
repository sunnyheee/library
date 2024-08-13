import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/lib/prismaClient'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session?.user?.email) {
        return session
      }

      const email = session.user.email
      if (email) {
        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (user) {
          session.user.id = user.id
          session.user.role = user.role || 'user'
        } else {
          session.user.role = 'user'
        }
      } else {
        session.user.role = 'user'
      }

      return session
    },

    async signIn({ user }) {
      const email = user.email

      if (email) {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        })

        if (existingUser) {
          await prisma.user.update({
            where: { email },
            data: { role: email === 'sunnyheee0@gmail.com' ? 'admin' : 'user' },
          })
        } else {
          await prisma.user.create({
            data: {
              email,
              name: user.name || '管理者',
              role: email === 'sunnyheee0@gmail.com' ? 'admin' : 'user',
            },
          })
        }
      }

      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

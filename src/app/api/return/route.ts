import prisma from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { bookId, userId } = await request.json()

  try {
    const book = await prisma.book.update({
      where: { id: bookId },
      data: {
        amount: {
          increment: 1,
        },
      },
    })

    const loan = await prisma.loan.updateMany({
      where: { bookId, userId, returned: false },
      data: {
        returned: true,
      },
    })

    return NextResponse.json({ book, loan }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 },
    )
  }
}

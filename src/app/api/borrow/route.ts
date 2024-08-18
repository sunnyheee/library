import prisma from '@/lib/prismaClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { bookId, userId, returnDue } = await req.json()

    // 책 정보를 가져옵니다.
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    })

    // 수량이 0이거나 책이 존재하지 않을 경우 에러 처리
    if (!book || book.amount <= 0) {
      return NextResponse.json(
        { message: '해당 도서를 빌릴 수 없습니다.' },
        { status: 400 },
      )
    }

    // 대출을 기록하고, 책 수량을 감소시킵니다.
    const loan = await prisma.loan.create({
      data: {
        bookId,
        userId,
        returnDue: new Date(returnDue),
        returned: false,
      },
    })

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: { amount: book.amount - 1 },
    })

    return NextResponse.json({ loan, book: updatedBook }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: '대여 처리 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}

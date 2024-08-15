import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

export async function GET(req: NextRequest) {
  try {
    const books = await prisma.book.findMany()
    return NextResponse.json(books, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching books:', error.message)
      console.error('Error stack trace:', error.stack)
      return NextResponse.json(
        { message: 'Failed to fetch books', error: error.message },
        { status: 500 },
      )
    } else {
      console.error('Unknown error fetching books:', error)
      return NextResponse.json(
        { message: 'Failed to fetch books', error: 'Unknown error' },
        { status: 500 },
      )
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log(data, 'api data')
    const book = await prisma.book.create({ data })

    return NextResponse.json(book, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error registering book:', error.message)
      return NextResponse.json(
        { message: '책 등록 중 오류가 발생했습니다.', error: error.message },
        { status: 500 },
      )
    } else {
      console.error('Unknown error registering book:', error)
      return NextResponse.json(
        { message: '책 등록 중 오류가 발생했습니다.', error: 'Unknown error' },
        { status: 500 },
      )
    }
  }
}

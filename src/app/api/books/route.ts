import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

export async function GET(req: NextRequest) {
  try {
    const books = await prisma.book.findMany()
    return NextResponse.json(books, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching books:', error.message)
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
    // POST 메서드 처리 로직 (책 등록 등)
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

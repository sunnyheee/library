import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id
  try {
    const data = await req.json()
    const { id: _, ...updatedData } = data

    const updatedBook = await prisma.book.update({
      where: { id },
      data: updatedData,
    })
    return NextResponse.json(updatedBook, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating book with ID ${id}:`, error.message)
      return NextResponse.json(
        { message: 'Failed to update book', error: error.message },
        { status: 500 },
      )
    } else {
      console.error(`Unknown error updating book with ID ${id}:`, error)
      return NextResponse.json(
        { message: 'Failed to update book', error: 'Unknown error' },
        { status: 500 },
      )
    }
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id
  try {
    await prisma.book.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Book deleted' }, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting book with ID ${id}:`, error.message)
      return NextResponse.json(
        { message: 'Failed to delete book', error: error.message },
        { status: 500 },
      )
    } else {
      console.error(`Unknown error deleting book with ID ${id}:`, error)
      return NextResponse.json(
        { message: 'Failed to delete book', error: 'Unknown error' },
        { status: 500 },
      )
    }
  }
}

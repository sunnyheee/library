import { Book } from '@prisma/client'

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      console.error('Response Status:', response.status, response.statusText)
      throw new Error(
        `Failed to fetch books: ${response.status} ${response.statusText}`,
      )
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Expected JSON response, got:', contentType)
      throw new Error('Failed to fetch books: Response is not JSON')
    }

    const books = await response.json()
    return books
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching books:', error.message)
    } else {
      console.error('Unknown error fetching books:', error)
    }
    throw error
  }
}

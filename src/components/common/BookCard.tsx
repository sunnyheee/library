'use client'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { Book } from '@prisma/client'
import SearchBar from './SearchBar'
import {
  FaUserAlt,
  FaBook,
  FaBuilding,
  FaCommentDots,
  FaHeart,
} from 'react-icons/fa'

interface BookCardProps {
  reduxBooks: Book[]
}

const BookCard: React.FC<BookCardProps> = ({ reduxBooks }) => {
  return (
    <>
      <SearchBar
        searchIsbn={''}
        onSearchIsbnChange={() => {}}
        searchCCode={''}
        onSearchCCodeChange={() => {}}
        searchTitle={''}
        onSearchTitleChange={() => {}}
        searchAuthor={''}
        onSearchAuthorChange={() => {}}
        searchPublishing={''}
        onSearchPublishingChange={() => {}}
        searchAmount={''}
        onSearchAmountChange={() => {}}
        searchCategory={''}
        onSearchCategoryChange={() => {}}
        isAdmin={false}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reduxBooks.map((book) => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="transform hover:scale-[1.02] transition-transform duration-300"
          >
            <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl h-full overflow-hidden">
              <CardHeader className="bg-blue-500 text-white p-4 flex justify-between items-center">
                <h3 className="font-semibold text-base break-words whitespace-normal">
                  {book.title}
                </h3>
              </CardHeader>
              <CardContent className="p-4 bg-gray-50 text-sm">
                <div className="flex items-center mb-4">
                  <FaUserAlt className="mr-2 text-blue-900" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Author:</span> {book.author}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaBuilding className="mr-2 text-blue-900" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Publisher:</span>{' '}
                    {book.publishing}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="text-sm p-4 bg-white border-t border-gray-200 flex justify-between">
                <div className="flex items-center space-x-2">
                  <FaCommentDots className="text-blue-900" />
                  <span className="text-sm text-gray-600">5 comments</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}

export default BookCard

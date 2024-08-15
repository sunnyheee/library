'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '../ui/card'

interface SearchBarProps {
  searchIsbn: string
  onSearchIsbnChange: (value: string) => void
  searchCCode: string
  onSearchCCodeChange: (value: string) => void
  searchTitle: string
  onSearchTitleChange: (value: string) => void
  searchAuthor: string
  onSearchAuthorChange: (value: string) => void
  searchPublishing: string
  onSearchPublishingChange: (value: string) => void
  searchAmount: string
  onSearchAmountChange: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchIsbn,
  onSearchIsbnChange,
  searchCCode,
  onSearchCCodeChange,
  searchTitle,
  onSearchTitleChange,
  searchAuthor,
  onSearchAuthorChange,
  searchPublishing,
  onSearchPublishingChange,
  searchAmount,
  onSearchAmountChange,
}) => {
  return (
    <Card className="p-4 mb-10 bg-blue-100">
      <div className="grid grid-cols-3 gap-4 mb-4 px-1 flex-wrap">
        <div>
          <span className="text-sm mb-2 block">タイトル</span>
          <Input
            value={searchTitle}
            onChange={(e) => onSearchTitleChange(e.target.value)}
            placeholder="タイトル"
            className="w-full"
          />
        </div>
        <div>
          <span className="text-sm mb-2 block">著者</span>
          <Input
            value={searchAuthor}
            onChange={(e) => onSearchAuthorChange(e.target.value)}
            placeholder="著者"
            className="w-full"
          />
        </div>
        <div>
          <span className="text-sm mb-2 block">出版社</span>
          <Input
            value={searchPublishing}
            onChange={(e) => onSearchPublishingChange(e.target.value)}
            placeholder="出版社"
            className="w-full"
          />
        </div>
        <div>
          <span className="text-sm mb-2 block">ISBN</span>
          <Input
            value={searchIsbn}
            onChange={(e) => onSearchIsbnChange(e.target.value)}
            placeholder="ISBN"
            className="w-full"
          />
        </div>
        <div>
          <span className="text-sm mb-2 block">Cコード</span>
          <Input
            value={searchCCode}
            onChange={(e) => onSearchCCodeChange(e.target.value)}
            placeholder="Cコード"
            className="w-full"
          />
        </div>
        <div>
          <span className="text-sm mb-2 block">数量</span>
          <Input
            value={searchAmount}
            onChange={(e) => onSearchAmountChange(e.target.value)}
            placeholder="Search 数量"
            type="number"
            className="w-full"
          />
        </div>
      </div>
    </Card>
  )
}

export default SearchBar

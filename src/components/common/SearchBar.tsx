'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '../ui/card'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { cCodeOptions } from '@/config/cCodeOptions'

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
  searchCategory: string
  onSearchCategoryChange: (value: string) => void
  isAdmin: boolean
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
  searchCategory,
  onSearchCategoryChange,
  isAdmin,
}) => {
  return (
    <Card className="p-4 mb-10 bg-blue-100">
      <div className="grid grid-cols-2 gap-4 mb-4 px-1">
        {/* 타이틀 - 전체 너비의 절반을 차지 */}
        <div className="col-span-1">
          <span className="text-sm mb-2 block">タイトル</span>
          <Input
            value={searchTitle}
            onChange={(e) => onSearchTitleChange(e.target.value)}
            placeholder="タイトル"
            className="w-full"
          />
        </div>
        {/* 나머지 필드들은 전체 너비의 나머지 절반을 1/3씩 차지 */}
        <div className="grid grid-cols-3 gap-4 col-span-1">
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
            <span className="text-sm mb-2 block">区分</span>
            <Select onValueChange={(value) => onSearchCategoryChange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="区分" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cCodeOptions.categories.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 관리자만 볼 수 있는 필드 */}
      {isAdmin && (
        <div className="grid grid-cols-3 gap-4 px-1">
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
      )}
    </Card>
  )
}

export default SearchBar

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select'
import { Book } from '@/types/book'
import DialogModal from '../common/DialogModal'
import { useSession } from 'next-auth/react'
import { fetchBookDataFromOpenBD } from '@/utils/fetchBookData'
import { cCodeOptions } from '@/config/cCodeOptions'

interface AddbookProps {
  onBookAdded: (newBook: Book) => void
}

const Addbook: React.FC<AddbookProps> = ({ onBookAdded }) => {
  const [isbn, setIsbn] = useState('')
  const [cCodeCategory, setCCodeCategory] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishing, setPublishing] = useState('')
  const [amount, setAmount] = useState(0)
  const [audience, setAudience] = useState('')
  const [form, setForm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { data: session } = useSession()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }

  const handleIsbnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIsbn = e.target.value
    setIsbn(newIsbn)

    if (newIsbn.length === 13) {
      try {
        const bookData = await fetchBookDataFromOpenBD(newIsbn)
        if (bookData) {
          setTitle(bookData.title || '')
          setAuthor(bookData.author || '')
          setPublishing(bookData.publishing || '')
        } else {
          setErrorMessage('책 정보를 불러오는 중 오류가 발생했습니다.')
        }
      } catch (error) {
        setErrorMessage('책 정보를 불러오는 중 오류가 발생했습니다.')
      }
    }
  }

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      console.error('User ID is not available in the session')
      return
    }

    const cCode = `${audience}${form}${cCodeCategory}`

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isbn,
          cCode,
          title,
          author,
          publishing,
          amount,
          userId: session.user.id,
        }),
      })

      if (response.ok) {
        const newBook = await response.json()
        onBookAdded(newBook)
        setIsbn('')
        setCCodeCategory('')
        setTitle('')
        setAuthor('')
        setPublishing('')
        setAmount(0)
        setAudience('')
        setForm('')
        setIsModalOpen(true)
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || '책 등록 중 오류가 발생했습니다.')
      }
    } catch (error) {
      setErrorMessage('책 등록 중 오류가 발생했습니다.')
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-[720px] w-full mx-auto my-4">
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">ISBN</dt>
        <dd className="flex-1">
          <Input value={isbn} onChange={handleIsbnChange} placeholder="ISBN" />
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">販売対象</dt>
        <dd className="flex-1">
          <Select onValueChange={(value) => setAudience(value)}>
            <SelectTrigger>
              <SelectValue placeholder="販売対象を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cCodeOptions.audiences.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">発行形態</dt>
        <dd className="flex-1">
          <Select onValueChange={(value) => setForm(value)}>
            <SelectTrigger>
              <SelectValue placeholder="発行形態を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cCodeOptions.forms.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">内容区分</dt>
        <dd className="flex-1">
          <Select onValueChange={(value) => setCCodeCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="内容区分を選択" />
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
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">タイトル</dt>
        <dd className="flex-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
          />
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">著者</dt>
        <dd className="flex-1">
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="著者"
          />
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">出版社</dt>
        <dd className="flex-1">
          <Input
            value={publishing}
            onChange={(e) => setPublishing(e.target.value)}
            placeholder="出版社"
          />
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">数量</dt>
        <dd className="flex-1">
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="数量"
          />
        </dd>
      </dl>
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>本を追加する</Button>
      </div>
      <DialogModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        text={'登録完了'}
      />
      {errorMessage && (
        <DialogModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          text={errorMessage}
        />
      )}
    </div>
  )
}

export default Addbook

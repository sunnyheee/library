'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Book } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { fetchBookDataFromOpenBD } from '@/utils/fetchBookData'
import { cCodeOptions } from '@/config/cCodeOptions'
import DialogConfirmModal from '../common/DialogConfirmModal'

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
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [existingBook, setExistingBook] = useState<Book | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { data: session } = useSession()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setAmount(value)
    setErrors((prevErrors) => ({
      ...prevErrors,
      amount: value > 0 ? null : '数量は1以上でなければなりません。',
    }))
  }

  const handleIsbnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIsbn = e.target.value
    setIsbn(newIsbn)

    if (newIsbn.includes('-')) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isbn: 'ISBNはハイフンを除いて入力してください。',
      }))
      return
    }

    if (newIsbn.length !== 13) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isbn: 'ISBNは13桁である必要があります。',
      }))
      return
    }

    try {
      const bookData = await fetchBookDataFromOpenBD(newIsbn)
      if (bookData) {
        setTitle(bookData.title || '')
        setAuthor(bookData.author || '')
        setPublishing(bookData.publishing || '')
        setErrors((prevErrors) => ({
          ...prevErrors,
          isbn: null,
        }))

        setErrors((prevErrors) => ({
          ...prevErrors,
          title: bookData.title ? null : prevErrors.title,
          author: bookData.author ? null : prevErrors.author,
          publishing: bookData.publishing ? null : prevErrors.publishing,
        }))
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          isbn: '書籍情報の取得中にエラーが発生しました。',
        }))
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        isbn: '書籍情報の取得中にエラーが発生しました。',
      }))
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: e.target.value ? null : 'タイトルは必須項目です。',
    }))
  }

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value)
    setErrors((prevErrors) => ({
      ...prevErrors,
      author: e.target.value ? null : '著者は必須項目です。',
    }))
  }

  const handlePublishingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublishing(e.target.value)
    setErrors((prevErrors) => ({
      ...prevErrors,
      publishing: e.target.value ? null : '出版社は必須項目です。',
    }))
  }

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string | null } = {}
    if (!isbn) newErrors.isbn = 'ISBNは必須項目です。'
    if (!audience) newErrors.audience = '販売対象を選択してください。'
    if (!form) newErrors.form = '発行形態を選択してください。'
    if (!cCodeCategory) newErrors.cCodeCategory = '内容区分を選択してください。'
    if (!title) newErrors.title = 'タイトルは必須項目です。'
    if (!author) newErrors.author = '著者は必須項目です。'
    if (!publishing) newErrors.publishing = '出版社は必須項目です。'
    if (amount <= 0) newErrors.amount = '数量は1以上でなければなりません。'

    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error !== null)) {
      return
    }

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
        setErrors({})
        setErrorMessage('登録完了しました')
        setIsModalOpen(true)
      } else if (response.status === 409) {
        const errorData = await response.json()
        setErrorMessage(errorData.message)
        setExistingBook(errorData.book)
        setIsModalOpen(true)
      } else {
        const errorData = await response.json()
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: errorData.message || '登録中エラーが発生しました',
        }))
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        submit: '登録中エラーが発生しました',
      }))
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setExistingBook(null)
  }

  return (
    <div className="max-w-[720px] w-full mx-auto my-4">
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">ISBN</dt>
        <dd className="flex-1">
          <Input value={isbn} onChange={handleIsbnChange} placeholder="ISBN" />
          {errors.isbn && (
            <p className="text-red-500 text-sm mt-2">{errors.isbn}</p>
          )}
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
          {errors.audience && (
            <p className="text-red-500 text-sm mt-2">{errors.audience}</p>
          )}
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
          {errors.form && (
            <p className="text-red-500 text-sm mt-2">{errors.form}</p>
          )}
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
          {errors.cCodeCategory && (
            <p className="text-red-500 text-sm mt-2">{errors.cCodeCategory}</p>
          )}
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">タイトル</dt>
        <dd className="flex-1">
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="タイトル"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title}</p>
          )}
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">著者</dt>
        <dd className="flex-1">
          <Input
            value={author}
            onChange={handleAuthorChange}
            placeholder="著者"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-2">{errors.author}</p>
          )}
        </dd>
      </dl>
      <dl className="flex flex-wrap items-center mb-4">
        <dt className="w-[120px]">出版社</dt>
        <dd className="flex-1">
          <Input
            value={publishing}
            onChange={handlePublishingChange}
            placeholder="出版社"
          />
          {errors.publishing && (
            <p className="text-red-500 text-sm mt-2">{errors.publishing}</p>
          )}
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
          {errors.amount && (
            <p className="text-red-500 text-sm mt-2">{errors.amount}</p>
          )}
        </dd>
      </dl>
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>本を追加する</Button>
      </div>
      {errors.submit && <p className="text-red-500 mt-4">{errors.submit}</p>}
      {errorMessage && (
        <DialogConfirmModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          text={
            existingBook
              ? `【${existingBook.title}】は既に登録されています`
              : errorMessage
          }
        />
      )}
    </div>
  )
}

export default Addbook

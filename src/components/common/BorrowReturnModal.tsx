import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Book } from '@prisma/client'
import DialogModal from './DialogModal'
import { DatePicker } from './DatePicker'

interface BorrowReturnModalProps {
  isOpen: boolean
  action: 'borrow' | 'return' | null
  book: Book | null
  onClose: () => void
  onUpdate?: (updatedBook: Book) => void
}

const BorrowReturnModal: React.FC<BorrowReturnModalProps> = ({
  isOpen,
  action,
  book,
  onClose,
  onUpdate,
}) => {
  const [returnDue, setReturnDue] = useState<Date | undefined>(undefined)
  const { data: session } = useSession()

  useEffect(() => {
    if (action === 'borrow' && !returnDue) {
      setReturnDue(new Date()) // 기본값을 오늘로 설정
    }
  }, [action, returnDue])

  const handleConfirm = async () => {
    if (action && book && session?.user) {
      const userId = session.user.id
      const endpoint = action === 'borrow' ? '/api/borrow' : '/api/return'

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookId: book.id,
            userId,
            returnDue: returnDue?.toISOString(),
          }),
        })

        if (res.ok) {
          const updatedBook = await res.json()
          onUpdate?.(updatedBook.book)
          onClose()
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      console.error('Invalid action or book, or user not logged in.')
    }
  }

  return (
    <DialogModal
      isModalOpen={isOpen}
      closeModal={onClose}
      text={action === 'borrow' ? '정말 빌리겠습니까?' : '정말 반납하겠습니까?'}
      onConfirm={handleConfirm} // 확인 버튼 클릭 시 실행되는 함수
    >
      {action === 'borrow' && (
        <div>
          <label>返却日を選択してください:</label>
          <DatePicker date={returnDue} setDate={setReturnDue} />{' '}
          {/* 반납 날짜 선택 */}
        </div>
      )}
    </DialogModal>
  )
}

export default BorrowReturnModal

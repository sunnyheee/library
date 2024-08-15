import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Props {
  onConfirm?: () => void
  isModalOpen: boolean
  closeModal: () => void
  text: string
  children?: ReactNode // 추가: 모달 내에 추가적인 콘텐츠를 삽입할 수 있도록 children props를 받음
}

const DialogModal = ({
  onConfirm,
  isModalOpen,
  closeModal,
  text,
  children,
}: Props) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="pt-12">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{children}</div>
        <DialogFooter>
          <Button onClick={onConfirm} className="ml-2">
            확인
          </Button>
          <Button onClick={closeModal}>닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogModal

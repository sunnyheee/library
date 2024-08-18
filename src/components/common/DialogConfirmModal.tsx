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
  isModalOpen: boolean
  closeModal: () => void
  text: string
  children?: ReactNode
}

const DialogConfirmModal = ({
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
          <Button onClick={closeModal}>닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConfirmModal

import React from 'react'
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
}

const DialogModal = ({ isModalOpen, closeModal, text }: Props) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="pt-12">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={closeModal}>close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogModal

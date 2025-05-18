'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@src/components/ui/dialog';
import { Button } from '@src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { useState } from 'react';
import { updateOrderStatus } from '@src/actions/orders';
import { useRouter } from 'next/navigation';

type Status = {
  id: string;
  title: string;
};

type UpdateStatusModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  currentStatus: string;
  statuses: Status[];
};

export function UpdateStatusModal({ isOpen, onClose, orderId, currentStatus, statuses }: UpdateStatusModalProps) {
  const [status, setStatus] = useState(currentStatus);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateOrderStatus(orderId, status);
    router.refresh();
    onClose();
  };
  console.log(statuses);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Change the status of order #{orderId}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='status' className='text-sm font-medium'>
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a status' />
              </SelectTrigger>
              <SelectContent position='popper' className='w-full'>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.title}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type='submit' className='w-full'>
            Update Status
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
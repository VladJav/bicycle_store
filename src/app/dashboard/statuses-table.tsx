'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell
} from '@src/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@src/components/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@src/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@src/components/ui/dialog';
import { Input } from '@src/components/ui/input';
import { useState } from 'react';
import { createStatus, updateStatus, deleteStatus } from '@src/actions/statuses';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

type Status = {
  id: string;
  title: string;
};

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'Processing...' : text}
    </Button>
  );
}

export function StatusesTable({
  statuses,
  offset,
  totalStatuses
}: {
  statuses: Status[];
  offset: number;
  totalStatuses: number;
}) {
  const router = useRouter();
  const statusesPerPage = 5;
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/dashboard/statuses?offset=${offset + statusesPerPage}`, {
      scroll: false,
    });
  }

  async function handleCreate(formData: FormData) {
    const title = formData.get('title') as string;
    await createStatus(title);
    setCreateOpen(false);
  }

  async function handleEdit(formData: FormData) {
    if (!selectedStatus) return;
    const title = formData.get('title') as string;
    await updateStatus(selectedStatus.id, title);
    setEditOpen(false);
    setSelectedStatus(null);
  }

  async function handleDelete(id: string) {
    try {
      await deleteStatus(id);
      router.refresh();
    } catch (error) {
      toast('Status not deleted', {
        description:
          error instanceof Error ? error.message : 'Unable to delete status',
      });
    }
  }

  function handleEditClick(status: Status) {
    window.setTimeout(() => {
      setSelectedStatus(status);
      setEditOpen(true);
    }, 0);
  }

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div>
            <CardTitle>Statuses</CardTitle>
            <CardDescription>
              View and manage order statuses.
            </CardDescription>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className='mr-2 h-4 w-4' />
                Create Status
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Status</DialogTitle>
              </DialogHeader>
              <form action={handleCreate} className='space-y-4'>
                <div className='space-y-2'>
                  <label htmlFor='title' className='text-sm font-medium'>
                    Title
                  </label>
                  <Input
                    id='title'
                    name='title'
                    placeholder='Enter status title'
                    required
                  />
                </div>
                <SubmitButton text='Create Status' />
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statuses.map((status) => (
                <TableRow key={status.id}>
                  <TableCell className='font-medium'>{status.title}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup='true' size='icon' variant='ghost'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={() => handleEditClick(status)}
                        >
                          Edit Status
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='text-destructive'
                          onSelect={() => {
                            void handleDelete(status.id);
                          }}
                        >
                          Delete Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <form className='flex items-center w-full justify-between'>
            <div className='text-xs text-muted-foreground'>
              Showing{' '}
              <strong>
                {Math.max(0, Math.min(offset - statusesPerPage, totalStatuses) + 1)}-{offset}
              </strong>{' '}
              of <strong>{totalStatuses}</strong> statuses
            </div>
            <div className='flex'>
              <Button
                formAction={prevPage}
                variant='ghost'
                size='sm'
                type='submit'
                disabled={offset === statusesPerPage}
              >
                <ChevronLeft className='mr-2 h-4 w-4' />
                Prev
              </Button>
              <Button
                formAction={nextPage}
                variant='ghost'
                size='sm'
                type='submit'
                disabled={offset + statusesPerPage > totalStatuses}
              >
                Next
                <ChevronRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Status</DialogTitle>
          </DialogHeader>
          <form action={handleEdit} className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='edit-title' className='text-sm font-medium'>
                Title
              </label>
              <Input
                id='edit-title'
                name='title'
                placeholder='Enter status title'
                defaultValue={selectedStatus?.title}
                required
              />
            </div>
            <SubmitButton text='Save Changes' />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

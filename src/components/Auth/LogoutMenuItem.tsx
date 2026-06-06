'use client';

import { signOut } from 'next-auth/react';
import { DropdownMenuItem } from '@src/components/ui/dropdown-menu';

export default function LogoutMenuItem() {
  return (
    <DropdownMenuItem
      className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Log out
    </DropdownMenuItem>
  );
}

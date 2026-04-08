import { AvatarFallback } from '@src/components/ui/avatar';
import { Avatar } from '@src/components/ui/avatar';
import { AvatarImage } from '@src/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import CartButton from '@src/components/CartButton/CartButton';
import { Input } from '@src/components/ui/input';
import { Button } from '@src/components/ui/button';
import { auth } from '@src/lib/auth';
import { Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@src/components/ui/dropdown-menu';

export default async function Header() {
  const session = await auth();
  
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="mr-8">
            <Image
              src="/images/generated-image (1).png"
              alt="Fashion Store"
              width={150}
              height={40}
              className="h-12 w-auto dark:invert"
            />
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/product" className="text-muted-foreground hover:text-foreground">
              Shop
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="w-64 pl-10 bg-background text-foreground" placeholder="Search products" />
          </div>
          <CartButton />
          {session && session.user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.image || ''}
                      alt={session.user.name || ''}
                    />
                    <AvatarFallback>
                      {session.user.name?.charAt(0) || ''}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{session.user.name}</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile" className="w-full">
                    <DropdownMenuItem className="cursor-pointer">Profile & Orders</DropdownMenuItem>
                  </Link>
                  <Link href="/settings" className="w-full">
                    <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/auth/sign-in" className="w-full">
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">Log out</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/auth/sign-in">
              <Button variant="outline">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

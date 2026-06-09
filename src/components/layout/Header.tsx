import { AvatarFallback } from '@src/components/ui/avatar';
import { Avatar } from '@src/components/ui/avatar';
import { AvatarImage } from '@src/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import CartButton from '@src/components/CartButton/CartButton';
import { Button } from '@src/components/ui/button';
import { auth } from '@src/lib/auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@src/components/ui/dropdown-menu';
import ProductSearchInput from '@src/components/ProductSearchInput/ProductSearchInput';
import LogoutMenuItem from '@src/components/Auth/LogoutMenuItem';
import ShopCategoryMenu from '@src/components/layout/ShopCategoryMenu';

export default async function Header() {
  const session = await auth();
  
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="mr-8">
            <Image
              src="/images/bicycle-logo.png"
              alt="BIker"
              width={150}
              height={40}
              className="h-12 w-auto dark:invert"
            />
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ShopCategoryMenu />
          </nav>
        </div>
        <div className="flex items-center gap-6">
	          <ProductSearchInput className="hidden w-64 md:block" />
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
	                  <LogoutMenuItem />
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

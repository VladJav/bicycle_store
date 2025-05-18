import { AvatarFallback } from '@src/components/ui/avatar';

import { Avatar } from '@src/components/ui/avatar';

import { AvatarImage } from '@src/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import CartButton from '@src/components/CartButton/CartButton';
import { Input } from '@src/components/ui/input';
import { Button } from '@src/components/ui/button';
import { Bell } from 'lucide-react';
import { auth } from '@src/lib/auth';
import { Search } from 'lucide-react';

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="min-h-screen bg-[#fcfdfd] pb-16">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="mr-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fs-OQzXWiKsdo0mSCzNZyZmZHXxrCi0Bp.png"
                alt="Fashion Store"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden space-x-6 md:flex">
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Shop
              </Link>
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Collections
              </Link>
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search products" />
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
            <CartButton />
            {session && session.user ? (
              <div className="flex items-center gap-2">
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
              </div>
            ) : (
              <Button variant="outline">
                <Link href="/auth/sign-in">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

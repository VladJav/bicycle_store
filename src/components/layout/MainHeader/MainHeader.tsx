'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@src/components/ui/avatar';
import CartButton from '@src/components/CartButton/CartButton';
import { Button } from '@src/components/ui/button';
import Link from 'next/link';

interface MainHeaderProps {
  user?: {
    name: string;
    email: string;
    image: string;
  };
}

const MainHeader = ({ user }: MainHeaderProps) => {
  if (user) {
    return (
      <header className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">
            Hi, {user.name}! <span className="ml-1">👋</span>
          </h2>
          <p className="text-muted-foreground">Welcome Back</p>
        </div>
        <div className="flex items-center gap-6">
          <CartButton />
          <Link href="/profile" className="hover:opacity-80 transition-opacity" aria-label="Go to Profile">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>
    );
  }
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Welcome to Bicycle Store</h2>
        <p className="text-muted-foreground">Discover our exclusive collection</p>
      </div>
      <div className="flex items-center gap-6">
        <CartButton />
        <Button variant="outline">
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
      </div>
    </header>
  );
};

export default MainHeader;

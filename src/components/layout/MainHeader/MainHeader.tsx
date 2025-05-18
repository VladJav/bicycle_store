'use client';
import { Search, Bell } from 'lucide-react';
import { Button } from '@src/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@src/components/ui/avatar';
import { Input } from '@src/components/ui/input';
import CartButton from '@src/components/CartButton/CartButton';

const MainHeader = () => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">
          Hi, Dollar! <span className="ml-1">👋</span>
        </h2>
        <p className="text-gray-500">Welcome Back</p>
      </div>
      <div className="flex items-center gap-6">
        <CartButton />
        <Avatar className="w-10 h-10">
          <AvatarImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-482Kz4Ro7YXPgsZnttDFsQEmrWQnhG.jpeg"
            alt="User avatar"
          />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default MainHeader;

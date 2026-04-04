'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  User2,
  Settings,
  LogOut,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? 'flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-colors'
      : 'flex items-center gap-3 px-3 py-2 text-muted-foreground transition-colors hover:text-foreground';
  };

  return (
    <aside className="w-64 border-r px-6 py-8">
      <div>
        <Image
          src="/images/generated-image (1).png"
          alt="Fashion Store"
          width={100}
          height={100}
          className="h-32 w-auto"
        />
      </div>
      <nav className="space-y-6">
        <Link
          href="/"
          className={getLinkClasses('/')}
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/profile"
          className={getLinkClasses('/profile')}
        >
          <User2 className="h-5 w-5" />
          Profile
        </Link>
        <Link
          href="/settings"
          className={getLinkClasses('/settings')}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/sign-in' })}
          className="flex w-full items-center gap-3 px-3 py-2 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive rounded-md"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

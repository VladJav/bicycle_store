import Image from 'next/image';
import Link from 'next/link';
import {
  HomeIcon,
  User2,
  Settings,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
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
          href="#"
          className="flex items-center gap-3 rounded-lg bg-[#e0e5ce] px-3 py-2 text-[#415444] transition-colors"
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
        >
          <User2 className="h-5 w-5" />
          Profile
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-red-500 transition-colors hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

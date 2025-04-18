import { Search, Bell, ShoppingCart } from 'lucide-react';
import { Button } from '@src/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@src/components/ui/avatar';
import { Input } from '@src/components/ui/input';
import Sidebar from '@src/components/layout/Sidebar/Sidebar';
import CartSidebar from '@src/components/layout/CartSidebar';
import CollectionCard from '@src/components/CollectionCard';
interface PopularItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

// Define popularItems with proper structure to avoid circular references
const popularItems: PopularItem[] = [
  {
    id: 1,
    name: 'Elegant Tote Bag',
    price: 89.99,
    rating: 4.5,
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Index,%20Vanderbrand.jpg-Fv7HHkBaQgZe7HG3hbz5aojPoFRIuo.jpeg',
  },
  {
    id: 2,
    name: 'Canvas Shoulder Bag',
    price: 69.99,
    rating: 4.2,
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-482Kz4Ro7YXPgsZnttDFsQEmrWQnhG.jpeg',
  },
  {
    id: 3,
    name: 'Premium Messenger Bag',
    price: 119.99,
    rating: 4.8,
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Index,%20Vanderbrand.jpg-Fv7HHkBaQgZe7HG3hbz5aojPoFRIuo.jpeg',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#fcfdfd]">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 px-8 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">
              Hi, Dollar! <span className="ml-1">👋</span>
            </h2>
            <p className="text-gray-500">Welcome Back</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search destination" />
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-482Kz4Ro7YXPgsZnttDFsQEmrWQnhG.jpeg"
                alt="User avatar"
              />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Popular Collection</h3>
          <Button variant="link">See All</Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {popularItems.map((item) => (
            <CollectionCard key={item.id} {...item} />
          ))}
        </div>
      </main>

      <CartSidebar />
    </div>
  );
}

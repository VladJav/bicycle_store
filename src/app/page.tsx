import { Button } from '@src/components/ui/button';
import Sidebar from '@src/components/layout/Sidebar/Sidebar';
import CartSidebar from '@src/components/layout/CartSidebar';
import CollectionCard from '@src/components/CollectionCard';
import prisma from '@src/lib/prisma';
import MainHeader from '@src/components/layout/MainHeader';

export default async function Home() {
  const bicycles = await prisma.bicycle.findMany();

  return (
    <div className="flex min-h-screen bg-[#fcfdfd]">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 px-8 py-8">
        <MainHeader />
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Popular Collection</h3>
          <Button variant="link">See All</Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {bicycles.map((item) => (
            <CollectionCard key={item.id} {...item} />
          ))}
        </div>
      </main>
      <CartSidebar />
    </div>
  );
}

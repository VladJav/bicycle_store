import { Button } from '@src/components/ui/button';
import Sidebar from '@src/components/layout/Sidebar/Sidebar';
import CartSidebar from '@src/components/layout/CartSidebar';
import CollectionCard from '@src/components/CollectionCard';
import MainHeader from '@src/components/layout/MainHeader';
import { auth } from '@src/lib/auth';
import Link from 'next/link';
import { getAllBicycles } from '@src/actions/bicycle';

export default async function Home() {
  const bicycles = await getAllBicycles({});
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-[#fcfdfd]">
      <Sidebar />

      <main className="flex-1 px-8 py-8">
        <MainHeader user={session?.user} />
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Popular Collection</h3>
          <Button variant="link"><Link href="/product">See All</Link></Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {bicycles.map((item) => (
            <CollectionCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              colors={item.colors}
              imageUrl={item.images[0]}
            />
          ))}
        </div>
      </main>
      <CartSidebar bicycles={bicycles} />
    </div>
  );
}

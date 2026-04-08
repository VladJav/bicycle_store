import Header from '@src/components/layout/Header';
import HeroSection from '@src/components/Home/HeroSection';
import FeaturedProducts from '@src/components/Home/FeaturedProducts';
import { getAllBicycles } from '@src/actions/bicycle';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@src/components/ui/button';

export default async function Home() {
  const bicycles = await getAllBicycles({});
  // Display only top 4 bicycles as featured
  const featuredBikes = bicycles.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-16">
      <Header />
      <HeroSection />

      <main className="flex-1">
        <FeaturedProducts bicycles={featuredBikes} />

        {/* Promotional Ad Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-16">
          <div className="relative rounded-3xl overflow-hidden h-[450px] w-full group shadow-2xl">
            <Image
              src="/images/promo_ad.png"
              alt="Premium Gear & Accessories"
              fill
              className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-center items-start p-10 md:p-16 text-white z-10 max-w-3xl">
              <span className="mb-4 inline-block font-bold tracking-widest text-white/90 uppercase text-sm border-b-2 border-white/50 pb-1 shadow-sm">
                Limited Time Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Gear Up for the <br/>Ultimate Journey
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed">
                Upgrade your performance with our newly arrived top-tier cycling accessories, crafted for maximum durability and speed.
              </p>
              <Link href="/product">
                <Button size="lg" className="rounded-full px-10 py-6 text-lg font-bold shadow-xl transition-transform hover:-translate-y-1">Shop Accessories</Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

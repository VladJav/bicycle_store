import Image from 'next/image';
import { Button } from '@src/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative w-full h-[600px] bg-slate-900 overflow-hidden group">
      <Image
        src="/images/epic_hero.png"
        alt="Premium Bicycles"
        fill
        priority
        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
      />
      
      {/* Overlay Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur-md shadow-lg border border-white/20">
            New Collection 2026
          </span>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Redefine Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Ride.</span>
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            Experience the pinnacle of engineering with our carbon fiber road bikes and robust mountain bikes. Ride further, faster.
          </p>
          <div className="flex gap-4">
            <Link href="/product">
              <Button size="lg" className="rounded-full font-semibold text-lg px-8 py-6 shadow-xl transition-transform hover:scale-105">Shop Now</Button>
            </Link>
            <Link href="/product?sort=newest">
              <Button size="lg" variant="outline" className="rounded-full font-semibold text-lg px-8 py-6 text-white border-white bg-transparent hover:bg-white hover:text-black transition-all">Explore New arrivals</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

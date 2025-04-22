import Image from 'next/image';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex w-full flex-col items-center justify-center px-4 sm:w-1/2 md:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fs-OQzXWiKsdo0mSCzNZyZmZHXxrCi0Bp.png"
              alt="Fashion Store"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden w-1/2 bg-[#e0e5ce] sm:block">
        <div className="relative h-full w-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Best%20Media%20Tote%20Bags,%20Ranked.jpg-z2O2nGPSTrjey8xEM1cc5aTI2ggjXE.jpeg"
            alt="Tote Bag"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-8 text-white">
            <h1 className="mb-4 text-4xl font-bold">
              Welcome to Tote Bag Store
            </h1>
            <p className="mb-6 text-center text-lg">
              Discover our exclusive collection of high-quality, stylish tote
              bags for every occasion.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-white"></span>
              <span className="h-2 w-2 rounded-full bg-white/50"></span>
              <span className="h-2 w-2 rounded-full bg-white/50"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

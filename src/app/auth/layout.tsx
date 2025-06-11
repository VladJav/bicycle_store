import Image from 'next/image';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col items-center justify-center px-4 sm:w-1/2 md:px-8 lg:px-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      <div className="hidden w-1/2 bg-[#e0e5ce] sm:block">
        <div className="relative h-full w-full">
          <Image
            src="/images/bicycle-checkout.png"
            alt="Bicycle"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-8 text-white">
            <h1 className="mb-4 text-4xl font-bold">
              Welcome to Bicycle Store
            </h1>
            <p className="mb-6 text-center text-lg">
              Discover our exclusive collection of high-quality, stylish
              bicycles for every occasion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

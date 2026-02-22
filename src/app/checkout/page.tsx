import type React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import OrderSummary from '@src/components/OrderSummary/OrderSummary';
import CheckoutFormComponent from '@src/components/CheckoutForm/CheckoutForm';
import prisma from '@src/lib/prisma';
import { auth } from '@src/lib/auth';

export default async function CheckoutPage() {
  const bicycles = await prisma.bicycle.findMany();
  const session = await auth();
  
  let user = null;
  if (session?.user?.id) {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
  }

  return (
    <div className="min-h-screen bg-[#fcfdfd] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#415444] hover:underline"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Shopping
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <OrderSummary bicycles={bicycles} />

          <CheckoutFormComponent bicycles={bicycles} user={user} />
        </div>
      </div>
    </div>
  );
}

import type React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import prisma from '@src/lib/prisma';
import { auth } from '@src/lib/auth';
import { redirect } from 'next/navigation';
import CheckoutContent from '@src/components/CheckoutForm/CheckoutContent';

export default async function CheckoutPage() {
  const bicycles = await prisma.bicycle.findMany();
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/sign-in');
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      addressLine1: true,
      city: true,
      state: true,
      zip: true,
      country: true,
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Shopping
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase</p>
        </div>

        <CheckoutContent bicycles={bicycles} user={user} />
      </div>
    </div>
  );
}

import Link from 'next/link';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { auth } from '@src/lib/auth';
import { redirect } from 'next/navigation';
import { createOrder } from '@src/actions/orders';
import { ClearCartOnSuccess } from './ClearCartOnSuccess';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; payment_intent?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/sign-in');
  }

  const { orderId: orderIdParam, payment_intent: paymentIntentId } =
    await searchParams;
  let orderId = orderIdParam;
  let errorMessage: string | null = null;

  if (!orderId && paymentIntentId) {
    try {
      const order = await createOrder({
        stripeIntentId: paymentIntentId,
      });
      orderId = order.id;
    } catch (error) {
      console.error('Error finalizing order:', error);
      errorMessage =
        'We could not verify your payment and create the order. Please contact support if the payment was charged.';
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-16">
      <ClearCartOnSuccess orderId={orderId} />
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        {errorMessage ? (
          <AlertCircle className="mb-6 h-16 w-16 text-destructive" />
        ) : (
          <CheckCircle className="mb-6 h-16 w-16 text-primary" />
        )}
        <h1 className="text-3xl font-bold">
          {errorMessage ? 'Order not finalized' : 'Order confirmed'}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {errorMessage ||
          (orderId
            ? `Your order #${orderId.slice(0, 8)} was created successfully.`
            : 'Your order was created successfully.')}
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/profile"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
          >
            View orders
          </Link>
          <Link
            href="/product"
            className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

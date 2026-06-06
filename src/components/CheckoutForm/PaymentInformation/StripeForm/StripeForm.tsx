import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@src/components/ui/button';
import { useRouter } from 'next/navigation';

function StripeForm({
  total,
  onSuccess,
}: {
  total: number;
  onSuccess: () => Promise<string | undefined>;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(undefined);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        const orderId = await onSuccess();
        router.push(`/checkout/success${orderId ? `?orderId=${orderId}` : ''}`);
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-[#415444] hover:bg-[#415444]/90"
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          `Pay ${total.toFixed(2)}`
        )}
      </Button>
    </form>
  );
}

export default StripeForm;

import { Button } from '@src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@src/components/ui/card';
import { Label } from '@src/components/ui/label';
import { RadioGroupItem } from '@src/components/ui/radio-group';
import { RadioGroup } from '@src/components/ui/radio-group';
import { TabsContent } from '@src/components/ui/tabs';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { Loader2, CreditCard } from 'lucide-react';
import StripeForm from './StripeForm/StripeForm';
import { createStripeIntent } from '@src/actions/createStripeIntent';
import useCartStore from '@src/store/useCartStore';
import { Bicycle } from '@generated/prisma';
import { CheckoutTabs } from '@src/constants/core';
import { DeliveryDetails, ShippingDetails } from '@src/types/Checkout';
import { createOrder } from '@src/actions/orders';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

interface PaymentInformationProps {
  handleTabChange: (tab: CheckoutTabs) => void;
  bicycles: Bicycle[];
  shippingDetails: ShippingDetails;
  selectedShipping: DeliveryDetails;
}

const PaymentInformation = ({
  handleTabChange,
  bicycles,
  shippingDetails,
  selectedShipping,
}: PaymentInformationProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeIntentId, setStripeIntentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [total, setTotal] = useState<number>(0);
  const { items } = useCartStore();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);
        const cartItems = items
          .map((item) => {
            const bicycle = bicycles.find((bicycle) => bicycle.id === item.id);
            if (!bicycle) return null;
            return {
              id: bicycle.id,
              name: bicycle.title,
              quantity: item.quantity,
              price: bicycle.price,
              selectedColor: item.color,
            };
          })
          .filter((item) => item !== null);

        if (cartItems.length === 0) {
          setClientSecret(null);
          setStripeIntentId(null);
          setTotal(0);
          return;
        }

        const formattedShippingInfo = {
          address: {
            city: shippingDetails.city,
            country: shippingDetails.country,
            line1: shippingDetails.address,
            line2: '',
            postal_code: shippingDetails.zipCode,
          },
          name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          phone: shippingDetails.phone,
          carrier: selectedShipping.shippingOption,
        };

        const { clientSecret, paymentIntentId, total } = await createStripeIntent(
          items,
          selectedShipping.shippingOption,
          formattedShippingInfo
        );

        setClientSecret(clientSecret);
        setStripeIntentId(paymentIntentId);
        setTotal(total);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast('Error', {
          description: 'Could not initialize payment. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    createPaymentIntent();
  }, [shippingDetails, selectedShipping, items, bicycles]);

  const handlePaymentSuccess = async () => {
    if (!stripeIntentId) return;
    const order = await createOrder({
      stripeIntentId,
    });
    return order.id;
  };

  return (
    <TabsContent value="payment">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Complete your purchase securely</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            <div
              className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                paymentMethod === 'card'
                  ? 'border-primary bg-primary/20'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="font-medium">
                  Credit / Debit Card
                </Label>
              </div>
              <div className="flex space-x-1">
                <CreditCard className="h-6 w-auto" />
              </div>
            </div>
          </RadioGroup>

          {paymentMethod === 'card' && (
            <div className="mt-4 space-y-4 rounded-lg border border-border p-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeForm
                    total={total}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-red-500">
                    Failed to initialize payment. Please try again.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleTabChange(CheckoutTabs.Delivery)}
            >
              Back to Delivery
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PaymentInformation;

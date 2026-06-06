'use client';
import { Tabs, TabsList, TabsTrigger } from '@src/components/ui/tabs';
import { CreditCard, MapPin, Truck } from 'lucide-react';
import { useState } from 'react';
import ShippingInformation from './ShippingInformation/ShippingInformation';
import DeliveryOptions from './DeliveryOptions/DeliveryOptions';
import PaymentInformation from './PaymentInformation/PaymantInformation';
import { DeliveryDetails, ShippingDetails } from '@src/types/Checkout';
import ShippingScheme from '@src/lib/validations/ShippingValidation';
import { CustomTooltip } from '@src/components/ui/tooltip';
import { CheckoutTabs } from '@src/constants/core';
import { Bicycle } from '@generated/prisma';

interface CheckoutFormProps {
  bicycles: Bicycle[];
  user?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    addressLine1?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
  } | null;
  selectedShipping: DeliveryDetails;
  setSelectedShipping: (value: DeliveryDetails) => void;
}

const CheckoutForm = ({
  bicycles,
  user,
  selectedShipping,
  setSelectedShipping,
}: CheckoutFormProps) => {
  const [activeTab, setActiveTab] = useState<CheckoutTabs>(
    CheckoutTabs.Shipping
  );

  let defaultFirstName = '';
  let defaultLastName = '';
  if (user?.name) {
    const parts = user.name.split(' ');
    defaultFirstName = parts[0] || '';
    defaultLastName = parts.slice(1).join(' ') || '';
  }

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: defaultFirstName,
    lastName: defaultLastName,
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.addressLine1 || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zip || '',
    country: user?.country || '',
  });
  const isShippingValid = ShippingScheme.isValidSync(shippingDetails);

  const handleTabChange = async (value: CheckoutTabs) => {
    if (isShippingValid) {
      setActiveTab(value);
    }
  };

  const handleShippingSubmit = (value: ShippingDetails) => {
    setShippingDetails(value);
    setActiveTab(CheckoutTabs.Delivery);
  };

  const handleDeliverySubmit = (value: DeliveryDetails) => {
    setSelectedShipping(value);
    setActiveTab(CheckoutTabs.Payment);
  };

  return (
    <div className="md:col-span-2">
      <Tabs
        value={activeTab}
        onValueChange={(value) => handleTabChange(value as CheckoutTabs)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Shipping</span>
          </TabsTrigger>

          <CustomTooltip
            tooltip="Please fill in all required fields"
            isDisabled={isShippingValid}
          >
            <TabsTrigger
              value="delivery"
              disabled={!isShippingValid}
              className="flex items-center gap-2 w-full"
            >
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Delivery</span>
            </TabsTrigger>
          </CustomTooltip>
          <CustomTooltip
            isDisabled={isShippingValid}
            tooltip="Please fill in all required fields"
          >
            <TabsTrigger
              disabled={!isShippingValid}
              value="payment"
              className="flex items-center gap-2 w-full"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
          </CustomTooltip>
        </TabsList>

        {/* Shipping Information */}
        <ShippingInformation
          initialValue={shippingDetails}
          handleShippingSubmit={handleShippingSubmit}
        />

        {/* Delivery Options */}
        <DeliveryOptions
          initialValue={selectedShipping}
          handleDeliverySubmit={handleDeliverySubmit}
          handleTabChange={handleTabChange}
        />

        {/* Payment Information */}
        <PaymentInformation
          handleTabChange={handleTabChange}
          bicycles={bicycles}
          shippingDetails={shippingDetails}
          selectedShipping={selectedShipping}
        />
      </Tabs>
    </div>
  );
};

export default CheckoutForm;

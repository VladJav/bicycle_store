export const shippingOptions = [
  {
    id: 'nova-poshta',
    name: 'Nova Poshta',
    description: '1-2 business days',
    price: 3,
  },
  {
    id: 'meest',
    name: 'Meest',
    description: '2-4 business days',
    price: 2,
  },
  {
    id: 'ukrposhta',
    name: 'Ukrposhta',
    description: '3-5 business days',
    price: 1,
  },
];

export enum CheckoutTabs {
  Shipping = 'shipping',
  Delivery = 'delivery',
  Payment = 'payment',
}

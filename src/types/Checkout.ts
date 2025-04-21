type ShippingOption = 'nova-poshta' | 'meest' | 'ukrposhta';

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DeliveryDetails {
  shippingOption: ShippingOption;
}


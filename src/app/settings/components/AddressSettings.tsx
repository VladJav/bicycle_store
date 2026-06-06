'use client';

import { useState } from 'react';
import { Button } from '@src/components/ui/button';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { toast } from 'sonner';
import { updateProfile } from '@src/actions/user';

interface AddressSettingsProps {
  user: {
    id: string;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
  };
}

export default function AddressSettings({ user }: AddressSettingsProps) {
  const [addressLine1, setAddressLine1] = useState(user.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(user.addressLine2 || '');
  const [city, setCity] = useState(user.city || '');
  const [state, setState] = useState(user.state || '');
  const [zip, setZip] = useState(user.zip || '');
  const [country, setCountry] = useState(user.country || 'United States');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await updateProfile({
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        country
      });
      toast.success('Default address saved successfully');
    } catch (error) {
      toast.error('Failed to save address.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Default Shipping Address</h3>
        <p className="text-sm text-gray-500 mb-4">
          This address will be pre-filled during your checkout.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="address_line1">Street Address</Label>
            <Input 
              id="address_line1" 
              placeholder="123 Main St" 
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address_line2">Apt, Suite, etc. (Optional)</Label>
            <Input 
              id="address_line2" 
              placeholder="Apt 4B" 
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                placeholder="New York" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>
              <Input 
                id="state" 
                placeholder="NY" 
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP / Postal Code</Label>
              <Input 
                id="zip" 
                placeholder="10001" 
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                placeholder="United States" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isPending} className="mt-2">
            {isPending ? 'Saving...' : 'Save Address'}
          </Button>
        </form>
      </div>
    </div>
  );
}

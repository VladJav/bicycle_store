'use client';

import { useState } from 'react';
import { Button } from '@src/components/ui/button';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { updateProfile } from '@src/actions/user';
import { toast } from 'sonner';

interface ProfileFormProps {
  user: {
    id: string;
    name: string | null;
    phone: string | null;
    email: string;
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await updateProfile(user.id, { name, phone });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg border shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700">Email</Label>
        <Input id="email" type="email" value={user.email} disabled className="bg-gray-50" />
        <p className="text-xs text-gray-500">Email cannot be changed.</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700">Name</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="John Doe"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
        <Input 
          id="phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      <Button type="submit" disabled={isPending} className="w-full mt-2">
        {isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}

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
      await updateProfile({ name, phone });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-card text-card-foreground p-6 rounded-lg border shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">Email</Label>
        <Input id="email" type="email" value={user.email} disabled className="bg-muted text-muted-foreground disabled:opacity-75" />
        <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">Name</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="John Doe"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
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

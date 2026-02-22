'use client';

import { useState } from 'react';
import { Button } from '@src/components/ui/button';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { toast } from 'sonner';

interface SecuritySettingsProps {
  user: {
    id: string;
    email: string;
    accounts?: any[];
  };
}

export default function SecuritySettings({ user }: SecuritySettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setIsPending(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Password updated successfully (Simulated)');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsPending(false);
    }, 1000);
  };

  const isOAuthUser = user.accounts && user.accounts.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Password</h3>
        <p className="text-sm text-gray-500 mb-4">
          Change your password to keep your account secure.
        </p>

        {isOAuthUser ? (
          <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm">
            You are logged in via an external provider (e.g., Google or GitHub). Password changes are managed by your provider.
          </div>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="current_password">Current Password</Label>
              <Input 
                id="current_password" 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input 
                id="new_password" 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm New Password</Label>
              <Input 
                id="confirm_password" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        )}
      </div>

      <div className="pt-6 border-t">
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add an extra layer of security to your account.
        </p>
        <div className="flex items-center justify-between p-4 border rounded-md">
          <div>
            <p className="font-medium text-sm">Authenticator App</p>
            <p className="text-sm text-gray-500">Use an app like Google Authenticator to get 2FA codes.</p>
          </div>
          <Button variant="outline" onClick={() => toast.info('2FA Setup not implemented yet')}>Enable</Button>
        </div>
      </div>
    </div>
  );
}

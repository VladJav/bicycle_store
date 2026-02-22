'use client';

import { useState } from 'react';
import { Button } from '@src/components/ui/button';
import { Label } from '@src/components/ui/label';
import { Checkbox } from '@src/components/ui/checkbox';
import { toast } from 'sonner';

export default function NotificationSettings() {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSave = () => {
    setIsPending(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Notification preferences updated');
      setIsPending(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Email Notifications</h3>
        <p className="text-sm text-gray-500 mb-6">
          Choose what emails you receive from us.
        </p>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="order_updates" 
              checked={orderUpdates}
              onCheckedChange={(checked) => setOrderUpdates(checked === true)}
            />
            <div className="leading-none">
              <Label htmlFor="order_updates" className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Order Updates
              </Label>
              <p className="text-sm text-gray-500">
                Receive emails about your order status, shipping, and delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="marketing" 
              checked={marketing}
              onCheckedChange={(checked) => setMarketing(checked === true)}
            />
            <div className="leading-none">
              <Label htmlFor="marketing" className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Marketing & Promotions
              </Label>
              <p className="text-sm text-gray-500">
                Receive emails about new collections, sales, and special offers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="text-lg font-medium">SMS Notifications</h3>
        <p className="text-sm text-gray-500 mb-6">
          Receive text messages for real-time delivery updates.
        </p>

        <div className="flex items-start space-x-3">
          <Checkbox 
            id="sms_alerts" 
            checked={smsAlerts}
            onCheckedChange={(checked) => setSmsAlerts(checked === true)}
          />
          <div className="leading-none">
            <Label htmlFor="sms_alerts" className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              SMS Alerts
            </Label>
            <p className="text-sm text-gray-500">
              Only for important order delivery notifications.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} disabled={isPending} className="mt-6">
        {isPending ? 'Saving...' : 'Save Preferences'}
      </Button>
    </div>
  );
}

'use client';

import { useTheme } from 'next-themes';
import { Button } from '@src/components/ui/button';
import { Label } from '@src/components/ui/label';
import { useState, useEffect } from 'react';

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Theme Preferences</h3>
        <p className="text-sm text-gray-500 mb-6">
          Customize how the application looks on your device.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
          {/* Light Theme Option */}
          <div 
            onClick={() => setTheme('light')}
            className={`border-2 rounded-lg p-4 cursor-pointer hover:border-foreground transition-all ${
              theme === 'light' ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border'
            }`}
          >
            <div className="aspect-[4/3] rounded bg-white border border-border mb-3 flex items-center justify-center">
              <div className="space-y-2 w-3/4">
                <div className="h-4 bg-zinc-200 rounded w-full"></div>
                <div className="h-4 bg-zinc-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label className="cursor-pointer">Light</Label>
              <div className={`w-4 h-4 rounded-full border ${theme === 'light' ? 'border-4 border-primary' : 'border-border'}`}></div>
            </div>
          </div>

          {/* Dark Theme Option */}
          <div 
            onClick={() => setTheme('dark')}
            className={`border-2 rounded-lg p-4 cursor-pointer hover:border-foreground transition-all ${
              theme === 'dark' ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border'
            }`}
          >
            <div className="aspect-[4/3] rounded bg-zinc-950 border border-zinc-800 mb-3 flex items-center justify-center">
              <div className="space-y-2 w-3/4">
                <div className="h-4 bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label className="cursor-pointer">Dark</Label>
              <div className={`w-4 h-4 rounded-full border ${theme === 'dark' ? 'border-4 border-primary' : 'border-border'}`}></div>
            </div>
          </div>

          {/* System Theme Option */}
          <div 
            onClick={() => setTheme('system')}
            className={`border-2 rounded-lg p-4 cursor-pointer hover:border-foreground transition-all ${
              theme === 'system' ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border'
            }`}
          >
	            <div className="aspect-[4/3] rounded border border-border overflow-hidden flex flex-col mb-3">
	              <div className="flex-1 bg-white flex items-center justify-center">
	                <div className="h-2 bg-zinc-200 rounded w-1/2"></div>
	              </div>
	              <div className="flex-1 bg-zinc-950 flex items-center justify-center">
	                <div className="h-2 bg-zinc-800 rounded w-1/2"></div>
	              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label className="cursor-pointer">System</Label>
              <div className={`w-4 h-4 rounded-full border ${theme === 'system' ? 'border-4 border-primary' : 'border-border'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

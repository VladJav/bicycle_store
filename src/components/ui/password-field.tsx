'use client';

import { useState } from 'react';
import { Button } from '@src/components/ui/button';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { FieldInputProps } from 'formik';

interface PasswordFieldProps extends FieldInputProps<string> {
  name: string;
  label: string;
}

const PasswordField = ({ name, label, ...props }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <div className="relative">
          <Input
            id={name}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            required
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
            <span className="sr-only">
              {showPassword ? 'Hide password' : 'Show password'}
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PasswordField;

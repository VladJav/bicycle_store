'use client';
import Link from 'next/link';

import { Formik, Field, FieldProps, Form } from 'formik';
import { Button } from '@src/components/ui/button';
import { Checkbox } from '@src/components/ui/checkbox';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import PasswordField from '@src/components/ui/password-field';
import { signIn } from 'next-auth/react';

export default function SignUpPage() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-500">
          Enter your information to create an account
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(data) => console.log(data)}
      >
        {() => {
          return (
            <Form className="space-y-4">
              <Field name="name">
                {({ field }: FieldProps) => {
                  return (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...field}
                        required
                      />
                    </div>
                  );
                }}
              </Field>

              <Field name="email">
                {({ field }: FieldProps) => {
                  return (
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...field}
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  );
                }}
              </Field>

              <Field name="password">
                {({ field }: FieldProps) => {
                  return <PasswordField label="Password" {...field} />;
                }}
              </Field>

              <Field name="confirmPassword">
                {({ field }: FieldProps) => {
                  return <PasswordField label="Confirm Password" {...field} />;
                }}
              </Field>

              <Field type="checkbox" name="agreeTerms">
                {({ field }: FieldProps) => {
                  return (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        {...field}
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange({
                            target: {
                              name: 'agreeTerms',
                              value: checked,
                            },
                          })
                        }
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{' '}
                        <Link
                          href="/terms"
                          className="text-[#415444] hover:underline"
                        >
                          terms and conditions
                        </Link>
                      </Label>
                    </div>
                  );
                }}
              </Field>

              <Button
                type="submit"
                className="w-full bg-[#415444] hover:bg-[#415444]/90"
              >
                Create Account
              </Button>
            </Form>
          );
        }}
      </Formik>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button variant="outline" onClick={() => signIn('google')}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/auth/sign-in"
          className="font-medium text-[#415444] hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

'use client';
import Link from 'next/link';

import { Formik, Field, FieldProps, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@src/components/ui/button';
import { Checkbox } from '@src/components/ui/checkbox';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import PasswordField from '@src/components/ui/password-field';
import { signIn } from 'next-auth/react';
import { registerUser, sendVerificationEmail } from '@src/actions/registerUser';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  verificationToken?: string;
}

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  verificationToken: Yup.string()
    .test('conditional-required', 'Verification code is required', function(value) {
      const isVerificationShown = this.options.context!.showVerification;
      if (isVerificationShown && !value) {
        return false;
      }
      return true;
    }),
});

export default function SignUpPage() {
  const initialValues: SignUpFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    verificationToken: '',
  };
  const [showVerification, setShowVerification] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (values: SignUpFormValues) => {
    setVerificationError('');
    if (!showVerification) {
      try {
        await sendVerificationEmail(values.email);
        setShowVerification(true);
        setResendCooldown(60);
        return;
      } catch {
        toast('Email Verification Failed', {
          position: 'bottom-left',
          description: 'Could not send verification email. Please check your email address and try again.',
        });
        return;
      }
    }

    if (!values.verificationToken) {
      setVerificationError('Verification code is required');
      return;
    }
    
    try {
      await registerUser(
        values.name,
        values.email,
        values.password,
        values.verificationToken
      );
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      });
    } catch (error) {
      toast('Account Creation Failed', {
        position: 'bottom-left',
        description:
          error instanceof Error
            ? error.message
            : 'Please check your verification code and try again.',
      });
    }
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
        onSubmit={handleSubmit} 
        validationSchema={SignUpSchema}
        validateOnChange={false}
        validateOnBlur={true}
        context={{ showVerification }}
      >
        {({ values, errors, touched }) => {
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
                        className={errors.name && touched.name ? 'border-red-500' : ''}
                      />
                      {errors.name && touched.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
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
                        className={errors.email && touched.email ? 'border-red-500' : ''}
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  );
                }}
              </Field>

              <Field name="password">
                {({ field }: FieldProps) => {
                  return (
                    <>
                      <div className={errors.password && touched.password ? 'border-red-500 rounded' : ''}>
                        <PasswordField 
                          label="Password" 
                          {...field}
                        />
                      </div>
                      {errors.password && touched.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                      )}
                    </>
                  );
                }}
              </Field>

              <Field name="confirmPassword">
                {({ field }: FieldProps) => {
                  return (
                    <>
                      <div className={errors.confirmPassword && touched.confirmPassword ? 'border-red-500 rounded' : ''}>
                        <PasswordField 
                          label="Confirm Password" 
                          {...field}
                        />
                      </div>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                      )}
                    </>
                  );
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

              {showVerification && (
                <Field name="verificationToken">
                  {({ field }: FieldProps) => {
                    return (
                      <div className="space-y-2">
                        <Label htmlFor="verificationToken">
                          Verification Code
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="verificationToken"
                            type="text"
                            {...field}
                            maxLength={6}
                            required
                            className={errors.verificationToken || verificationError ? 'border-red-500' : ''}
                          />
                          <Button
                            variant="secondary"
                            type="button"
	                            disabled={resendCooldown > 0}
	                            onClick={async () => {
	                              await sendVerificationEmail(values.email);
	                              setResendCooldown(60);
	                            }}
                          >
                            {resendCooldown > 0
                              ? `Resend (${resendCooldown}s)`
                              : 'Resend code'}
                          </Button>
                        </div>
                        {(errors.verificationToken || verificationError) && (
                          <p className="text-red-500 text-xs mt-1">
                            {verificationError || errors.verificationToken}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </Field>
              )}

              <Button
                type="submit"
                disabled={!values.agreeTerms}
                className="w-full bg-[#415444] hover:bg-[#415444]/90"
              >
                {showVerification ? 'Create Account' : 'Verify Email'}
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@src/components/ui/card';
import { Label } from '@src/components/ui/label';
import { TabsContent } from '@src/components/ui/tabs';
import { Input } from '@src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@src/components/ui/select';
import { Button } from '@src/components/ui/button';
import { Formik, Field, Form, FieldProps } from 'formik';
import { ShippingDetails } from '@src/types/Checkout';
import ShippingScheme from '@src/lib/validations/ShippingValidation';
import RequiredAsterisk from '@src/components/ui/asterisk';

interface ShippingInformationProps {
  initialValue: ShippingDetails;
  handleShippingSubmit: (data: ShippingDetails) => void;
}

const ShippingInformation = ({
  initialValue,
  handleShippingSubmit,
}: ShippingInformationProps) => {
  return (
    <TabsContent value="shipping">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
          <CardDescription>Enter your shipping details</CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValue}
            onSubmit={handleShippingSubmit}
            validationSchema={ShippingScheme}
          >
            {({ errors, touched }) => {
              return (
                <Form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field name="firstName">
                      {({ field }: FieldProps) => {
                        const hasError = errors.firstName && touched.firstName;
                        return (
                          <div className="space-y-2">
                            <Label
                              htmlFor="firstName"
                              className={hasError ? 'text-red-500' : ''}
                            >
                              <div>
                                First Name
                                <RequiredAsterisk />
                              </div>
                            </Label>
                            <Input
                              {...field}
                              className={
                                hasError
                                  ? 'border-red-500 focus:ring-red-500'
                                  : ''
                              }
                            />
                            {hasError ? (
                              <div className="text-red-500 text-sm font-medium mt-1">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        );
                      }}
                    </Field>
                    <Field name="lastName">
                      {({ field }: FieldProps) => {
                        const hasError = errors.lastName && touched.lastName;
                        return (
                          <div className="space-y-2">
                            <Label
                              htmlFor="lastName"
                              className={hasError ? 'text-red-500' : ''}
                            >
                              <div>
                                Last Name
                                <RequiredAsterisk />
                              </div>
                            </Label>
                            <Input
                              {...field}
                              className={
                                hasError
                                  ? 'border-red-500 focus:ring-red-500'
                                  : ''
                              }
                            />
                            {hasError ? (
                              <div className="text-red-500 text-sm font-medium mt-1">
                                {errors.lastName}
                              </div>
                            ) : null}
                          </div>
                        );
                      }}
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field name="email">
                      {({ field }: FieldProps) => {
                        const hasError = errors.email && touched.email;
                        return (
                          <div className="space-y-2">
                            <Label
                              htmlFor="email"
                              className={hasError ? 'text-red-500' : ''}
                            >
                              <div>
                                Email
                                <RequiredAsterisk />
                              </div>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              {...field}
                              className={
                                hasError
                                  ? 'border-red-500 focus:ring-red-500'
                                  : ''
                              }
                            />
                            {hasError ? (
                              <div className="text-red-500 text-sm font-medium mt-1">
                                {errors.email}
                              </div>
                            ) : null}
                          </div>
                        );
                      }}
                    </Field>
                    <Field name="phone">
                      {({ field }: FieldProps) => {
                        const hasError = errors.phone && touched.phone;
                        return (
                          <div className="space-y-2">
                            <Label
                              htmlFor="phone"
                              className={hasError ? 'text-red-500' : ''}
                            >
                              <div>
                                Phone Number
                                <RequiredAsterisk />
                              </div>
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              {...field}
                              className={
                                hasError
                                  ? 'border-red-500 focus:ring-red-500'
                                  : ''
                              }
                            />
                            {hasError ? (
                              <div className="text-red-500 text-sm font-medium mt-1">
                                {errors.phone}
                              </div>
                            ) : null}
                          </div>
                        );
                      }}
                    </Field>
                  </div>

                  <Field name="address">
                    {({ field }: FieldProps) => {
                      const hasError = errors.address && touched.address;
                      return (
                        <div className="space-y-2">
                          <Label
                            htmlFor="address"
                            className={hasError ? 'text-red-500' : ''}
                          >
                            <div>
                              Address
                              <RequiredAsterisk />
                            </div>
                          </Label>
                          <Input
                            {...field}
                            className={
                              hasError
                                ? 'border-red-500 focus:ring-red-500'
                                : ''
                            }
                          />
                          {hasError ? (
                            <div className="text-red-500 text-sm font-medium mt-1">
                              {errors.address}
                            </div>
                          ) : null}
                        </div>
                      );
                    }}
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field name="city">
                      {({ field }: FieldProps) => {
                        const hasError = errors.city && touched.city;
                        return (
                          <div className="space-y-2">
                            <Label
                              htmlFor="city"
                              className={hasError ? 'text-red-500' : ''}
                            >
                              <div>
                                City
                                <RequiredAsterisk />
                              </div>
                            </Label>
                            <Input
                              id="city"
                              {...field}
                              className={
                                hasError
                                  ? 'border-red-500 focus:ring-red-500'
                                  : ''
                              }
                            />
                            {hasError ? (
                              <div className="text-red-500 text-sm font-medium mt-1">
                                {errors.city}
                              </div>
                            ) : null}
                          </div>
                        );
                      }}
                    </Field>
                    <Field name="state">
                      {({ field }: FieldProps) => {
                        const hasError = errors.state && touched.state;
                        return (
                          <div className="space-y-2">
                            <Label
                              htmlFor="state"
                              className={hasError ? 'text-red-500' : ''}
                            >
                              <div>
                                State/Province
                                <RequiredAsterisk />
                              </div>
                            </Label>
                            <Input
                              id="state"
                              {...field}
                              className={
                                hasError
                                  ? 'border-red-500 focus:ring-red-500'
                                  : ''
                              }
                            />
                            {hasError ? (
                              <div className="text-red-500 text-sm font-medium mt-1">
                                {errors.state}
                              </div>
                            ) : null}
                          </div>
                        );
                      }}
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field name="zipCode">
                      {({ field }: FieldProps) => {
                        const hasError = errors.zipCode && touched.zipCode;
                        return (
                          <div className="space-y-2">
                            <Label
                              htmlFor="zipCode"
                              className={hasError ? 'text-red-500' : ''}
                            >
                              <div>
                                ZIP/Postal Code
                                <RequiredAsterisk />
                              </div>
                            </Label>
                            <Input
                              id="zipCode"
                              {...field}
                              className={
                                hasError
                                  ? 'border-red-500 focus:ring-red-500'
                                  : ''
                              }
                            />
                            {hasError ? (
                              <div className="text-red-500 text-sm font-medium mt-1">
                                {errors.zipCode}
                              </div>
                            ) : null}
                          </div>
                        );
                      }}
                    </Field>

                    <Field name="country">
                      {({ field, form }: FieldProps) => {
                        const hasError = errors.country && touched.country;
                        return (
                          <div className="space-y-2">
                            <Label
                              htmlFor="country"
                              className={hasError ? 'text-red-500' : ''}
                            >
                              <div>
                                Country
                                <RequiredAsterisk />
                              </div>
                            </Label>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                form.setFieldValue('country', value);
                              }}
                            >
                              <SelectTrigger
                                id="country"
                                className={
                                  hasError
                                    ? 'border-red-500 focus:ring-red-500'
                                    : ''
                                }
                              >
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="US">
                                  United States
                                </SelectItem>
                                <SelectItem value="CA">Canada</SelectItem>
                                <SelectItem value="UK">
                                  United Kingdom
                                </SelectItem>
                                <SelectItem value="AU">Australia</SelectItem>
                              </SelectContent>
                            </Select>
                            {hasError ? (
                              <div className="text-red-500 text-sm font-medium mt-1">
                                {errors.country}
                              </div>
                            ) : null}
                          </div>
                        );
                      }}
                    </Field>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-[#415444] hover:bg-[#415444]/90"
                    >
                      Continue to Delivery
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ShippingInformation;

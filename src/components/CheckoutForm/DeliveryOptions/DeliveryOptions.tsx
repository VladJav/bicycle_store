import { Button } from '@src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@src/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@src/components/ui/radio-group';
import { Label } from '@src/components/ui/label';
import { Formik, Field, Form, FieldProps } from 'formik';
import { TabsContent } from '@src/components/ui/tabs';
import { CheckoutTabs, shippingOptions } from '@src/constants/core';
import { DeliveryDetails } from '@src/types/Checkout';

interface DeliveryOptionsProps {
  initialValue: DeliveryDetails;
  handleTabChange: (tab: CheckoutTabs) => void;
  handleDeliverySubmit: (values: DeliveryDetails) => void;
}

const DeliveryOptions = ({
  initialValue,
  handleTabChange,
  handleDeliverySubmit,
}: DeliveryOptionsProps) => {
  return (
    <TabsContent value="delivery">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Delivery Options</CardTitle>
          <CardDescription>
            Select your preferred shipping method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik initialValues={initialValue} onSubmit={handleDeliverySubmit}>
            {() => {
              return (
                <Form className="space-y-4">
                  <Field name="shippingOption">
                    {({ field, form }: FieldProps) => {
                      return (
                        <RadioGroup
                          {...field}
                          value={field.value}
                          onValueChange={(value) => {
                            form.setFieldValue('shippingOption', value);
                          }}
                          className="space-y-4"
                        >
                          {shippingOptions.map((option) => (
                            <div
                              key={option.id}
                              className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                                field.value === option.id
                                  ? 'border-[#415444] bg-[#e0e5ce]/50'
                                  : ''
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={option.id}
                                  id={option.id}
                                />
                                <div>
                                  <Label
                                    htmlFor={option.id}
                                    className="font-medium"
                                  >
                                    {option.name}
                                  </Label>
                                  <p className="text-sm text-gray-500">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                              <div className="font-medium">
                                {option.price === 0
                                  ? 'FREE'
                                  : `$${option.price.toFixed(2)}`}
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      );
                    }}
                  </Field>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleTabChange(CheckoutTabs.Shipping)}
                    >
                      Back to Shipping
                    </Button>
                    <Button
                      className="bg-[#415444] hover:bg-[#415444]/90"
                      type="submit"
                    >
                      Continue to Payment
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

export default DeliveryOptions;

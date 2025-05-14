'use client';

import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Bicycle } from '@generated/prisma';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { Input } from '../ui/input';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import * as Yup from 'yup';
import { updateBicycle } from '@src/actions/bicycle';

interface FormValues {
  title: string;
  description: string;
  price: string;
  images: (File | string)[];
  features: string[];
  colors: string[];
}

const productSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  images: Yup.array().min(1, 'At least one image is required'),
  features: Yup.array().of(Yup.string()),
  colors: Yup.array().of(Yup.string()),
});

const DropdownEditAction = ({
  product,
  open,
  setOpen,
}: {
  product: Bicycle;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [newFeature, setNewFeature] = useState('');
  const [newColor, setNewColor] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: (File | string)[]) => void,
    currentImages: (File | string)[]
  ) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFieldValue('images', [...currentImages, ...newImages]);
    }
  };

  const removeImage = (
    index: number,
    values: FormValues,
    setFieldValue: (field: string, value: (File | string)[]) => void
  ) => {
    const newImages = values.images.filter((_, i) => i !== index);
    setFieldValue('images', newImages);
  };

  const addFeature = (
    values: FormValues,
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    if (newFeature.trim()) {
      setFieldValue('features', [...values.features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (
    index: number,
    values: FormValues,
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    const newFeatures = values.features.filter((_, i) => i !== index);
    setFieldValue('features', newFeatures);
  };

  const addColor = (
    values: FormValues,
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    if (newColor.trim()) {
      setFieldValue('colors', [...values.colors, newColor.trim()]);
      setNewColor('');
    }
  };

  const removeColor = (
    index: number,
    values: FormValues,
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    const newColors = values.colors.filter((_, i) => i !== index);
    setFieldValue('colors', newColors);
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      await updateBicycle(product.id, {
        ...values,
        price: parseFloat(values.price),
      });
      setOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            title: product.title || '',
            description: product.description || '',
            price: product.price?.toString() || '',
            images: product.images || [],
            features: product.features || [],
            colors: product.colors || [],
          }}
          validationSchema={productSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="mt-6 space-y-6 overflow-y-auto pr-6 -mr-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Field name="title">
                  {({ field }: FieldProps) => <Input id="title" {...field} />}
                </Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Field name="description">
                  {({ field }: FieldProps) => (
                    <Input id="description" {...field} />
                  )}
                </Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price
                </label>
                <Field name="price">
                  {({ field }: FieldProps) => (
                    <Input id="price" type="number" step="0.01" {...field} />
                  )}
                </Field>
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Images</label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) =>
                        handleImageUpload(
                          e,
                          (field, value) => setFieldValue(field, value),
                          values.images
                        )
                      }
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {values.images.map((image, index) => (
                      <div key={index} className="relative aspect-square group">
                        <Image
                          src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() =>
                            removeImage(index, values, (field, value) =>
                              setFieldValue(field, value)
                            )
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Features</label>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add feature"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      addFeature(values, (field, value) =>
                        setFieldValue(field, value)
                      )
                    }
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {values.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-secondary p-2 rounded-md"
                    >
                      <span className="text-sm">{feature}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeFeature(index, values, (field, value) =>
                            setFieldValue(field, value)
                          )
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="features"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Colors</label>
                <div className="flex gap-2">
                  <Input
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Add color"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      addColor(values, (field, value) =>
                        setFieldValue(field, value)
                      )
                    }
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {values.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-secondary p-2 rounded-md"
                    >
                      <span className="text-sm">{color}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeColor(index, values, (field, value) =>
                            setFieldValue(field, value)
                          )
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="colors"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <Button type="submit" className="w-full sticky bottom-0 py-2">
                Edit Product
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default DropdownEditAction;

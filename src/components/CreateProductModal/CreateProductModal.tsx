'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@src/components/ui/dialog';
import { Button } from '@src/components/ui/button';
import { Input } from '@src/components/ui/input';
import { PlusCircle, X, Upload } from 'lucide-react';
import Image from 'next/image';
import { Formik, Form, Field, FieldProps, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface ProductFormValues {
  title: string;
  description: string;
  price: string;
  images: File[];
  features: string[];
  colors: string[];
}

const productSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .typeError('Price must be a number'),
  images: Yup.array()
    .min(1, 'At least one image is required')
    .required('Images are required'),
  features: Yup.array()
    .min(1, 'At least one feature is required')
    .required('Features are required'),
  colors: Yup.array()
    .min(1, 'At least one color is required')
    .required('Colors are required'),
});

export function CreateProductModal() {
  const [open, setOpen] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newColor, setNewColor] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (
    values: ProductFormValues,
    { resetForm }: FormikHelpers<ProductFormValues>
  ) => {
    const data = {
      ...values,
      price: parseFloat(values.price),
    };
    // TODO: Implement product creation
    console.log(data);
    setOpen(false);
    resetForm();
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setFieldValue: (field: string, value: File[]) => void,
    currentImages: File[]
  ) => {
    const files = Array.from(e.target.files || []);
    setFieldValue('images', [...currentImages, ...files]);
  };

  const removeImage = (
    index: number, 
    values: ProductFormValues, 
    setFieldValue: (field: string, value: File[]) => void
  ) => {
    const newImages = [...values.images];
    newImages.splice(index, 1);
    setFieldValue('images', newImages);
  };

  const addFeature = (
    values: ProductFormValues, 
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    if (newFeature && !values.features.includes(newFeature)) {
      setFieldValue('features', [...values.features, newFeature]);
      setNewFeature('');
    }
  };

  const removeFeature = (
    index: number, 
    values: ProductFormValues, 
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    const newFeatures = [...values.features];
    newFeatures.splice(index, 1);
    setFieldValue('features', newFeatures);
  };

  const addColor = (
    values: ProductFormValues, 
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    if (newColor && !values.colors.includes(newColor)) {
      setFieldValue('colors', [...values.colors, newColor]);
      setNewColor('');
    }
  };

  const removeColor = (
    index: number, 
    values: ProductFormValues, 
    setFieldValue: (field: string, value: string[]) => void
  ) => {
    const newColors = [...values.colors];
    newColors.splice(index, 1);
    setFieldValue('colors', newColors);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className='h-8 gap-1'>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl max-h-[90vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            title: '',
            description: '',
            price: '',
            images: [] as File[],
            features: [] as string[],
            colors: [] as string[],
          }}
          validationSchema={productSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className='mt-6 space-y-6 overflow-y-auto pr-6 -mr-6'>
              <div className='space-y-2'>
                <label htmlFor='title' className='text-sm font-medium'>
                  Title
                </label>
                <Field name='title'>
                  {({ field }: FieldProps) => (
                    <Input id='title' {...field} />
                  )}
                </Field>
                <ErrorMessage
                  name='title'
                  component='div'
                  className='text-sm text-red-500'
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='description' className='text-sm font-medium'>
                  Description
                </label>
                <Field name='description'>
                  {({ field }: FieldProps) => (
                    <Input id='description' {...field} />
                  )}
                </Field>
                <ErrorMessage
                  name='description'
                  component='div'
                  className='text-sm text-red-500'
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='price' className='text-sm font-medium'>
                  Price
                </label>
                <Field name='price'>
                  {({ field }: FieldProps) => (
                    <Input id='price' type='number' step='0.01' {...field} />
                  )}
                </Field>
                <ErrorMessage
                  name='price'
                  component='div'
                  className='text-sm text-red-500'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Images</label>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-2'>
                    <input
                      type='file'
                      ref={fileInputRef}
                      onChange={(e) => handleImageUpload(e, 
                        (field, value) => setFieldValue(field, value),
                        values.images
                      )}
                      accept='image/*'
                      multiple
                      className='hidden'
                    />
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => fileInputRef.current?.click()}
                      className='w-full'
                    >
                      <Upload className='h-4 w-4 mr-2' />
                      Upload Images
                    </Button>
                  </div>
                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                    {values.images.map((image, index) => (
                      <div key={index} className='relative aspect-square group'>
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`Product image ${index + 1}`}
                          fill
                          className='object-cover rounded-lg'
                        />
                        <Button
                          type='button'
                          variant='destructive'
                          size='sm'
                          className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
                          onClick={() => removeImage(index, values, 
                            (field, value) => setFieldValue(field, value)
                          )}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage
                    name='images'
                    component='div'
                    className='text-sm text-red-500'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Features</label>
                <div className='flex gap-2'>
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder='Add feature'
                  />
                  <Button type='button' onClick={() => addFeature(values, 
                    (field, value) => setFieldValue(field, value)
                  )}>
                    Add
                  </Button>
                </div>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {values.features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-1 bg-secondary p-2 rounded-md'>
                      <span className='text-sm'>{feature}</span>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => removeFeature(index, values, 
                          (field, value) => setFieldValue(field, value)
                        )}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name='features'
                  component='div'
                  className='text-sm text-red-500'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Colors</label>
                <div className='flex gap-2'>
                  <Input
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder='Add color'
                  />
                  <Button type='button' onClick={() => addColor(values, 
                    (field, value) => setFieldValue(field, value)
                  )}>
                    Add
                  </Button>
                </div>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {values.colors.map((color, index) => (
                    <div key={index} className='flex items-center gap-1 bg-secondary p-2 rounded-md'>
                      <span className='text-sm'>{color}</span>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => removeColor(index, values, 
                          (field, value) => setFieldValue(field, value)
                        )}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name='colors'
                  component='div'
                  className='text-sm text-red-500'
                />
              </div>

              <Button type='submit' className='w-full sticky bottom-0 py-2'>
                Create Product
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
} 
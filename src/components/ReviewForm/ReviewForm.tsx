'use client';

import { Button } from '../ui/button';
import { Star } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { createReview } from '@src/actions/reviews';
import { useParams } from 'next/navigation';

interface ReviewFormValues {
  rating: number;
  title: string;
  comment: string;
}

const reviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'Please select a rating')
    .required('Rating is required'),
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  comment: Yup.string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review must be less than 1000 characters')
    .required('Review is required'),
});

const ReviewForm = () => {
  const { id } = useParams();
  const handleSubmitReview = (
    values: ReviewFormValues,
    { resetForm }: FormikHelpers<ReviewFormValues>
  ) => {
    createReview({
      ...values,
      // @ts-expect-error - TODO: fix this
      bicycleId: id,
    });
    resetForm();
  };

  return (
    <div className="mt-8 rounded-lg bg-secondary p-6">
      <h3 className="mb-4 text-lg font-medium">Write a Review</h3>
      <Formik
        initialValues={{ rating: 0, title: '', comment: '' }}
        validationSchema={reviewSchema}
        onSubmit={handleSubmitReview}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="rating"
                className="mb-1 block text-sm font-medium"
              >
                Rating
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFieldValue('rating', rating)}
                    className="p-1"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= values.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <ErrorMessage
                name="rating"
                className="mt-1 text-sm text-destructive"
              />
            </div>
            <div>
              <label
                htmlFor="review-title"
                className="mb-1 block text-sm font-medium"
              >
                Title
              </label>
              <Field
                id="review-title"
                name="title"
                type="text"
                className="w-full rounded-md border border-input bg-background text-foreground p-2"
                placeholder="Summarize your review"
              />
              <ErrorMessage
                name="title"
                className="mt-1 text-sm text-destructive"
              />
            </div>
            <div>
              <label
                htmlFor="review-comment"
                className="mb-1 block text-sm font-medium"
              >
                Review
              </label>
              <Field
                as="textarea"
                id="review-comment"
                name="comment"
                className="h-32 w-full rounded-md border border-input bg-background text-foreground p-2"
                placeholder="Write your review here..."
              />
              <ErrorMessage
                name="comment"
                className="mt-1 text-sm text-destructive"
              />
            </div>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Review
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewForm;

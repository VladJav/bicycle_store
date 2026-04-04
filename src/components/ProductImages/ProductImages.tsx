'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImagesProps {
  images: string[];
  name: string;
}

const ProductImages = ({ images, name }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-secondary">
        <Image
          src={images[selectedImage] || '/placeholder.svg'}
          alt={name}
          width={600}
          height={600}
          className="h-[500px] w-full object-cover"
        />
      </div>
      <div className="flex space-x-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`overflow-hidden rounded-lg ${
              selectedImage === index
                ? 'ring-2 ring-primary'
                : 'ring-1 ring-border'
            }`}
          >
            <Image
              src={image || '/placeholder.svg'}
              alt={`${name} - Image ${index + 1}`}
              width={100}
              height={100}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

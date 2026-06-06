'use client';

import ColorSelect from '@src/components/ProductActions/ColorSelect';
import QuantityChanger from '@src/components/ProductActions/QuantityChanger';
import {
  AddToCart,
  AddToWishlist,
  ShareProduct,
} from '@src/components/ProductActions';
import { useState } from 'react';
import useCartStore from '@src/store/useCartStore';

interface ProductConfigurationProps {
  colors: string[];
  title: string;
  description: string;
  id: string;
}

const ProductConfiguration = ({
  colors,
  title,
  description,
  id,
}: ProductConfigurationProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      id,
      color: selectedColor,
      quantity: quantity,
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 font-medium">Color</h3>
          <ColorSelect
            colors={colors}
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
          />
        </div>

        <div>
          <h3 className="mb-2 font-medium">Quantity</h3>
          <QuantityChanger quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>

	      <div className="flex space-x-4">
	        <AddToCart handleAddToCart={handleAddToCart} />
	        <AddToWishlist productId={id} />
	        <ShareProduct name={title} description={description || ''} />
	      </div>
    </>
  );
};

export default ProductConfiguration;

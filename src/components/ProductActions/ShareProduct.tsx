'use client';

import { Share2 } from 'lucide-react';

import { Button } from '../ui/button';

interface ShareProductProps {
  name: string;
  description: string;
}

const ShareProduct = ({ name, description }: ShareProductProps) => {
  const handleShareProduct = () => {
    if (navigator.share) {
      navigator
        .share({
          title: name,
          text: description,
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };
  return (
    <Button
      onClick={handleShareProduct}
      variant="outline"
      className="flex h-12 w-12 items-center justify-center rounded-full p-0"
    >
      <Share2 className="h-5 w-5" />
      <span className="sr-only">Share Product</span>
    </Button>
  );
};

export default ShareProduct;

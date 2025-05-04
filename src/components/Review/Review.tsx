import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';

interface ReviewProps {
  id: string;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  date: string;
}

const Review = ({
  user,
  rating,
  title,
  comment,
  helpful,
  date,
}: ReviewProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image || ''} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h4 className="font-medium">{user.name}</h4>
              <p className="text-sm text-gray-500">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h5 className="font-medium">{title}</h5>
          <p className="mt-1 text-gray-600">{comment}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-sm text-gray-500">
            Was this helpful? ({helpful})
          </Button>
          <Button variant="ghost" size="sm" className="text-sm text-gray-500">
            Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Review;

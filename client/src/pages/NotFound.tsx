import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-4">
        <Frown className="mx-auto h-24 w-24 text-primary" />
        <h1 className="text-6xl font-extrabold text-primary">404</h1>
        <p className="text-2xl font-medium">Page Not Found</p>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild>
          <Link to="/todos">Go to Todos Page</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-6">
        The page you're looking for doesn't exist or you don't have access to it.
      </p>
      <Button
        size="lg"
        onClick={() => navigate('/')}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Return to Home
      </Button>
    </div>
  );
};

export default NotFound;
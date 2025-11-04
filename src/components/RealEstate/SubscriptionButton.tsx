/**
 * Subscription Button for Real Estate Property Access
 * Handles subscription flow and payment processing
 */
import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Lock, Crown, Sparkles } from 'lucide-react';

interface SubscriptionButtonProps {
  propertyId: string;
  propertyTitle: string;
  price: number;
}

export default function SubscriptionButton({ propertyId, propertyTitle, price }: SubscriptionButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    
    // Check if user is logged in
    const userData = localStorage.getItem('domislink_user');
    if (!userData) {
      alert('Please sign in to subscribe to property details');
      setIsProcessing(false);
      return;
    }

    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribed(true);
      setIsProcessing(false);
      
      // Send notification to AI Chief Accountant
      const subscriptionRecord = {
        propertyId,
        propertyTitle,
        price,
        timestamp: new Date().toISOString(),
        user: JSON.parse(userData)
      };
      
      console.log('Subscription recorded:', subscriptionRecord);
      alert(`Successfully subscribed! You now have access to ${propertyTitle} details.`);
    }, 2000);
  };

  if (isSubscribed) {
    return (
      <Badge className="bg-green-600">
        <Crown className="h-3 w-3 mr-1" />
        Subscribed
      </Badge>
    );
  }

  return (
    <Button 
      onClick={handleSubscribe}
      disabled={isProcessing}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
    >
      {isProcessing ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Processing...
        </>
      ) : (
        <>
          <Lock className="h-4 w-4 mr-2" />
          Subscribe to View
        </>
      )}
    </Button>
  );
}
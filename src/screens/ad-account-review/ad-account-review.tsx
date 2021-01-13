import * as React from 'react';

export interface AdAccountReviewProps {
  adAccountId: string;
}

export function AdAccountReview({ adAccountId }: AdAccountReviewProps) {
  return <div>Ad Account Review {adAccountId}</div>;
}

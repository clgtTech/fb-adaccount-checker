import * as React from 'react';
import { Badge, BadgeProps } from 'draft-components';
import { NO_VALUE_PLACEHOLDER } from '../../constants';
import { DeliveryStatusPresenter } from '../../presenters/delivery-status-presenter';

export interface DeliveryStatusInfoProps
  extends React.ComponentPropsWithoutRef<'span'> {
  deliveryStatusPresenter: DeliveryStatusPresenter | undefined;
}

const badgeFillColors: Record<string, BadgeProps['fillColor']> = {
  error: 'red',
  warning: 'orange',
  pending: 'blue',
  active: 'green',
  inactive: 'gray',
};

export function DeliveryStatusInfo({
  deliveryStatusPresenter,
  ...props
}: DeliveryStatusInfoProps) {
  if (!deliveryStatusPresenter || !deliveryStatusPresenter.substatus) {
    return <span {...props}>{NO_VALUE_PLACEHOLDER}</span>;
  }

  return (
    <Badge
      {...props}
      size="sm"
      fillColor={badgeFillColors[deliveryStatusPresenter.status] || 'gray'}
    >
      {deliveryStatusPresenter.substatus}
    </Badge>
  );
}

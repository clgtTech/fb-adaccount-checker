import * as React from 'react';
import { useIntl } from 'react-intl';
import { ObjectDetails, ObjectDetailsProps } from '../object-details';
import { InsightsPresenter } from '../../presenters/insights-presenter';
import { Messages } from '../../services/intl';

export interface InsightsProps extends Omit<ObjectDetailsProps, 'items'> {
  insights: InsightsPresenter;
}

export function Insights({ insights, ...props }: InsightsProps) {
  const intl = useIntl();

  return (
    <ObjectDetails
      {...props}
      items={[
        {
          name: insights.actionType,
          value: insights.actionTypeResult,
        },
        {
          name: intl.formatMessage(Messages.Insights.costPerActionType),
          value: insights.costPerActionType,
        },
        {
          name: intl.formatMessage(Messages.Insights.spend),
          value: insights.spend,
        },
        {
          name: intl.formatMessage(Messages.Insights.ctr),
          value: insights.ctr,
        },
        {
          name: intl.formatMessage(Messages.Insights.cpc),
          value: insights.cpc,
        },
        {
          name: intl.formatMessage(Messages.Insights.cpm),
          value: insights.cpm,
        },
      ]}
    />
  );
}

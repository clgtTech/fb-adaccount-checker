import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { classNames } from 'draft-components';
import { Messages } from '../../services/intl';
import styles from './budget.module.scss';

export interface BudgetProps extends React.ComponentPropsWithoutRef<'div'> {
  bidStrategy?: string;
  dailyBudget?: string;
  lifetimeBudget?: string;
  fallbackMessage: string;
}

export function Budget({
  className,
  dailyBudget,
  lifetimeBudget,
  bidStrategy,
  fallbackMessage,
  ...props
}: BudgetProps) {
  const intl = useIntl();

  let budget = '';
  let type = '';
  if (lifetimeBudget) {
    budget = lifetimeBudget;
    type = intl.formatMessage(Messages.Campaign.lifetimeBudget);
  } else if (dailyBudget) {
    budget = dailyBudget;
    type = intl.formatMessage(Messages.Campaign.dailyBudget);
  }

  return (
    <div {...props} className={classNames(className, styles.container)}>
      {bidStrategy ? (
        <div className={styles.bidStrategy}>
          <FormattedMessage {...Messages.Campaign.bidStrategy} />: {bidStrategy}
        </div>
      ) : null}
      {budget ? (
        <div className={styles.budget}>
          <span className={styles.amount}>{budget}</span>
          <span className={styles.type}>{type}</span>
        </div>
      ) : (
        <div className={styles.fallbackMessage}>{fallbackMessage}</div>
      )}
    </div>
  );
}

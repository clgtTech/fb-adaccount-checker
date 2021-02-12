import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  classNames,
  Spinner,
  IconButton,
  Icons,
  SvgIcon,
} from 'draft-components';
import { BudgetType } from '../../types';
import { CurrencyAmount } from '../../stores/entities';
import { Formatters, Messages } from '../../services/intl';
import { CurrencyAmountField } from '../currency-amount-field';
import { ErrorDetails } from '../error-details';
import styles from './ad-budget.module.scss';

export interface BudgetUpdate {
  dailyBudget?: CurrencyAmount;
  lifetimeBudget?: CurrencyAmount;
}

export interface AdBudgetProps extends React.ComponentPropsWithoutRef<'div'> {
  fallbackMessage: string;
  bidStrategy?: string;
  dailyBudget?: CurrencyAmount;
  lifetimeBudget?: CurrencyAmount;
  canUpdate?: boolean;
  isUpdating?: boolean;
  error?: Error | null;
  onUpdate(update: BudgetUpdate): void;
}

export function AdBudget({
  fallbackMessage,
  bidStrategy,
  dailyBudget,
  lifetimeBudget,
  canUpdate,
  isUpdating,
  error,
  onUpdate,
  className,
  ...props
}: AdBudgetProps) {
  const intl = useIntl();
  const [isEditing, setIsEditing] = React.useState(false);

  let budgetType: BudgetType | undefined;
  let budget: CurrencyAmount | undefined;
  if (dailyBudget && dailyBudget.amount > 0) {
    budgetType = BudgetType.DAILY;
    budget = dailyBudget;
  } else if (lifetimeBudget && lifetimeBudget.amount > 0) {
    budgetType = BudgetType.LIFETIME;
    budget = lifetimeBudget;
  }

  const renderBudget = () => {
    if (budget && budgetType) {
      return (
        <>
          <div className={styles.budget}>
            <span className={styles.amount}>
              {Formatters.formatCurrencyAmount(budget)}
            </span>
            <span className={styles.budgetType}>
              <FormattedMessage {...Messages.Enums.BudgetTypes[budgetType]} />
            </span>
          </div>
          {(function () {
            if (!canUpdate) {
              return null;
            }
            if (isUpdating) {
              return <Spinner size={14} />;
            }
            return (
              <IconButton
                size="sm"
                appearance="secondary"
                icon={<SvgIcon size="xs" icon={Icons.pencilIcon} />}
                title={intl.formatMessage({
                  id: 'components.AdBudget.updateButton',
                  defaultMessage: `Edit budget`,
                })}
                onClick={() => setIsEditing(true)}
              />
            );
          })()}
        </>
      );
    }
    return <div className={styles.fallbackMessage}>{fallbackMessage}</div>;
  };

  const renderBudgetInput = () => {
    if (budget && budgetType) {
      return (
        <CurrencyAmountField
          value={budget}
          onCancel={() => setIsEditing(false)}
          onSave={(currencyAmount) => {
            const update: BudgetUpdate = {};
            if (budgetType === BudgetType.DAILY) {
              update.dailyBudget = currencyAmount;
            } else if (budgetType === BudgetType.LIFETIME) {
              update.lifetimeBudget = currencyAmount;
            }
            onUpdate(update);
            setIsEditing(false);
          }}
        />
      );
    }
    return null;
  };

  return (
    <div {...props} className={classNames(className, styles.container)}>
      {bidStrategy ? (
        <div className={styles.bidStrategy}>
          <FormattedMessage {...Messages.Campaign.bidStrategy} />: {bidStrategy}
        </div>
      ) : null}
      <div className={styles.content}>
        {isEditing ? renderBudgetInput() : renderBudget()}
      </div>

      {error ? (
        <ErrorDetails
          summary={intl.formatMessage({
            id: 'components.AdBudget.updateError',
            defaultMessage: 'Update error',
          })}
        >
          {error.message}
        </ErrorDetails>
      ) : null}
    </div>
  );
}

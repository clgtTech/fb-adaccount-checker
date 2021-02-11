import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { classNames, TextField, Button } from 'draft-components';
import { CurrencyAmount } from '../../stores/entities';
import { CURRENCY_SYMBOLS } from './currency-symbols';
import styles from './currency-amount-field.module.scss';

export interface CurrencyAmountFieldProps
  extends React.ComponentPropsWithoutRef<'div'> {
  value: CurrencyAmount;
  onCancel(): void;
  onSave(currencyAmount: CurrencyAmount): void;
}

export function CurrencyAmountField({
  value: currencyAmount,
  onCancel,
  onSave,
  className,
  ...props
}: CurrencyAmountFieldProps) {
  const [value, setValue] = React.useState('' + currencyAmount.offsettedAmount);

  const numericValue = +value;
  const isValid = Number.isFinite(numericValue) && numericValue > 0;

  React.useEffect(() => {
    setValue('' + currencyAmount.offsettedAmount);
  }, [currencyAmount]);

  return (
    <div {...props} className={classNames(className, styles.container)}>
      <TextField
        className={styles.input}
        trailingAddOn={
          CURRENCY_SYMBOLS[currencyAmount.currency] || currencyAmount.currency
        }
        isInvalid={!isValid}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <div className={styles.controls}>
        <Button size="xs" appearance="minimal" onClick={() => onCancel()}>
          <FormattedMessage
            id="components.CurrencyAmountField.cancelButton"
            defaultMessage="Cancel"
          />
        </Button>
        <Button
          className={styles.primaryControl}
          size="xs"
          appearance="secondary"
          onClick={() => {
            if (isValid) {
              onSave(
                CurrencyAmount.createFromOffsettedAmount(
                  numericValue,
                  currencyAmount.currency
                )
              );
            }
          }}
        >
          <FormattedMessage
            id="components.CurrencyAmountField.saveButton"
            defaultMessage="Save"
          />
        </Button>
      </div>
    </div>
  );
}

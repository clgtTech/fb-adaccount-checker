import * as React from 'react';
import { useIntl } from 'react-intl';
import { classNames, Select, Spinner } from 'draft-components';
import { DatePreset } from '../../types';
import { Messages } from '../../services/intl';
import styles from './date-preset-select.module.scss';

export interface DatePresetSelectProps
  extends React.ComponentPropsWithoutRef<'div'> {
  isDisabled?: boolean;
  isLoading?: boolean;
  allowedDatePresets: DatePreset[];
  datePreset: DatePreset;
  onDatePresetChange(datePreset: DatePreset): void;
}

export function DatePresetSelect({
  isDisabled,
  isLoading,
  allowedDatePresets,
  datePreset,
  onDatePresetChange,
  className,
  ...props
}: DatePresetSelectProps) {
  const intl = useIntl();
  return (
    <div {...props} className={classNames(className, styles.container)}>
      <Select
        className={styles.select}
        aria-label={intl.formatMessage({
          id: 'components.DatePresetSelect.ariaLabel',
          defaultMessage: `Insights period`,
        })}
        disabled={isDisabled || isLoading}
        value={datePreset}
        onChange={(event) => {
          onDatePresetChange(event.target.value as DatePreset);
        }}
      >
        {allowedDatePresets.map((datePreset) => (
          <option key={datePreset} value={datePreset}>
            {intl.formatMessage(Messages.Enums.DatePreset[datePreset])}
          </option>
        ))}
      </Select>
      {isLoading ? (
        <span className={styles.spinner} aria-hidden={true}>
          <Spinner size="1em" />
        </span>
      ) : null}
    </div>
  );
}

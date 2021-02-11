import * as React from 'react';
import { useIntl } from 'react-intl';
import { classNames, Spinner, Switch } from 'draft-components';
import { Status } from '../../types';
import { Formatters } from '../../services/intl';
import { ErrorDetails } from '../error-details';
import styles from './ad-object-status-switch.module.scss';

export interface AdObjectStatusSwitchProps
  extends React.ComponentPropsWithoutRef<'div'> {
  status: Status;
  onUpdate(status: Status): void;
  shouldShowStatus?: boolean;
  canUpdate?: boolean;
  isUpdating?: boolean;
  error?: Error | null;
}

export function AdObjectStatusSwitch({
  canUpdate,
  shouldShowStatus,
  status,
  isUpdating,
  error,
  onUpdate,
  className,
  ...props
}: AdObjectStatusSwitchProps) {
  const intl = useIntl();
  return (
    <div {...props} className={classNames(className, styles.container)}>
      <div className={styles.wrapper}>
        {isUpdating ? <Spinner className={styles.spinner} size={14} /> : null}
        {shouldShowStatus ? (
          <code className={styles.status}>
            {Formatters.formatEnumValue(status)}
          </code>
        ) : null}
        <Switch
          disabled={isUpdating || !canUpdate}
          checked={status === Status.ACTIVE}
          onChange={(event) => {
            onUpdate(event.target.checked ? Status.ACTIVE : Status.PAUSED);
          }}
        />
      </div>
      {error ? (
        <ErrorDetails
          className={styles.error}
          summary={intl.formatMessage({
            id: 'components.AdObjectStatusSwitch.updateError',
            defaultMessage: 'Update error',
          })}
        >
          {error.message}
        </ErrorDetails>
      ) : null}
    </div>
  );
}

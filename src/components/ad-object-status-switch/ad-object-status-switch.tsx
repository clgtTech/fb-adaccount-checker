import * as React from 'react';
import { useIntl } from 'react-intl';
import { classNames, Spinner, Switch } from 'draft-components';
import { AsyncActionStatus, Status } from '../../types';
import { Formatters } from '../../services/intl';
import { ErrorDetails } from '../error-details';
import styles from './ad-object-status-switch.module.scss';

export interface AdObjectStatusSwitchProps
  extends React.ComponentPropsWithoutRef<'div'> {
  canUpdate?: boolean;
  shouldShowStatus?: boolean;
  status: Status;
  updateStatus: AsyncActionStatus;
  updateError?: Error | null;
  onUpdate(status: Status): void;
}

export function AdObjectStatusSwitch({
  canUpdate,
  shouldShowStatus,
  status,
  updateStatus,
  updateError,
  onUpdate,
  className,
  ...props
}: AdObjectStatusSwitchProps) {
  const intl = useIntl();
  const isUpdating = updateStatus === AsyncActionStatus.pending;
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
      {updateError ? (
        <ErrorDetails
          className={styles.error}
          summary={intl.formatMessage({
            id: 'components.AdObjectStatusSwitch.updateError',
            defaultMessage: 'Update error',
          })}
        >
          {updateError.message}
        </ErrorDetails>
      ) : null}
    </div>
  );
}

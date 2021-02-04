import * as React from 'react';
import { classNames, Switch } from 'draft-components';
import { Status } from '../../types';
import { Formatters } from '../../services/intl';
import styles from './ad-object-status-switch.module.scss';

export interface AdObjectStatusSwitchProps
  extends React.ComponentPropsWithoutRef<'div'> {
  isDisabled?: boolean;
  status: Status;
  onStatusChange: (status: Status) => void;
}

export function AdObjectStatusSwitch({
  isDisabled,
  status,
  onStatusChange,
  className,
  ...props
}: AdObjectStatusSwitchProps) {
  return (
    <div {...props} className={classNames(className, styles.container)}>
      <i
        aria-hidden={true}
        className={classNames(styles.indicator, {
          [styles.indicator_active]: status === Status.ACTIVE,
          [styles.indicator_pause]: status === Status.PAUSE,
          [styles.indicator_delete]: status === Status.DELETE,
          [styles.indicator_archived]: status === Status.ARCHIVED,
        })}
      />
      <code className={styles.status}>
        {Formatters.formatEnumValue(status)}
      </code>
      <Switch
        className={styles.switch}
        disabled={isDisabled}
        checked={status === Status.ACTIVE}
        onChange={(event) => {
          onStatusChange(event.target.checked ? Status.ACTIVE : Status.PAUSE);
        }}
      />
    </div>
  );
}

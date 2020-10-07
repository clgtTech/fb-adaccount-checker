import React from 'react';
import classNames from 'classnames';
import styles from './toggle.module.css';

export type ToggleProps = {
  className?: string;
  label?: React.ReactNode;
  isDisabled?: boolean;
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
};

export function Toggle({
  className,
  label,
  isDisabled,
  isEnabled,
  onToggle,
}: ToggleProps) {
  return (
    <label className={classNames(className, styles.container)}>
      <input
        className={styles.input}
        type="checkbox"
        disabled={isDisabled}
        checked={isEnabled}
        onChange={(event) => {
          onToggle(event.currentTarget.checked);
        }}
      />
      <span aria-hidden="true" className={styles.check} />
      {label ? <div className={styles.label}>{label}</div> : null}
    </label>
  );
}

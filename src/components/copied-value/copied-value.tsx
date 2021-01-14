import * as React from 'react';
import { classNames, SvgIcon, Icons } from 'draft-components';
import { copyToClipboard } from '../../shared/util';
import styles from './copied-value.module.scss';

// prettier-ignore
export interface CopiedValueProps extends React.ComponentPropsWithoutRef<'span'> {
  value: string;
}

export function CopiedValue({
  value,
  className,
  children,
  onClick,
  ...props
}: CopiedValueProps) {
  return (
    <span
      {...props}
      className={classNames(className, styles.container)}
      onClick={(event) => {
        copyToClipboard(value);
        onClick?.(event);
      }}
    >
      {children || value}
      <SvgIcon className={styles.icon} icon={Icons.copyIcon} />
    </span>
  );
}

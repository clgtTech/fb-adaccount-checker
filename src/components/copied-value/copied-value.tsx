import * as React from 'react';
import { classNames } from 'draft-components';
import { copyToClipboard } from 'shared/util';
import { BoxIcon } from 'components/box-icon';
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
      className={classNames(className, styles.wrapper)}
      onClick={(event) => {
        copyToClipboard(value);
        onClick?.(event);
      }}
    >
      {children || value} <BoxIcon className={styles.icon} icon="copy" />
    </span>
  );
}

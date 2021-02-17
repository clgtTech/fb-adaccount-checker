import * as React from 'react';
import { classNames, SvgIcon, Icons } from 'draft-components';
import styles from './copied-value.module.scss';

export interface CopiedValueProps
  extends React.ComponentPropsWithoutRef<'span'> {
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
      <SvgIcon className={styles.icon} icon={Icons.copy} />
    </span>
  );
}

function copyToClipboard(value: string): void {
  const copyText = document.createElement('input');
  copyText.style.position = 'fixed';
  copyText.style.zIndex = '-999';
  copyText.style.opacity = '0';
  copyText.value = value;
  document.body.appendChild(copyText);
  copyText.select();
  document.execCommand('copy');
  document.body.removeChild(copyText);
}

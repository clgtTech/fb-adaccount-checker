import React from 'react';
import classNames from 'classnames';
import styles from './section-title.module.css';

export function SectionTitle({
  className,
  children,
  ...otherProps
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 {...otherProps} className={classNames(className, styles.text)}>
      {children}
    </h2>
  );
}

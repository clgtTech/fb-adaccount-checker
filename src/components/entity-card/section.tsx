import * as React from 'react';
import { classNames } from 'draft-components';
import styles from './section.module.scss';

export interface SectionProps
  extends React.ComponentPropsWithoutRef<'section'> {
  caption?: React.ReactNode;
}

export function Section({
  className,
  caption,
  children,
  ...props
}: SectionProps) {
  return (
    <section {...props} className={classNames(className, styles.container)}>
      {caption ? <h3 className={styles.caption}>{caption}</h3> : null}
      {children}
    </section>
  );
}

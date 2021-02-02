import * as React from 'react';
import { classNames } from 'draft-components';
import styles from './meta.module.scss';

export interface MetaItem {
  name: React.ReactNode;
  value: React.ReactNode;
}

export interface MetaProps extends React.ComponentPropsWithoutRef<'div'> {
  items: MetaItem[];
}

export function Meta({ items, className, ...props }: MetaProps) {
  return (
    <div {...props} className={classNames(className, styles.container)}>
      <dl className={styles.items}>
        {items.map((item, index) => (
          <div className={styles.item} key={index}>
            <dt className={styles.itemName}>{item.name}</dt>
            <dd className={styles.itemValue}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

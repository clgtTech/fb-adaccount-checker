import * as React from 'react';
import { classNames } from 'draft-components';
import styles from './object-meta.module.scss';

export interface ObjectMetaItem {
  name: React.ReactNode;
  value: React.ReactNode;
}

export interface ObjectMetaProps extends React.ComponentPropsWithoutRef<'div'> {
  items: ObjectMetaItem[];
}

export function ObjectMeta({ items, className, ...props }: ObjectMetaProps) {
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

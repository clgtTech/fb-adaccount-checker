import * as React from 'react';
import { classNames } from 'draft-components';
import styles from './insights.module.scss';

export interface InsightsItem {
  name: React.ReactNode;
  value: React.ReactNode;
}

export interface InsightsProps extends React.ComponentPropsWithoutRef<'div'> {
  rowsCount?: number;
  items: InsightsItem[];
}

export function Insights({
  rowsCount = 2,
  items,
  className,
  ...props
}: InsightsProps) {
  const columns = [];
  let i = 0;
  while (i < items.length) {
    const row = [];
    let j = 0;
    while (j < rowsCount) {
      const item = items[i++];
      row.push(
        <div className={styles.item} key={`item-${j++}`}>
          <dt className={styles.itemName}>{item.name}</dt>
          <dd className={styles.itemValue}>{item.value}</dd>
        </div>
      );
    }
    columns.push(
      <div className={styles.itemGroup} key={`item-group-${i}`}>
        {row}
      </div>
    );
  }

  return (
    <div {...props} className={classNames(className, styles.container)}>
      <dl className={styles.items}>{columns}</dl>
    </div>
  );
}

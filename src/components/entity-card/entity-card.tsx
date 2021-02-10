import * as React from 'react';
import { classNames } from 'draft-components';
import { Header } from './header';
import { Section } from './section';
import styles from './entity-card.module.scss';

export interface EntityCardProps
  extends React.ComponentPropsWithoutRef<'article'> {
  bottomBar?: React.ReactNode;
}

export function EntityCard({
  className,
  children,
  bottomBar,
  ...props
}: EntityCardProps) {
  return (
    <article {...props} className={classNames(className, styles.container)}>
      <div className={styles.body}>{children}</div>
      {bottomBar ? <div className={styles.bottomBar}>{bottomBar}</div> : null}
    </article>
  );
}

EntityCard.Header = Header;
EntityCard.Section = Section;

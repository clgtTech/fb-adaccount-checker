import * as React from 'react';
import { classNames } from 'draft-components';
import { Header } from './header';
import { Section } from './section';
import styles from './entity-card.module.scss';

export type EntityCardProps = React.ComponentPropsWithoutRef<'article'>;

export function EntityCard({ className, children, ...props }: EntityCardProps) {
  return (
    <article {...props} className={classNames(className, styles.container)}>
      {children}
    </article>
  );
}

EntityCard.Header = Header;
EntityCard.Section = Section;

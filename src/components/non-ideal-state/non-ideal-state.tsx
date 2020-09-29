import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './non-ideal-state.module.css';

export type NonIdealStateProps = {
  className?: string;
  icon?: IconDefinition;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

export function NonIdealState({
  className,
  icon,
  title,
  description,
  children,
}: NonIdealStateProps) {
  return (
    <div className={classNames(className, styles.container)}>
      {icon ? <FontAwesomeIcon className={styles.icon} icon={icon} /> : null}
      <h4 className={styles.title}>{title}</h4>
      {description ? (
        <div className={styles.description}>{description}</div>
      ) : null}
      {children ? <div className={styles.actions}>{children}</div> : null}
    </div>
  );
}

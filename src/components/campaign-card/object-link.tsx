import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'draft-components';
import styles from './object-link.module.scss';

export type ObjectLinkProps = LinkProps;

export function ObjectLink({ className, ...props }: ObjectLinkProps) {
  return <Link className={classNames(className, styles.link)} {...props} />;
}

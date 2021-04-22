import * as React from 'react';
import {
  classNames,
  NonIdealStateView,
  NonIdealStateViewProps,
} from 'draft-components';
import { createErrorPresenter } from '../../presenters/error-presenter';
import styles from './error-view.module.scss';

export interface ErrorViewProps extends React.ComponentPropsWithoutRef<'div'> {
  spacing?: NonIdealStateViewProps['spacing'];
  error: Error;
}

export function ErrorView({
  spacing,
  error,
  className,
  ...props
}: ErrorViewProps) {
  console.error(error);
  const errorPresenter = createErrorPresenter(error);
  return (
    <NonIdealStateView
      {...props}
      className={classNames(className, styles.wrapper)}
      spacing={spacing}
      icon="error"
      heading={errorPresenter.userTitle}
      description={errorPresenter.userMessage}
    />
  );
}

import * as React from 'react';
import {
  classNames,
  NonIdealStateView,
  NonIdealStateViewHtmlAttrs,
  NonIdealStateViewProps,
} from 'draft-components';
import { createErrorPresenter } from '../../presenters/error-presenter';
import styles from './error-view.module.scss';

export interface ErrorViewProps extends NonIdealStateViewHtmlAttrs {
  padY?: NonIdealStateViewProps['padY'];
  error: Error;
}

export function ErrorView({
  padY,
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
      padY={padY}
      icon="error"
      title={errorPresenter.userTitle}
      description={errorPresenter.userMessage}
    />
  );
}

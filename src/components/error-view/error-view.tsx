import * as React from 'react';
import {
  classNames,
  NonIdealStateView,
  NonIdealStateViewHtmlAttrs,
} from 'draft-components';
import { createErrorPresenter } from '../../presenters/error-presenter';
import styles from './error-view.module.scss';

export interface ErrorViewProps extends NonIdealStateViewHtmlAttrs {
  error: Error;
}

export function ErrorView({ error, className, ...props }: ErrorViewProps) {
  const errorPresenter = createErrorPresenter(error);
  return (
    <NonIdealStateView
      {...props}
      className={classNames(className, styles.wrapper)}
      icon="error"
      title={errorPresenter.userTitle}
      description={errorPresenter.userMessage}
    />
  );
}

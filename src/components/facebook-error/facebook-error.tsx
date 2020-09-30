import type { NonIdealStateProps } from 'components/non-ideal-state';
import React from 'react';
import { FbApiError } from 'api/facebook-api';
import { NonIdealState } from 'components/non-ideal-state';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

export type FacebookErrorProps = {
  className?: NonIdealStateProps['className'];
  error: FbApiError;
};

export function FacebookError({ className, error }: FacebookErrorProps) {
  let title = 'Facebook API недоступен';
  let description =
    'Возможно, произошла временная ошибка. Подождите немного и повторите попытку.';

  if (error.response?.data.error.type === 'OAuthException') {
    title = 'Токен доступа отозван или недействителен';
    description = 'Пожалуйста, получите и используйте новый токен доступа.';
  } else if (error.response?.data.error.error_user_title) {
    title = error.response?.data.error.error_user_title;
    description = error.response?.data.error.error_user_msg;
  }
  return (
    <NonIdealState
      className={className}
      icon={faExclamationCircle}
      title={title}
      description={description}
    />
  );
}

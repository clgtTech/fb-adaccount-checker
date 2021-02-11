import { ErrorPresenter } from '../../types';
import { FacebookApiError } from '../../services/facebook-api';
import { DefaultErrorPresenter } from './default-error-presenter';
import { FacebookApiErrorPresenter } from './facebook-api-error-presenter';

export function createErrorPresenter(error: Error): ErrorPresenter {
  if (isFacebookApiError(error)) {
    return new FacebookApiErrorPresenter(error);
  }

  return new DefaultErrorPresenter(error);
}

function isFacebookApiError(e: Error): e is FacebookApiError {
  return e.name === 'FacebookApiError';
}

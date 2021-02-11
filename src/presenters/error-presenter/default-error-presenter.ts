import { defineMessage } from 'react-intl';
import { ErrorPresenter } from '../../types';
import { IntlFactory } from '../../services/intl';

export class DefaultErrorPresenter implements ErrorPresenter {
  message: string;
  userTitle: string;
  userMessage: string;

  constructor(error: Error) {
    const intl = IntlFactory.getIntl();
    const { unknownError } = DefaultErrorPresenter.Messages;

    this.message = error.message || 'An unknown error occurred';
    this.userTitle = intl.formatMessage(unknownError.title);
    this.userMessage = intl.formatMessage(unknownError.message);
  }

  static Messages = {
    unknownError: {
      title: defineMessage({
        id: 'errors.unknownError.title',
        defaultMessage: `An unknown error occurred`,
      }),
      message: defineMessage({
        id: 'errors.unknownError.message',
        defaultMessage: `Possibly a temporary issue. Try to refresh the page, sometimes it helps 😉`,
      }),
    },
  };
}

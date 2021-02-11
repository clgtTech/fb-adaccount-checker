import { defineMessage } from 'react-intl';
import { ErrorPresenter } from '../../types';
import { IntlFactory } from '../../services/intl';
import { FacebookApiError } from '../../services/facebook-api';

export class FacebookApiErrorPresenter implements ErrorPresenter {
  message: string;
  userTitle: string;
  userMessage: string;

  constructor(facebookApiError: FacebookApiError) {
    const intl = IntlFactory.getIntl();
    const {
      unknownError,
      oAuthError,
      serverError,
    } = FacebookApiErrorPresenter.Messages;

    this.message =
      facebookApiError.message || 'An unknown error occurred during request';
    this.userTitle =
      facebookApiError.userTitle || intl.formatMessage(unknownError.title);
    this.userMessage =
      facebookApiError.userMessage || intl.formatMessage(unknownError.message);

    if (facebookApiError.code === 190) {
      this.userTitle = intl.formatMessage(oAuthError.title);
      this.userMessage = intl.formatMessage(oAuthError.message);
    } else if (
      facebookApiError.httpStatus &&
      facebookApiError.httpStatus > 500
    ) {
      this.userTitle = intl.formatMessage(serverError.title);
      this.userMessage = intl.formatMessage(serverError.message);
    }
  }

  static Messages = {
    unknownError: {
      title: defineMessage({
        id: 'apiErrors.unknownError.title',
        defaultMessage: `An unknown error occurred during the request`,
      }),
      message: defineMessage({
        id: 'apiErrors.unknownError.message',
        defaultMessage: `Possibly a temporary issue. Wait a bit and retry the latest action again.`,
      }),
    },
    serverError: {
      title: defineMessage({
        id: 'apiErrors.serverError.title',
        defaultMessage: `Facebook API is unavailable or can not handle the request`,
      }),
      message: defineMessage({
        id: 'apiErrors.serverError.message',
        defaultMessage: `Something went wrong on Facebook's end. Wait a bit and retry the latest action again.`,
      }),
    },
    oAuthError: {
      title: defineMessage({
        id: 'apiErrors.oauthError.title',
        defaultMessage: `Access Token has expired, been revoked, or is invalid`,
      }),
      message: defineMessage({
        id: 'apiErrors.oauthError.message',
        defaultMessage: `Try to get a new access token.`,
      }),
    },
  };
}

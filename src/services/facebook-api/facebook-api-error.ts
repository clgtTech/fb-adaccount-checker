import { AxiosError } from 'axios';

/**
 * @see https://developers.facebook.com/docs/graph-api/using-graph-api/error-handling
 */
interface FacebookErrorResponse {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    error_user_title?: string;
    error_user_msg?: string;
    fbtrace_id: string;
  };
}

export class FacebookApiError extends Error {
  name = 'FacebookApiError';

  constructor(
    public message: string,
    public code: number,
    public httpStatus?: number,
    public userTitle?: string,
    public userMessage?: string
  ) {
    super(message);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, FacebookApiError);
    }
  }

  static createFromAxiosError(error: Error | AxiosError): FacebookApiError {
    let message: FacebookApiError['message'] = error.message;
    let code: FacebookApiError['code'] = 1;
    let userTitle: FacebookApiError['userTitle'];
    let userMessage: FacebookApiError['userMessage'];
    let httpStatus: FacebookApiError['httpStatus'];

    if (isAxiosError(error)) {
      if (error.response) {
        const errorResponse = error.response.data.error;
        message = errorResponse.message;
        code = errorResponse.code;
        userTitle = errorResponse.error_user_title;
        userMessage = errorResponse.error_user_msg;
        httpStatus = error.response.status;
      } else if (error.request) {
        httpStatus = 500;
      }
    }

    return new FacebookApiError(
      message,
      code,
      httpStatus,
      userTitle,
      userMessage
    );
  }

  toJSON() {
    return {
      name: this.name,
      stack:
        typeof this.stack === 'string'
          ? this.stack.split('\n').map((l) => l.trim())
          : [],
      message: this.message,
      code: this.code,
      httpStatus: this.httpStatus,
      userTitle: this.userTitle,
      userMessage: this.userMessage,
    };
  }
}

function isAxiosError(e: unknown): e is AxiosError<FacebookErrorResponse> {
  return e instanceof Error && 'isAxiosError' in e;
}

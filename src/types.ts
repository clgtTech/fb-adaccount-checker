export enum Locale {
  ruRU = 'ru-RU',
  enUS = 'en-US',
}

export enum AsyncActionStatus {
  idle = 'idle',
  pending = 'pending',
  error = 'error',
  success = 'success',
}

export interface ErrorPresenter {
  message: string;
  userTitle: string;
  userMessage: string;
}

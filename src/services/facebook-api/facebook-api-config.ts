import { Locale } from '../../types';
import { ApiConfig } from '../../stores/session-store';

class FacebookApiConfig implements ApiConfig {
  private _locale: string = '';
  private _accessToken: string = '';
  private _pageAccessTokens: Map<string, string> = new Map();

  get accessToken(): string {
    return this._accessToken;
  }

  get pageAccessTokens(): Map<string, string> {
    return this._pageAccessTokens;
  }

  get locale(): string {
    return this._locale;
  }

  setAccessToken(accessToken: string): void {
    this._accessToken = accessToken;
  }

  setPageAccessTokens(pageAccessTokens: Map<string, string>): void {
    this._pageAccessTokens = pageAccessTokens;
  }

  setLocale(locale: Locale): void {
    this._locale = locale.replace('-', '_');
  }
}

export const facebookApiConfig = new FacebookApiConfig();

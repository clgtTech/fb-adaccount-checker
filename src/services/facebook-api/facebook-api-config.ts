import { Locale } from '../../types';
import { ApiConfig } from '../../stores/session-store';

class FacebookApiConfig implements ApiConfig {
  private _locale = '';
  private _accessToken = '';
  private _pageAccessTokens = new Map<string, string>();

  get locale() {
    return this._locale;
  }

  get accessToken() {
    return this._accessToken;
  }

  get pageAccessTokens() {
    return this._pageAccessTokens;
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

  getPageAccessToken(pageId: string): string | undefined {
    return this.pageAccessTokens.get(pageId);
  }

  reset() {
    this._locale = '';
    this._accessToken = '';
    this._pageAccessTokens = new Map();
  }
}

export const facebookApiConfig = new FacebookApiConfig();

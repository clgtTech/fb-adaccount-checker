import * as React from 'react';
import { RawIntlProvider } from 'react-intl';
import { IntlFactory } from '../../services/intl';

export interface WrapperProps {
  children?: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  return (
    <RawIntlProvider value={IntlFactory.getIntl()}>{children}</RawIntlProvider>
  );
}

import * as React from 'react';
import { uiStore } from '../../stores';

export function useBorderedHeader(isBordered: boolean = true): void {
  React.useEffect(() => {
    if (isBordered) {
      uiStore.addBorderToHeader();
    } else {
      uiStore.removeHeaderBorder();
    }
  }, [isBordered]);
}

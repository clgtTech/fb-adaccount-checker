import * as React from 'react';
import { CopiedValue } from '../copied-value';
import inspect from './images/inspect.png';
import console from './images/console.png';

export const defaultSteps = [
  {
    imgSource: inspect,
    imgAltText:
      'Контекстное меню в браузере c выделенным пунктом "Посмотреть код"',
    content: (
      <>
        На странице{' '}
        <a
          href="https://facebook.com/adsmanager"
          target="_blank"
          rel="noreferrer noopener"
        >
          Facebook Ads Manager
        </a>{' '}
        откройте инструменты разработчика: щелкните правой кнопкой мыши на
        странице и выберите "Посмотреть код", или нажмите <kbd>Command ⌘</kbd> +{' '}
        <kbd>Option ⌥</kbd> + <kbd>C</kbd> (Mac) или <kbd>Control</kbd> +{' '}
        <kbd>Shift ⇧</kbd> + <kbd>C</kbd> (Windows, Linux).
      </>
    ),
  },
  {
    imgSource: console,
    imgAltText: 'Консоль в браузере',
    content: (
      <>
        Во вкладке Console выполните следующий код для отображения токена{' '}
        <code>
          <CopiedValue value="window.__accessToken" />
        </code>
      </>
    ),
  },
];

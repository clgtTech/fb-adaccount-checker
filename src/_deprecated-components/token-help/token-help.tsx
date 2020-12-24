import React from 'react';
import classNames from 'classnames';
import { copyToClipboard } from 'shared/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import styles from './token-help.module.css';

export function TokenHelp({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDetailsElement>) {
  return (
    <details
      {...otherProps}
      className={classNames(className, styles.container)}
    >
      <summary className={styles.summary}>
        <FontAwesomeIcon icon={faInfoCircle} />
        Как получить токен?
      </summary>
      <ol>
        <li>
          На странице{' '}
          <a href="https://www.facebook.com/adsmanager">Facebook Ads Manager</a>{' '}
          откройте инструменты разработчика:
          <ul>
            <li>
              Windows: <kbd>CTRL</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>
            </li>
            <li>
              macOS: <kbd>Cmd ⌘</kbd> + <kbd>Alt ⌥</kbd> + <kbd>I</kbd>
            </li>
          </ul>
        </li>
        <li>
          Выполните в консоле следующий код для отображения токена:
          <pre
            className={styles.codeSnippet}
            onClick={() => {
              copyToClipboard('window.__accessToken');
            }}
          >
            <code>
              <span>window</span>.__accessToken
            </code>
          </pre>
        </li>
      </ol>
    </details>
  );
}

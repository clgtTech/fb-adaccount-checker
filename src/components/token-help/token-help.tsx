import React from 'react';
import classNames from 'classnames';
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
              Windows: <kbd>CTRL</kbd> + <kbd>Alt</kbd> + <kbd>I</kbd>
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
              <span style={{ color: '#6b46c1' }}>window</span>.__accessToken
            </code>
          </pre>
        </li>
      </ol>
    </details>
  );
}

export function copyToClipboard(value: string): void {
  const copyText = document.createElement('input');
  copyText.style.position = 'fixed';
  copyText.style.zIndex = '-999';
  copyText.style.opacity = '0';
  copyText.value = value;
  document.body.appendChild(copyText);
  copyText.select();
  document.execCommand('copy');
  document.body.removeChild(copyText);
}

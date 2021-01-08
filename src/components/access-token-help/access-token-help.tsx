import * as React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { classNames } from 'draft-components';
import { CopiedValue } from '../copied-value';
import inspect from './images/inspect.png';
import console from './images/console.png';
import styles from './access-token-help.module.scss';

export type HelpViewerHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'section'>,
  'title'
>;

export interface HelpStep {
  imgSource: string;
  imgAltText: string;
  content: React.ReactNode;
}

export interface AccessTokenHelpProps extends HelpViewerHtmlAttrs {
  title?: React.ReactNode;
  steps?: HelpStep[];
}

export function AccessTokenHelp({
  title,
  steps,
  className,
  ...props
}: AccessTokenHelpProps) {
  const intl = useIntl();
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);

  steps = steps ?? getSteps(intl);

  return (
    <section {...props} className={classNames(className, styles.layout)}>
      <div className={styles.leftColumn}>
        <h1 className={styles.title}>
          {title ?? (
            <FormattedMessage
              id="components.AccessTokenHelp.title"
              defaultMessage="How to get the Access Token?"
            />
          )}
        </h1>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li
              key={index}
              onMouseOver={() => {
                setActiveStepIndex(index);
              }}
            >
              {step.content}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.images}>
          {steps.map((step, index) => (
            <img
              key={index}
              className={classNames(styles.image, {
                [styles.image_active]: activeStepIndex === index,
              })}
              src={step.imgSource}
              alt={step.imgAltText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function getSteps(intl: IntlShape): HelpStep[] {
  return [
    {
      imgSource: inspect,
      imgAltText: intl.formatMessage({
        id: 'components.AccessTokenHelp.step1.imgAltText',
        defaultMessage: `Context menu in a browser with selected "Inspect" item`,
      }),
      content: intl.formatMessage(
        {
          id: 'components.AccessTokenHelp.step1.content',
          defaultMessage: `Open Dev Tools on <link>Facebook Ads Manager</link> page: right-click on the page and select <strong>Inspect</strong>. Or press <kbd>Command ⌘</kbd> + <kbd>Option ⌥</kbd> + <kbd>C</kbd> (Mac) or <kbd>Control</kbd> + <kbd>Shift ⇧</kbd> + <kbd>C</kbd> (Windows, Linux).`,
        },
        {
          link: (chunks: React.ReactNode) => (
            <a
              href="https://facebook.com/adsmanager"
              target="_blank"
              rel="noreferrer noopener"
            >
              {chunks}
            </a>
          ),
          strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
          kbd: (chunks: React.ReactNode) => <kbd>{chunks}</kbd>,
        }
      ),
    },
    {
      imgSource: console,
      imgAltText: intl.formatMessage({
        id: 'components.AccessTokenHelp.step2.imgAltText',
        defaultMessage: `Browser Console panel`,
      }),
      content: intl.formatMessage(
        {
          id: 'components.AccessTokenHelp.step2.content',
          defaultMessage: `Jump into the <strong>Console</strong> panel and execute the following {snippet} code to displaying the Access Token.`,
        },
        {
          strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
          snippet: (
            <code>
              <CopiedValue value="window.__accessToken" />
            </code>
          ),
        }
      ),
    },
  ];
}

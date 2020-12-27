import * as React from 'react';
import { classNames } from 'draft-components';
import { defaultSteps } from './default-steps';
import styles from './access-token-help.module.scss';

export type HelpViewerHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'section'>,
  'title'
>;

export interface HelpViewerStep {
  imgSource: string;
  imgAltText: string;
  content: React.ReactNode;
}

export interface HelpViewerProps extends HelpViewerHtmlAttrs {
  title?: React.ReactNode;
  steps?: HelpViewerStep[];
}

export function AccessTokenHelp({
  title = 'Как получить токен доступа?',
  steps = defaultSteps,
  className,
  ...props
}: HelpViewerProps) {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);

  return (
    <section {...props} className={classNames(className, styles.layout)}>
      <div className={styles.leftColumn}>
        {title ? <h1 className={styles.title}>{title}</h1> : null}
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

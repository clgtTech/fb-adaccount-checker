import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { classNames } from 'draft-components';
import { CreativePreview } from '../../presenters/ad-presenter';
import styles from './ad-creative-preview.module.scss';

export interface AdCreativePreviewProps
  extends React.ComponentPropsWithoutRef<'div'> {
  item: CreativePreview;
}

export function AdCreativePreview({
  className,
  item,
  ...props
}: AdCreativePreviewProps) {
  function renderDescription(description: string): React.ReactNode {
    return description.split('\n').map((line, key) => (
      <React.Fragment key={key}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  return (
    <div {...props} className={classNames(className, styles.container)}>
      <a
        className={styles.link}
        href={item.postLink}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          className={styles.thumbnail}
          src={item.thumbnailUrl}
          width={80}
          height={80}
          alt={item.title}
        />
      </a>
      <div className={styles.content}>
        {styles.title ? <div className={styles.title}>{item.title}</div> : null}
        {item.description ? (
          <details className={styles.details}>
            <summary>
              <FormattedMessage
                id="components.AdCreativePreview.summary"
                defaultMessage="Show Ad text"
              />
            </summary>
            <div className={styles.description}>
              {renderDescription(item.description)}
            </div>
          </details>
        ) : null}
      </div>
    </div>
  );
}

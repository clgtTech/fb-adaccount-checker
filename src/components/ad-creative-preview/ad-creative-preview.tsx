import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { classNames } from 'draft-components';
import { CreativePreview } from '../../presenters/ad-presenter';
import styles from './ad-creative-preview.module.scss';

export interface AdCreativePreviewProps
  extends React.ComponentPropsWithoutRef<'div'> {
  creative: CreativePreview;
}

export function AdCreativePreview({
  className,
  creative,
  ...props
}: AdCreativePreviewProps) {
  return (
    <div {...props} className={classNames(className, styles.container)}>
      {(function renderThumbnail() {
        const image = (
          <img
            src={creative.thumbnailUrl}
            width={64}
            height={64}
            alt={creative.title}
          />
        );

        return creative.pagePostLink ? (
          <a
            className={styles.thumbnail}
            href={creative.pagePostLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            {image}
          </a>
        ) : (
          <div className={styles.thumbnail}>{image}</div>
        );
      })()}

      <div className={styles.content}>
        {creative.title ? (
          <div className={styles.title}>{creative.title}</div>
        ) : null}

        {creative.description ? (
          <details className={styles.details}>
            <summary>
              <FormattedMessage
                id="components.AdCreativePreview.summary"
                defaultMessage="Show Ad text"
              />
            </summary>
            <div className={styles.description}>
              {creative.description.split('\n').map((line, key) => (
                <React.Fragment key={key}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </details>
        ) : null}
      </div>
    </div>
  );
}

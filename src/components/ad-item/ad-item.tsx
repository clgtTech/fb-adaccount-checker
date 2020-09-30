import type { Ad } from 'common-types';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import classNames from 'classnames';
import styles from './ad-item.module.css';

export type AdItemProps = {
  className?: string;
  ad: Ad;
};

export function AdItem({ className, ad }: AdItemProps) {
  return (
    <article className={classNames(className, styles.container)}>
      <div className={styles.layout}>
        <img
          className={styles.thumbnail}
          src={ad.creativeThumbnailUrl}
          alt={ad.name}
          width={64}
          height={64}
        />
        <div className={styles.contents}>
          <h3 className={styles.name}>{ad.name}</h3>
          <code className={styles.effectiveStatus}>
            {ad.effectiveStatus}{' '}
            {ad.deliveryStatus ? `(${ad.deliveryStatus})` : null}
          </code>
        </div>
      </div>

      {isEmpty(ad.reviewFeedback) ? null : (
        <div className={styles.reviewFeedback}>
          <a
            href="https://developers.facebook.com/docs/marketing-api/adgroup/feedback"
            rel="noopener noreferrer"
            target="_blank"
          >
            Результаты проверки рекламы
          </a>
          <dl className={styles.feedbacks}>
            {Object.entries(ad.reviewFeedback).map(([key, value], index) => (
              <React.Fragment key={index}>
                <dt>{key}</dt>
                <dd>
                  {parseReviewFeedback(value)
                    .split('\n')
                    .map((line, index) => (
                      <div key={index}>
                        {line.endsWith('.') ? line : `${line}.`}
                      </div>
                    ))}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      )}
    </article>
  );
}

function parseReviewFeedback(feedback: string): string {
  return feedback
    .replace(/([a-zа-я])([A-ZА-Я])/g, '$1\n$2')
    .replace(/([a-zа-я]\.)([a-zа-я])/gi, '$1\n$2');
}

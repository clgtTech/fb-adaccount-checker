import type { Ad, AdAccount } from 'common-types';
import type { UpdateAdParams } from 'api/facebook-api';
import React from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { AccountStatus, AdStatus } from 'enums';
import { formatMonetaryValue, formatNumber } from 'shared/formatters';
import { Toggle } from 'components/toggle';
import { InlineEdit } from 'components/inline-edit';
import styles from './ad-item.module.css';
import imagePlaceholder from './image-placeholder.png';

export type AdItemProps = {
  className?: string;
  adAccount: AdAccount;
  ad: Ad;
  onAdUpdate: (update: UpdateAdParams['update']) => void;
};

export function AdItem({ className, ad, adAccount, onAdUpdate }: AdItemProps) {
  return (
    <article className={classNames(className, styles.container)}>
      <div className={styles.layout}>
        <img
          className={classNames(styles.thumbnail, {
            [styles.thumbnail_withBorder]: !ad.creativeThumbnailUrl,
          })}
          src={ad.creativeThumbnailUrl || imagePlaceholder}
          alt={ad.name}
          width={64}
          height={64}
        />
        <div className={styles.contents}>
          <div className={styles.contentsHeader}>
            <Toggle
              className={styles.toggle}
              isDisabled={
                (adAccount.status !== AccountStatus.ACTIVE &&
                  adAccount.status !== AccountStatus.ANY_ACTIVE) ||
                ad.status === AdStatus.DELETED ||
                ad.status === AdStatus.ARCHIVED
              }
              isEnabled={ad.status === AdStatus.ACTIVE}
              onToggle={(isEnabled) => {
                onAdUpdate({
                  status: isEnabled ? AdStatus.ACTIVE : AdStatus.PAUSED,
                });
              }}
            />

            <InlineEdit
              initialValue={ad.name}
              onValueChange={(name) => onAdUpdate({ name })}
            >
              <h3 className={styles.name}>{ad.name}</h3>
            </InlineEdit>
          </div>

          {ad.creativeBody && <p className={styles.body}>{ad.creativeBody}</p>}

          <p className={styles.id}>ID: {ad.id}</p>

          <code className={styles.effectiveStatus}>
            {ad.effectiveStatus}&nbsp;
            {ad.deliveryStatus ? `(${ad.deliveryStatus})` : null}
          </code>

          {ad.stats ? (
            <dl className={styles.stats}>
              <div className={styles.statsGroup}>
                <dt className={styles.statsLabel}>{ad.stats.action}</dt>
                <dd className={styles.stateValue}>
                  {formatNumber(ad.stats.results)}
                </dd>
              </div>

              <div className={styles.statsGroup}>
                <dt className={styles.statsLabel}>Цена за результат</dt>
                <dd className={styles.stateValue}>
                  {formatMonetaryValue(
                    ad.stats.costPerResult,
                    adAccount.currency
                  )}
                </dd>
              </div>

              <div className={styles.statsGroup}>
                <dt className={styles.statsLabel}>Спенд</dt>
                <dd className={styles.stateValue}>
                  {formatMonetaryValue(ad.spend, adAccount.currency)}
                </dd>
              </div>
            </dl>
          ) : null}
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

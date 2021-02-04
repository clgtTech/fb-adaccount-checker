import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AdAccount, Ad } from '../../stores/entities';
import { AdPresenter } from '../../presenters/ad-presenter';
import { Messages } from '../../services/intl';
import { EntityCard, EntityCardProps } from '../entity-card';
import { ObjectName } from '../object-name';
import { ObjectMeta } from '../object-meta';
import { AdObjectStatusSwitch } from '../ad-object-status-switch';
import { AdCreativePreview } from '../ad-creative-preview';
import { Insights } from '../campaign-card';
import { ReviewFeedback } from './review-feedback';
import styles from './ad-card.module.scss';

export interface AdsetCardProps extends EntityCardProps {
  adAccount: AdAccount;
  ad: Ad;
}

export function AdCard({ adAccount, ad, ...props }: AdsetCardProps) {
  const intl = useIntl();
  const adPresenter = new AdPresenter(ad, adAccount);

  return (
    <EntityCard {...props}>
      <EntityCard.Header
        description={
          <ObjectMeta
            items={[
              {
                name: intl.formatMessage(Messages.Ad.deliveryStatus),
                value: (
                  <code>
                    {adPresenter.effectiveStatus}
                    {adPresenter.deliveryStatus ? (
                      <span> ({adPresenter.deliveryStatus})</span>
                    ) : null}
                  </code>
                ),
              },
            ]}
          />
        }
      >
        <ObjectName objectId={adPresenter.id}>{adPresenter.name}</ObjectName>
        <AdObjectStatusSwitch status={ad.status} onStatusChange={console.log} />
      </EntityCard.Header>

      {adPresenter.creativePreview ? (
        <EntityCard.Section caption={intl.formatMessage(Messages.Ad.creative)}>
          <AdCreativePreview item={adPresenter.creativePreview} />
        </EntityCard.Section>
      ) : null}

      {adPresenter.insights ? (
        <EntityCard.Section caption={intl.formatMessage(Messages.Ad.insights)}>
          <Insights insights={adPresenter.insights} />
        </EntityCard.Section>
      ) : null}

      {adPresenter.disapprovalReasons ? (
        <EntityCard.Section
          caption={
            <a
              className={styles.externalLink}
              href="https://developers.facebook.com/docs/marketing-api/adgroup/feedback"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FormattedMessage {...Messages.Ad.reviewFeedback} />
            </a>
          }
        >
          <ReviewFeedback disapprovalReasons={adPresenter.disapprovalReasons} />
        </EntityCard.Section>
      ) : null}
    </EntityCard>
  );
}

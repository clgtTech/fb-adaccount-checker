import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage, useIntl } from 'react-intl';
import { Ad, AdAccount } from '../../stores/entities';
import { AdPresenter } from '../../presenters/ad-presenter';
import { Messages } from '../../services/intl';
import { EntityCard, EntityCardProps } from '../entity-card';
import { ObjectName } from '../object-name';
import { ObjectMeta } from '../object-meta';
import { AdObjectStatusSwitch } from '../ad-object-status-switch';
import { AdCreativePreview } from '../ad-creative-preview';
import { Insights } from '../campaign-card';
import { ReviewFeedback } from './review-feedback';
import { CommentsPlugin } from '../comments-plugin';
import styles from './ad-card.module.scss';

export interface AdsetCardProps extends EntityCardProps {
  adAccount: AdAccount;
  ad: Ad;
}

export const AdCard = mobxReact.observer(function AdCard({
  adAccount,
  ad,
  ...props
}: AdsetCardProps) {
  const intl = useIntl();
  const adPresenter = new AdPresenter(ad, adAccount);

  return (
    <EntityCard {...props} bottomBar={<CommentsPlugin ad={ad} />}>
      <EntityCard.Header
        description={
          <ObjectMeta
            items={[
              {
                name: intl.formatMessage(Messages.Ad.effectiveStatus),
                value: (
                  <span>
                    {adPresenter.effectiveStatus}
                    {adPresenter.deliveryStatus ? (
                      <span> ({adPresenter.deliveryStatus})</span>
                    ) : null}
                  </span>
                ),
              },
            ]}
          />
        }
      >
        <ObjectName objectId={adPresenter.id}>{adPresenter.name}</ObjectName>
        <AdObjectStatusSwitch
          canUpdate={ad.canUpdate(adAccount)}
          status={ad.status}
          isUpdating={ad.isStatusUpdating}
          error={ad.statusUpdateError}
          onUpdate={(status) => ad.updateStatus(status)}
        />
      </EntityCard.Header>

      {adPresenter.creativePreview ? (
        <EntityCard.Section caption={intl.formatMessage(Messages.Ad.creative)}>
          <AdCreativePreview creative={adPresenter.creativePreview} />
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
              className={styles.textLink}
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
});

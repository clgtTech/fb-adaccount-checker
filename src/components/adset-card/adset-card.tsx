import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { AdAccount, Adset } from '../../stores/entities';
import { AdsetPresenter } from '../../presenters/adset-presenter';
import { Messages } from '../../services/intl';
import { EntityCard, EntityCardProps } from '../entity-card';
import { ObjectName } from '../object-name';
import { ObjectMeta } from '../object-meta';
import { DeliveryStatusInfo } from '../delivery-status-info';
import { ObjectLink } from '../object-link';
import { AdObjectStatusSwitch } from '../ad-object-status-switch';
import { AdBudget } from '../ad-budget';
import { InsightsInfo } from '../insights-info';

export interface AdsetCardProps extends EntityCardProps {
  adAccount: AdAccount;
  adset: Adset;
  adsUrl: string;
}

export const AdsetCard = mobxReact.observer(function AdsetCard({
  adAccount,
  adset,
  adsUrl,
  ...props
}: AdsetCardProps) {
  const intl = useIntl();
  const adsetPresenter = new AdsetPresenter(adset, adAccount);

  const history = useHistory();
  const onAdsLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    event.preventDefault();
    history.push(event.currentTarget.getAttribute('href') || '');
  };

  return (
    <EntityCard {...props}>
      <EntityCard.Header
        description={
          <ObjectMeta
            items={[
              {
                name: intl.formatMessage(Messages.Adset.deliveryStatus),
                value: (
                  <DeliveryStatusInfo
                    deliveryStatusPresenter={adsetPresenter.deliveryStatus}
                  />
                ),
              },
            ]}
          />
        }
      >
        <ObjectName objectId={adsetPresenter.id}>
          {adsetPresenter.name}
        </ObjectName>
        <AdObjectStatusSwitch
          canUpdate={adset.canUpdate(adAccount)}
          status={adset.status}
          isUpdating={adset.isStatusUpdating}
          error={adset.statusUpdateError}
          onUpdate={(status) => adset.updateStatus(status)}
        />
      </EntityCard.Header>

      <EntityCard.Section caption={intl.formatMessage(Messages.Adset.budget)}>
        <AdBudget
          fallbackMessage={intl.formatMessage(Messages.Adset.campaignBudget)}
          bidStrategy={adsetPresenter.bidStrategy}
          dailyBudget={adset.dailyBudget}
          lifetimeBudget={adset.lifetimeBudget}
          canUpdate={adset.canUpdate(adAccount)}
          isUpdating={adset.isBudgetUpdating}
          error={adset.budgetUpdateError}
          onUpdate={(update) => adset.updateBudget(update)}
        />
      </EntityCard.Section>

      {adsetPresenter.insights ? (
        <EntityCard.Section
          caption={intl.formatMessage(Messages.Adset.insights)}
        >
          <InsightsInfo insightsPresenter={adsetPresenter.insights} />
        </EntityCard.Section>
      ) : null}

      <ObjectLink href={adsUrl} onClick={onAdsLinkClick}>
        <FormattedMessage
          tagName="span"
          id="components.AdsetCard.linkToAds"
          defaultMessage="View Ads"
        />
        <span>&rarr;</span>
      </ObjectLink>
    </EntityCard>
  );
});

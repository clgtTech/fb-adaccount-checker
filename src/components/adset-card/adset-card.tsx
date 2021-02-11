import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { AdAccount, Adset } from '../../stores/entities';
import { AdsetPresenter } from '../../presenters/adset-presenter';
import { Messages } from '../../services/intl';
import { EntityCard, EntityCardProps } from '../entity-card';
import { ObjectName } from '../object-name';
import { ObjectLink } from '../object-link';
import { AdObjectStatusSwitch } from '../ad-object-status-switch';
import { AdBudget } from '../ad-budget';
import { Insights } from '../campaign-card';

export interface AdsetCardProps extends EntityCardProps {
  adAccount: AdAccount;
  adset: Adset;
  getLinkToAds(adsetId: Adset['id']): string;
}

export const AdsetCard = mobxReact.observer(function AdsetCard({
  adAccount,
  adset,
  getLinkToAds,
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
      <EntityCard.Header>
        <ObjectName objectId={adsetPresenter.id}>
          {adsetPresenter.name}
        </ObjectName>
        <AdObjectStatusSwitch
          canUpdate={adset.canUpdate(adAccount)}
          status={adset.status}
          updateStatus={adset.updateStatusOfStatus}
          updateError={adset.updateErrorOfStatus}
          onUpdate={(status) => adset.updateStatus(status)}
        />
      </EntityCard.Header>

      <EntityCard.Section caption={intl.formatMessage(Messages.Adset.budget)}>
        <AdBudget
          bidStrategy={adsetPresenter.bidStrategy}
          lifetimeBudget={adsetPresenter.lifetimeBudget}
          dailyBudget={adsetPresenter.dailyBudget}
          fallbackMessage={intl.formatMessage(Messages.Adset.campaignBudget)}
        />
      </EntityCard.Section>

      {adsetPresenter.insights ? (
        <EntityCard.Section
          caption={intl.formatMessage(Messages.Adset.insights)}
        >
          <Insights insights={adsetPresenter.insights} />
        </EntityCard.Section>
      ) : null}

      <ObjectLink href={getLinkToAds(adset.id)} onClick={onAdsLinkClick}>
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

import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { AdAccount, Campaign } from '../../stores/entities';
import { CampaignPresenter } from '../../presenters/campaign-presenter';
import { Messages } from '../../services/intl';
import { EntityCard, EntityCardProps } from '../entity-card';
import { ObjectName } from '../object-name';
import { ObjectMeta } from '../object-meta';
import { ObjectLink } from '../object-link';
import { AdObjectStatusSwitch } from '../ad-object-status-switch';
import { AdBudget } from '../ad-budget';
import { Insights } from './insights';

export interface CampaignCardProps extends EntityCardProps {
  adAccount: AdAccount;
  campaign: Campaign;
  getLinkToAdsets(campaignId: Campaign['id']): string;
}

export function CampaignCard({
  adAccount,
  campaign,
  getLinkToAdsets,
  ...props
}: CampaignCardProps) {
  const intl = useIntl();
  const campaignPresenter = new CampaignPresenter(campaign, adAccount);

  const history = useHistory();
  const onAdsetsLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (
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
                name: intl.formatMessage(Messages.Campaign.objective),
                value: campaignPresenter.objective,
              },
              {
                name: intl.formatMessage(Messages.Campaign.buyingType),
                value: campaignPresenter.buyingType,
              },
            ]}
          />
        }
      >
        <ObjectName objectId={campaignPresenter.id}>
          {campaignPresenter.name}
        </ObjectName>
        <AdObjectStatusSwitch
          status={campaign.status}
          onStatusChange={console.log}
        />
      </EntityCard.Header>

      <EntityCard.Section
        caption={intl.formatMessage(Messages.Campaign.budget)}
      >
        <AdBudget
          bidStrategy={campaignPresenter.bidStrategy}
          lifetimeBudget={campaignPresenter.lifetimeBudget}
          dailyBudget={campaignPresenter.dailyBudget}
          fallbackMessage={intl.formatMessage(Messages.Campaign.adsetBudget)}
        />
      </EntityCard.Section>

      {campaignPresenter.insights ? (
        <EntityCard.Section
          caption={intl.formatMessage(Messages.Campaign.insights)}
        >
          <Insights insights={campaignPresenter.insights} />
        </EntityCard.Section>
      ) : null}

      <ObjectLink
        href={getLinkToAdsets(campaign.id)}
        onClick={onAdsetsLinkClick}
      >
        <FormattedMessage
          tagName="span"
          id="components.CampaignCard.linkToAdsets"
          defaultMessage="View Ad sets"
        />
        <span>&rarr;</span>
      </ObjectLink>
    </EntityCard>
  );
}

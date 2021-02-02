import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AdAccount } from '../../stores/ad-account-store';
import { Campaign } from '../../stores/campaign-store';
import { CampaignPresenter } from '../../presenters/campaign-presenter';
import { Messages } from '../../services/intl';
import { EntityCard, EntityCardProps } from '../entity-card';
import { ObjectName } from './object-name';
import { StatusSwitch } from './status-switch';
import { Meta } from './meta';
import { Budget } from './budget';
import { Insights } from './insights';
import { ObjectLink } from './object-link';

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

  return (
    <EntityCard {...props}>
      <EntityCard.Header
        description={
          <Meta
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
        <StatusSwitch status={campaign.status} onStatusChange={console.log} />
      </EntityCard.Header>

      <EntityCard.Section
        caption={intl.formatMessage(Messages.Campaign.budget)}
      >
        <Budget
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
          <Insights
            items={[
              {
                name: campaignPresenter.insights.actionType,
                value: campaignPresenter.insights.actionTypeResult,
              },
              {
                name: intl.formatMessage(Messages.Insights.costPerActionType),
                value: campaignPresenter.insights.costPerActionType,
              },
              {
                name: intl.formatMessage(Messages.Insights.spend),
                value: campaignPresenter.insights.spend,
              },
              {
                name: intl.formatMessage(Messages.Insights.ctr),
                value: campaignPresenter.insights.ctr,
              },
              {
                name: intl.formatMessage(Messages.Insights.cpc),
                value: campaignPresenter.insights.cpc,
              },
              {
                name: intl.formatMessage(Messages.Insights.cpm),
                value: campaignPresenter.insights.cpm,
              },
            ]}
          />
        </EntityCard.Section>
      ) : null}

      <ObjectLink to={getLinkToAdsets(campaign.id)}>
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

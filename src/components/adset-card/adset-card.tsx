import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AdAccount } from '../../stores/ad-account-store';
import { Adset } from '../../stores/adset-store';
import { AdsetPresenter } from '../../presenters/adset-presenter';
import { Messages } from '../../services/intl';
import { EntityCard, EntityCardProps } from '../entity-card';
import {
  Budget,
  Insights,
  ObjectLink,
  ObjectName,
  StatusSwitch,
} from '../campaign-card';

export interface AdsetCardProps extends EntityCardProps {
  adAccount: AdAccount;
  adset: Adset;
  getLinkToAds(adsetId: Adset['id']): string;
}

export function AdsetCard({
  adAccount,
  adset,
  getLinkToAds,
  ...props
}: AdsetCardProps) {
  const intl = useIntl();
  const adsetPresenter = new AdsetPresenter(adset, adAccount);

  return (
    <EntityCard {...props}>
      <EntityCard.Header>
        <ObjectName objectId={adsetPresenter.id}>
          {adsetPresenter.name}
        </ObjectName>
        <StatusSwitch status={adset.status} onStatusChange={console.log} />
      </EntityCard.Header>

      <EntityCard.Section caption={intl.formatMessage(Messages.Adset.budget)}>
        <Budget
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
          <Insights
            items={[
              {
                name: adsetPresenter.insights.actionType,
                value: adsetPresenter.insights.actionTypeResult,
              },
              {
                name: intl.formatMessage(Messages.Insights.costPerActionType),
                value: adsetPresenter.insights.costPerActionType,
              },
              {
                name: intl.formatMessage(Messages.Insights.spend),
                value: adsetPresenter.insights.spend,
              },
              {
                name: intl.formatMessage(Messages.Insights.ctr),
                value: adsetPresenter.insights.ctr,
              },
              {
                name: intl.formatMessage(Messages.Insights.cpc),
                value: adsetPresenter.insights.cpc,
              },
              {
                name: intl.formatMessage(Messages.Insights.cpm),
                value: adsetPresenter.insights.cpm,
              },
            ]}
          />
        </EntityCard.Section>
      ) : null}

      <ObjectLink to={getLinkToAds(adset.id)}>
        <FormattedMessage
          tagName="span"
          id="components.AdsetCard.linkToAds"
          defaultMessage="View Ads"
        />
        <span>&rarr;</span>
      </ObjectLink>
    </EntityCard>
  );
}

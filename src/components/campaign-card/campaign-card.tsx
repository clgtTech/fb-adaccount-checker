import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
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

export const CampaignCard = mobxReact.observer(function CampaignCard({
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
          canUpdate={campaign.canUpdate(adAccount)}
          status={campaign.status}
          isUpdating={campaign.isStatusUpdating}
          error={campaign.statusUpdateError}
          onUpdate={(status) => campaign.updateStatus(status)}
        />
      </EntityCard.Header>

      <EntityCard.Section
        caption={intl.formatMessage(Messages.Campaign.budget)}
      >
        <AdBudget
          fallbackMessage={intl.formatMessage(Messages.Campaign.adsetBudget)}
          bidStrategy={campaignPresenter.bidStrategy}
          lifetimeBudget={campaign.lifetimeBudget}
          dailyBudget={campaign.dailyBudget}
          canUpdate={campaign.canUpdate(adAccount)}
          isUpdating={campaign.isBudgetUpdating}
          error={campaign.budgetUpdateError}
          onUpdate={(update) => campaign.updateBudget(update)}
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
});

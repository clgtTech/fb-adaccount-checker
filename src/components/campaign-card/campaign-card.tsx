import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { ActionType, Objective } from '../../types';
import { AdAccount, Campaign } from '../../stores/entities';
import { CampaignPresenter } from '../../presenters/campaign-presenter';
import { Messages } from '../../services/intl';
import { EntityCard, EntityCardProps } from '../entity-card';
import { ObjectName } from '../object-name';
import { ObjectMeta } from '../object-meta';
import { DeliveryStatusInfo } from '../delivery-status-info';
import { ObjectLink } from '../object-link';
import { AdObjectStatusSwitch } from '../ad-object-status-switch';
import { AdBudget } from '../ad-budget';
import { InsightsInfo } from '../insights-info';

export interface CampaignCardProps extends EntityCardProps {
  adAccount: AdAccount;
  campaign: Campaign;
  adsetsUrl: string;
}

export const CampaignCard = mobxReact.observer(function CampaignCard({
  adAccount,
  campaign,
  adsetsUrl,
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
                name: intl.formatMessage(Messages.Campaign.deliveryStatus),
                value: (
                  <DeliveryStatusInfo
                    deliveryStatusPresenter={campaignPresenter.deliveryStatus}
                  />
                ),
              },
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
          <InsightsInfo
            insightsPresenter={campaignPresenter.insights}
            additionalActionItems={
              campaign.objective === Objective.APP_INSTALLS
                ? [
                    {
                      action: ActionType.OMNI_APP_INSTALL,
                      shouldShowActionResult: true,
                      shouldShowActionCost: true,
                    },
                  ]
                : undefined
            }
          />
        </EntityCard.Section>
      ) : null}

      <ObjectLink href={adsetsUrl} onClick={onAdsetsLinkClick}>
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

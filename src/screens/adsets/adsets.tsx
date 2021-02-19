import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router-dom';
import {
  NonIdealStateView,
  SvgIcon,
  Icons,
  SearchField,
} from 'draft-components';
import { AdAccount, Campaign, Adset } from '../../stores/entities';
import { adsetStore } from '../../stores';
import { Messages } from '../../services/intl';
import { AdsetCard } from '../../components/adset-card';
import { Workspace } from '../campaigns';

export interface AdsetsProps {
  adAccount: AdAccount;
  campaign: Campaign;
  campaignsPagePath: string;
}

export const Adsets = mobxReact.observer(function Adsets({
  adAccount,
  campaign,
  campaignsPagePath,
}: AdsetsProps) {
  const intl = useIntl();
  const { url } = useRouteMatch();
  const getLinkToAds = React.useMemo(() => {
    const baseUrl = url.replace(/\/*$/, '');
    return (adsetId: Adset['id']) => `${baseUrl}/${adsetId}/ads`;
  }, [url]);
  const adsets = adsetStore.getCampaignAdsets(campaign);

  return (
    <Workspace
      title={intl.formatMessage(Messages.Entities.adsets)}
      backLinkUrl={campaignsPagePath}
      searchBarSlot={
        <SearchField
          hasFullWidth={true}
          placeholder={intl.formatMessage({
            id: 'screens.Adsets.searchFieldPlaceholder',
            defaultMessage: `Search Ad Sets by name`,
          })}
        />
      }
    >
      {(function () {
        if (!adsets.length) {
          return (
            <NonIdealStateView
              icon={<SvgIcon size="4x" icon={Icons.stack} />}
              title={intl.formatMessage({
                id: 'screens.Adsets.noAdsets.title',
                defaultMessage: `No ad sets found`,
              })}
              description={intl.formatMessage({
                id: 'screens.Adsets.noAdsets.description',
                defaultMessage: `This campaign does not have any ad sets. Try to select another campaign.`,
              })}
            />
          );
        }

        return (
          <ul>
            {adsets.map((adset) => (
              <li key={adset.id}>
                <AdsetCard
                  adAccount={adAccount}
                  adset={adset}
                  getLinkToAds={getLinkToAds}
                />
              </li>
            ))}
          </ul>
        );
      })()}
    </Workspace>
  );
});

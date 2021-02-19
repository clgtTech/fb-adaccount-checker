import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import {
  NonIdealStateView,
  SvgIcon,
  Icons,
  SearchField,
} from 'draft-components';
import { AdAccount, Campaign, Adset } from '../../stores/entities';
import { adStore } from '../../stores';
import { Messages } from '../../services/intl';
import { AdCard } from '../../components/ad-card';
import { Workspace } from '../campaigns';

export interface AdsProps {
  adAccount: AdAccount;
  campaign: Campaign;
  adset: Adset;
  adsetsPagePath: string;
}

export const Ads = mobxReact.observer(function Ads({
  adAccount,
  adset,
  adsetsPagePath,
}: AdsProps) {
  const intl = useIntl();
  const ads = adStore.getAdsetAds(adset);

  return (
    <Workspace
      title={intl.formatMessage(Messages.Entities.ads)}
      backLinkUrl={adsetsPagePath}
      searchBarSlot={
        <SearchField
          hasFullWidth={true}
          placeholder={intl.formatMessage({
            id: 'screens.Ads.searchFieldPlaceholder',
            defaultMessage: `Search Ads by name`,
          })}
        />
      }
    >
      {(function () {
        if (!ads.length) {
          return (
            <NonIdealStateView
              icon={<SvgIcon size="4x" icon={Icons.document} />}
              title={intl.formatMessage({
                id: 'screens.Ads.noAds.title',
                defaultMessage: `No ads found`,
              })}
              description={intl.formatMessage({
                id: 'screens.Ads.noAds.description',
                defaultMessage: `This ad set does not have any ads. Try to select another ad set.`,
              })}
            />
          );
        }

        return (
          <ul>
            {ads.map((ad) => (
              <li key={ad.id}>
                <AdCard adAccount={adAccount} ad={ad} />
              </li>
            ))}
          </ul>
        );
      })()}
    </Workspace>
  );
});

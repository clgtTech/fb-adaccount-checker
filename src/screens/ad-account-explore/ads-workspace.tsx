import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  classNames,
  SearchField,
  IconButton,
  SvgIcon,
  Icons,
} from 'draft-components';
import { AsyncStatus, DatePreset } from '../../types';
import { adsetStore, adStore, campaignStore, sessionStore } from '../../stores';
import { AdAccount } from '../../stores/entities';
import { DatePresetSelect } from '../../components/date-preset-select';
import styles from './ads-workspace.module.scss';

export interface AdsWorkspaceProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  adAccount: AdAccount;
  title: React.ReactNode;
  backLinkUrl?: string;
  searchBarPlaceholder?: string;
  toolbarSlot?: React.ReactNode;
  children(context: { search: string; searchLowerCased: string }): JSX.Element;
}

export const allowedDatePresets = [
  DatePreset.LIFETIME,
  DatePreset.TODAY,
  DatePreset.YESTERDAY,
  DatePreset.LAST_3D,
  DatePreset.LAST_7D,
  DatePreset.LAST_14D,
  DatePreset.LAST_30D,
  DatePreset.THIS_WEEK_SUN_TODAY,
  DatePreset.LAST_WEEK_SUN_SAT,
  DatePreset.THIS_MONTH,
  DatePreset.LAST_MONTH,
];

export const AdsWorkspace = mobxReact.observer(function AdsWorkspace({
  adAccount,
  title,
  backLinkUrl,
  searchBarPlaceholder,
  toolbarSlot,
  className,
  children: renderChildren,
  ...props
}: AdsWorkspaceProps) {
  const intl = useIntl();
  const [search, setSearch] = React.useState('');
  const isInsightsLoading = [
    campaignStore.getCampaignsInsightsLoadStatus(adAccount),
    adsetStore.getAdsetsInsightsLoadStatus(adAccount),
    adStore.getAdsInsightsLoadStatus(adAccount),
  ].includes(AsyncStatus.pending);

  return (
    <section {...props} className={classNames(className, styles.container)}>
      <header className={styles.header}>
        <div className={styles.titleBar}>
          {backLinkUrl ? (
            <IconButton
              renderAs={({ children, ...props }) => (
                <Link {...props} to={backLinkUrl}>
                  {children}
                </Link>
              )}
              size="sm"
              appearance="secondary"
              icon={<SvgIcon size="sm" icon={Icons.chevronLeft} />}
            />
          ) : null}
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.searchBar}>
          <SearchField
            hasFullWidth={true}
            placeholder={
              searchBarPlaceholder ||
              intl.formatMessage({
                id: 'screens.AdAccountExplore.searchBarPlaceholder',
                defaultMessage: `Search`,
              })
            }
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <DatePresetSelect
            isLoading={isInsightsLoading}
            allowedDatePresets={allowedDatePresets}
            datePreset={sessionStore.insightsDatePreset}
            onDatePresetChange={(datePreset) => {
              sessionStore.setInsightsDatePreset(datePreset);
              campaignStore.updateCampaignsInsights(adAccount, datePreset);
              adsetStore.updateAdsetsInsights(adAccount, datePreset);
              adStore.updateAdsInsights(adAccount, datePreset);
            }}
          />
        </div>
        {toolbarSlot ? (
          <div className={styles.toolbar}>{toolbarSlot}</div>
        ) : null}
      </header>

      <div className={styles.content}>
        {renderChildren({
          search,
          searchLowerCased: search.toLowerCase(),
        })}
      </div>
    </section>
  );
});

import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { classNames, SearchField } from 'draft-components';
import { AdAccount } from '../../stores/ad-account-store';
import { AdAccountsPresenter } from '../../presenters/ad-accounts-csv-presenter';
import { SideNav, SideNavProps } from '../side-nav';
import { AdAccountNavLink } from './ad-account-nav-link';
import styles from './ad-accounts-nav.module.scss';

export interface AdAccountsNavProps extends SideNavProps {
  adAccounts: AdAccount[];
  getAdAccountPath(adAccount: AdAccount): string;
}

export function AdAccountsNav({
  adAccounts,
  getAdAccountPath,
  className,
  ...props
}: AdAccountsNavProps) {
  const intl = useIntl();
  const [searchValue, setSearchValue] = React.useState('');
  const searchQuery = searchValue.toLowerCase();

  return (
    <SideNav {...props} className={classNames(className, styles.container)}>
      <SideNav.Header
        className={styles.header}
        isBordered={true}
        title={intl.formatMessage({
          id: 'components.AdAccountsNav.title',
          defaultMessage: 'Ad Accounts',
        })}
        description={
          <a
            className={styles.exportLink}
            download={getCsvFileName()}
            href={getCsvObjectUrl(adAccounts)}
          >
            <FormattedMessage
              id="components.AdAccountsNav.exportLink"
              defaultMessage="Download .csv report"
            />
          </a>
        }
      >
        <SearchField
          hasFullWidth={true}
          placeholder={intl.formatMessage({
            id: 'components.AdAccountsNav.searchFieldPlaceholder',
            defaultMessage: 'Search ad accounts by name',
          })}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </SideNav.Header>
      <SideNav.Content className={styles.content}>
        <ol className={styles.asAccountsList}>
          {adAccounts
            .filter((adAccount) => {
              return adAccount.name.toLowerCase().includes(searchQuery);
            })
            .map((adAccount) => (
              <li key={adAccount.id}>
                <AdAccountNavLink
                  to={getAdAccountPath(adAccount)}
                  adAccount={adAccount}
                />
              </li>
            ))}
        </ol>
      </SideNav.Content>
    </SideNav>
  );
}

function getCsvFileName(): string {
  const [ISODate] = new Date().toISOString().split(/[T ]/);
  return `ad-accounts-${ISODate}.csv`;
}

function getCsvObjectUrl(adAccounts: AdAccount[]): string {
  const adAccountsPresenter = new AdAccountsPresenter(adAccounts);
  return URL.createObjectURL(
    new Blob([adAccountsPresenter.toCSV()], { type: 'text/plain' })
  );
}

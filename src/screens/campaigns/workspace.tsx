import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  classNames,
  Select,
  IconButton,
  SvgIcon,
  Icons,
} from 'draft-components';
import { DatePreset } from '../../types';
import { Messages } from '../../services/intl';
import styles from './workspace.module.scss';

export interface WorkspaceProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title: React.ReactNode;
  backLinkUrl?: string;
  searchBarSlot?: React.ReactNode;
  toolbarSlot?: React.ReactNode;
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

export const Workspace = mobxReact.observer(function Workspace({
  title,
  backLinkUrl,
  searchBarSlot,
  toolbarSlot,
  className,
  children,
  ...props
}: WorkspaceProps) {
  const intl = useIntl();

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
          {searchBarSlot ? searchBarSlot : null}
          <Select
            className={styles.insightsDatePreset}
            aria-label={intl.formatMessage({
              id: 'screens.Campaigns.Workspace.datePresetAriaLabel',
              defaultMessage: 'Insights period',
            })}
          >
            {allowedDatePresets.map((datePreset) => (
              <option key={datePreset} value={datePreset}>
                {intl.formatMessage(Messages.Enums.DatePresets[datePreset])}
              </option>
            ))}
          </Select>
        </div>
        {toolbarSlot ? (
          <div className={styles.toolbar}>{toolbarSlot}</div>
        ) : null}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
});

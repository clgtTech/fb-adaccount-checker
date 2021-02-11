import * as React from 'react';
import { useIntl } from 'react-intl';
import { Link, generatePath } from 'react-router-dom';
import { classNames, Breadcrumbs, SvgIcon, Icons } from 'draft-components';
import { AdAccountExploreParams } from './route-params';
import { ROUTES } from '../../constants';
import { Campaign, Adset } from '../../stores/entities';
import { Messages } from '../../services/intl';
import styles from './ad-objects-nav.module.scss';

export interface AdObjectsNavProps
  extends React.ComponentPropsWithoutRef<'nav'> {
  params: AdAccountExploreParams;
  campaign?: Campaign;
  adset?: Adset;
}

export function AdObjectsNav({
  className,
  params,
  campaign,
  adset,
  ...props
}: AdObjectsNavProps) {
  const intl = useIntl();
  const items = React.useMemo(() => {
    const items = [
      {
        icon: <SvgIcon icon={Icons.folderIcon} />,
        label: intl.formatMessage(Messages.Entities.campaigns),
        href: generatePath(ROUTES.campaigns, {
          userId: params.userId,
          adAccountId: params.adAccountId,
        }),
      },
    ];

    if (campaign) {
      items.push({
        icon: <SvgIcon icon={Icons.stackIcon} />,
        label: intl.formatMessage(Messages.Entities.adsets),
        href: generatePath(ROUTES.adsets, {
          userId: params.userId,
          adAccountId: params.adAccountId,
          campaignId: campaign.id,
        }),
      });
    }

    if (campaign && adset) {
      items.push({
        icon: <SvgIcon icon={Icons.documentIcon} />,
        label: intl.formatMessage(Messages.Entities.ads),
        href: generatePath(ROUTES.ads, {
          userId: params.userId,
          adAccountId: params.adAccountId,
          campaignId: campaign.id,
          adsetId: adset.id,
        }),
      });
    }

    return items;
  }, [intl, params, campaign, adset]);

  return (
    <nav {...props} className={classNames(className, styles.container)}>
      <Breadcrumbs
        className={styles.breadcrumbs}
        items={items}
        renderLink={({ href, className, children, isCurrent }) => (
          <Link
            className={classNames(className, styles.breadcrumbsItem)}
            to={href}
            aria-current={isCurrent}
          >
            {children}
          </Link>
        )}
      />
    </nav>
  );
}

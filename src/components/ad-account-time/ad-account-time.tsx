import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { classNames } from 'draft-components';
import {
  FormattedContent,
  Footnote,
  Tooltip,
  SvgIcon,
  Icons,
} from 'draft-components';
import styles from './ad-account-time.module.scss';

export interface AdAccountTimeProps
  extends React.ComponentPropsWithoutRef<'div'> {
  timeZone: string;
}

export function AdAccountTime({
  timeZone,
  className,
  ...props
}: AdAccountTimeProps) {
  const intl = useIntl();
  const { displayedTimeZone, hoursTillNewDay } = React.useMemo(() => {
    const dateTZ = new Date(new Date().toLocaleString('en-US', { timeZone }));
    const hoursInDay = 24;
    return {
      hoursTillNewDay: hoursInDay - dateTZ.getHours(),
      displayedTimeZone: timeZone.replaceAll('_', ' '),
    };
  }, [timeZone]);
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const second = 1000;
    const intervalId = window.setInterval(() => {
      setDate(new Date());
    }, second);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      {...props}
      className={classNames(
        className,
        styles.container,
        FormattedContent.CSSClasses.subheadline
      )}
    >
      <Tooltip arrangement="top" anchorOffset={4} content={displayedTimeZone}>
        <time className={styles.time}>
          <SvgIcon icon={Icons.clockOutline} size="base" />
          {intl.formatTime(date, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
            timeZone: timeZone,
          })}
        </time>
      </Tooltip>
      <Footnote className={styles.restDay}>
        <FormattedMessage
          id="components.AdAccountTime.tillNewDay"
          defaultMessage="Till new day: {hours}h"
          values={{ hours: hoursTillNewDay }}
        />
      </Footnote>
    </div>
  );
}

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  classNames,
  Button,
  ButtonProps,
  SvgIcon,
  Icons,
  SvgIconProps,
} from 'draft-components';
import styles from './sidebar-switch.module.scss';

export interface SidebarSwitchProps extends ButtonProps {
  icon?: SvgIconProps['icon'];
  isActive?: boolean;
}

export function SidebarSwitch({
  className,
  isActive,
  icon = Icons.ulListIcon,
  children,
  ...props
}: SidebarSwitchProps) {
  return (
    <Button
      {...props}
      className={classNames(className, styles.button, {
        [styles.isActive]: isActive,
      })}
      appearance="minimal"
      leadingIcon={<SvgIcon size="lg" icon={icon} />}
    >
      {children ?? (
        <FormattedMessage
          id="components.SidebarSwitch.children"
          defaultMessage="Users"
        />
      )}
    </Button>
  );
}

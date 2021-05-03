import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  classNames,
  Subheadline,
  Footnote,
  IconButton,
  SvgIcon,
  Icons,
} from 'draft-components';
import { Transition } from 'react-transition-group';
import { EntityGroup, EntityGroupParams } from '../../stores/entities';
import { EditEntityGroupPopover } from '../edit-entity-group-popover';
import styles from './entity-group-view.module.scss';

export interface EntityGroupViewProps
  extends React.ComponentPropsWithoutRef<'div'> {
  defaultIsOpen?: boolean;
  group: EntityGroup;
  children: React.ReactNodeArray;
  renderDescription?(numberOfItems: number): React.ReactNode;
  onUpdate(groupId: EntityGroup['id'], params: EntityGroupParams): void;
  onDelete(groupId: EntityGroup['id']): void;
}

const timeout = 200;
const defaultStyle = {
  overflow: 'hidden',
  height: 0,
  transition: `height ${timeout}ms ease-in-out`,
};

export function EntityGroupView({
  defaultIsOpen = false,
  group,
  children: items,
  renderDescription,
  onUpdate,
  onDelete,
  style,
  className,
  ...props
}: EntityGroupViewProps) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);

  if (typeof renderDescription !== 'function') {
    renderDescription = (numberOfItems) => (
      <FormattedMessage
        id="components.EntityGroupView.description"
        defaultMessage="Items: {numberOfItems}"
        values={{ numberOfItems }}
      />
    );
  }

  return (
    <div
      {...props}
      style={{ ...style, color: group.color }}
      className={classNames(className, styles.container)}
    >
      <div className={styles.body}>
        <IconButton
          className={classNames(styles.arrow, isOpen && styles.arrow_rotated)}
          icon={<SvgIcon icon={Icons.chevronRight} size={16} />}
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        />
        <SvgIcon className={styles.icon} icon={Icons.folder} size={42} />
        <div className={styles.content}>
          <Subheadline className={styles.name}>{group.name}</Subheadline>
          <Footnote>{renderDescription(items.length)}</Footnote>
        </div>
        <EditEntityGroupPopover
          groupParams={{ name: group.name, color: group.color }}
          onSave={(params) => onUpdate(group.id, params)}
          onDelete={() => onDelete(group.id)}
        />
      </div>

      <Transition
        in={isOpen}
        timeout={timeout}
        mountOnEnter={true}
        unmountOnExit={true}
        onEntering={(listEl: HTMLElement) => {
          let height = 0;
          for (const child of listEl.childNodes) {
            height += (child as HTMLElement).offsetHeight || 0;
          }
          listEl.style.height = `${height}px`;
        }}
        onExiting={(listEl: HTMLElement) => {
          listEl.style.height = '0px';
        }}
      >
        <ul style={defaultStyle} className={styles.items}>
          {items}
        </ul>
      </Transition>
    </div>
  );
}

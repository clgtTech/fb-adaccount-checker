import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  classNames,
  Subheadline,
  Footnote,
  IconButton,
  SvgIcon,
  Icons,
} from 'draft-components';
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

enum State {
  opening = 'opening',
  opened = 'opened',
  closing = 'closing',
  closed = 'closed',
}
const timeout = 200;
const defaultStyle = {
  overflow: 'hidden',
  height: 0,
  transition: `${timeout}ms ease-in-out`,
  transitionProperty: 'height',
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
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [state, setState] = React.useState(State.closed);
  const toggle = () => {
    if (state === State.closed) {
      setState(State.opening);
      setTimeout(() => setState(State.opened), timeout);
    } else if (state === State.opened) {
      setState(State.closing);
      setTimeout(() => setState(State.closed), timeout);
    }
  };

  React.useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) {
      return;
    }

    requestAnimationFrame(() => {
      if (state === State.opening) {
        listEl.style.height = `${calcListHeight(listEl)}px`;
      } else if (state === State.closing) {
        listEl.style.height = '0px';
      }
    });
  }, [state]);

  React.useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) {
      return;
    }

    requestAnimationFrame(() => {
      listEl.style.height = `${calcListHeight(listEl)}px`;
    });
  }, [items]);

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
          style={{
            transitionDuration: defaultStyle.transition,
            transitionProperty: 'transform',
          }}
          className={classNames(
            styles.arrow,
            (state === State.opening || state === State.opened) &&
              styles.arrow_rotated
          )}
          icon={<SvgIcon icon={Icons.chevronRight} size={16} />}
          size="sm"
          onClick={toggle}
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

      {state !== State.closed && (
        <ul ref={listRef} style={defaultStyle} className={styles.items}>
          {items}
        </ul>
      )}
    </div>
  );
}

function calcListHeight(listEl: HTMLUListElement): number {
  let height = 0;
  for (const child of listEl.childNodes) {
    height += (child as HTMLElement).offsetHeight || 0;
  }
  return height;
}

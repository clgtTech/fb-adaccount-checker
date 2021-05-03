import * as React from 'react';
import {
  classNames,
  Popover,
  PopoverProps,
  IconButton,
  SvgIcon,
  Icons,
} from 'draft-components';
import { EntityGroupParams } from '../../stores/entities';
import { EntityGroupPopoverForm } from '../entity-group-popover-form';
import styles from './edit-entity-group-popover.module.scss';

export interface EditEntityGroupPopoverProps
  extends Omit<PopoverProps, 'isOpen' | 'content' | 'children'> {
  groupParams: EntityGroupParams;
  onSave(params: EntityGroupParams): void;
  onDelete(): void;
}

export function EditEntityGroupPopover({
  padding = 'none',
  alignment = 'center',
  groupParams,
  onSave,
  onDelete,
  className,
  ...props
}: EditEntityGroupPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);
  const content = (
    <EntityGroupPopoverForm
      defaultGroupParams={groupParams}
      onCancel={close}
      onSave={(params) => {
        onSave(params);
        close();
      }}
      onDelete={() => {
        onDelete();
        close();
      }}
    />
  );

  return (
    <Popover
      {...props}
      className={classNames(className, styles.container)}
      isOpen={isOpen}
      padding={padding}
      alignment={alignment}
      content={content}
      onClose={close}
    >
      <IconButton
        icon={<SvgIcon icon={Icons.ellipsisH} size="sm" />}
        isRounded={true}
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
      />
    </Popover>
  );
}

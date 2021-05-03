import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  classNames,
  Popover,
  PopoverProps,
  Button,
  SvgIcon,
  Icons,
} from 'draft-components';
import { EntityGroupPopoverForm } from '../entity-group-popover-form';
import { EntityGroupParams } from '../../stores/entities';
import styles from './create-entity-group-popover.module.scss';

export interface CreateEntityGroupPopoverProps
  extends Omit<PopoverProps, 'isOpen' | 'content' | 'children'> {
  onCreate(params: EntityGroupParams): void;
}

export function CreateEntityGroupPopover({
  padding = 'none',
  className,
  onCreate,
  ...props
}: CreateEntityGroupPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const content = (
    <EntityGroupPopoverForm
      onCancel={close}
      onSave={(groupParams) => {
        onCreate(groupParams);
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
      content={content}
      onClose={close}
    >
      <Button
        appearance="secondary"
        leadingIcon={<SvgIcon size="lg" icon={Icons.folderAdd} />}
        onClick={toggle}
      >
        <FormattedMessage
          id="components.CreateEntityGroupPopover.createGroupButton"
          defaultMessage="Add group"
        />
      </Button>
    </Popover>
  );
}

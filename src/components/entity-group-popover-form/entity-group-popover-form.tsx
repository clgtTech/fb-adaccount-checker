import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  classNames,
  FieldGroup,
  TextField,
  Button,
  IconButton,
  SvgIcon,
  Icons,
} from 'draft-components';
import { EntityGroup, EntityGroupParams } from '../../stores/entities';
import { CommonTexts } from '../../services/intl/messages';
import { ColorPicker } from './color-picker';
import styles from './entity-group-popover-form.module.scss';

export interface EntityGroupPopoverFormProps
  extends React.ComponentPropsWithoutRef<'form'> {
  defaultGroupParams?: EntityGroupParams;
  onCancel(): void;
  onSave(params: EntityGroupParams): void;
  onDelete?(): void;
}

export function EntityGroupPopoverForm({
  defaultGroupParams,
  onCancel,
  onSave,
  onDelete,
  className,
  ...props
}: EntityGroupPopoverFormProps) {
  const intl = useIntl();
  const [groupParams, setGroupParams] = React.useState<EntityGroupParams>({
    name: '',
    color: EntityGroup.Colors[0],
    ...defaultGroupParams,
  });
  const [isNameInvalid, setIsNameInvalid] = React.useState(false);

  return (
    <form
      {...props}
      className={classNames(className, styles.container)}
      onSubmit={(event) => {
        event.preventDefault();

        if (!groupParams.name.trim()) {
          setIsNameInvalid(true);
        } else {
          setIsNameInvalid(false);
          onSave(groupParams);
        }
      }}
    >
      <FieldGroup
        label={intl.formatMessage({
          id: 'components.EntityGroupPopoverForm.nameFieldLabel',
          defaultMessage: 'Group name',
        })}
      >
        <TextField
          hasFullWidth={true}
          name="name"
          autoComplete="off"
          value={groupParams.name}
          isInvalid={isNameInvalid}
          onChange={(event) => {
            setGroupParams({ ...groupParams, name: event.target.value });
          }}
        />
      </FieldGroup>

      <ColorPicker
        className={styles.colorPicker}
        name="color"
        selectedColor={groupParams.color}
        onColorChange={(color) => {
          setGroupParams({ ...groupParams, color });
        }}
      />

      <div className={styles.actions}>
        <Button hasFullWidth={true} appearance="primary" type="submit">
          <FormattedMessage {...CommonTexts.saveButton} />
        </Button>
        {typeof onDelete === 'function' ? (
          <Button
            hasFullWidth={true}
            appearance="secondary"
            leadingIcon={<SvgIcon icon={Icons.trash} />}
            type="button"
            onClick={onDelete}
          >
            <FormattedMessage {...CommonTexts.deleteButton} />
          </Button>
        ) : null}
      </div>

      <IconButton
        className={styles.closeButton}
        size="xs"
        icon="remove"
        appearance="secondary"
        isRounded={true}
        onClick={onCancel}
      />
    </form>
  );
}

import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  FieldGroup,
  TextField,
  Select,
  Button,
  classNames,
} from 'draft-components';
import { EntityGroup, User, UserParams } from '../../stores/entities';
import { UserToGroupMapping } from '../../stores/user-group-store';
import { CommonTexts } from '../../services/intl/messages';
import styles from './user-form.module.scss';

export interface UserFormProps extends React.ComponentPropsWithoutRef<'form'> {
  user: User;
  userPerGroup: UserToGroupMapping;
  groups: EntityGroup[];
  onCancel(): void;
  onSave(params: UserParams): void;
}

export const UserForm = React.forwardRef<HTMLFormElement, UserFormProps>(
  function UserForm(
    { user, userPerGroup, groups, onCancel, onSave, className, ...props },
    ref
  ) {
    const intl = useIntl();

    const [formData, setFormData] = React.useState<UserParams>({
      customName: user.customName || user.name,
      groupId: userPerGroup[user.id] || '',
    });
    const onChange: React.ChangeEventHandler<
      HTMLInputElement | HTMLSelectElement
    > = (event) => {
      const target = event.target;
      setFormData((formData) => ({
        ...formData,
        [target.name]: target.value,
      }));
    };
    const onSubmit: React.FormEventHandler = (event) => {
      event.preventDefault();
      onSave({
        customName:
          formData.customName && formData.customName !== user.name
            ? formData.customName
            : '',
        groupId: formData.groupId || undefined,
      });
    };

    return (
      <form
        {...props}
        ref={ref}
        className={classNames(className, styles.container)}
        onSubmit={onSubmit}
      >
        <FieldGroup
          label={intl.formatMessage({
            id: 'components.UserForm.nameField',
            defaultMessage: 'User name',
          })}
        >
          {({ id }) => (
            <TextField
              id={id}
              hasFullWidth={true}
              name="customName"
              value={formData.customName}
              onChange={onChange}
            />
          )}
        </FieldGroup>

        <FieldGroup
          label={intl.formatMessage({
            id: 'components.UserForm.groupField',
            defaultMessage: 'Group',
          })}
        >
          {({ id }) => (
            <Select
              id={id}
              hasFullWidth={true}
              name="groupId"
              value={formData.groupId}
              onChange={onChange}
            >
              <option value="">
                {intl.formatMessage({
                  id: 'components.UserForm.noGroupOption',
                  defaultMessage: 'Group not selected',
                })}
              </option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </Select>
          )}
        </FieldGroup>

        <div className={styles.actions}>
          <Button type="button" onClick={onCancel}>
            <FormattedMessage {...CommonTexts.cancelButton} />
          </Button>
          <Button appearance="primary" type="submit">
            <FormattedMessage {...CommonTexts.saveButton} />
          </Button>
        </div>
      </form>
    );
  }
);

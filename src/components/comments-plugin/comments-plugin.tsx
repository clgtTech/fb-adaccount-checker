import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage, useIntl } from 'react-intl';
import { classNames, Alert, Button, SvgIcon, Icons } from 'draft-components';
import { Ad } from '../../stores/entities';
import { sessionStore } from '../../stores';
import { CommentList } from './comment-list';
import styles from './comments-plugin.module.scss';

export interface CommentsPluginProps
  extends React.ComponentPropsWithoutRef<'div'> {
  ad: Ad;
}

export const CommentsPlugin = mobxReact.observer(function CommentsPlugin({
  ad,
  className,
  children,
  ...props
}: CommentsPluginProps) {
  const intl = useIntl();
  const authUser = sessionStore.authUser;
  const [isCommentsOpen, setIsCommentsOpen] = React.useState(false);

  let alert = '';
  if (authUser == null) {
    alert = intl.formatMessage({
      id: 'components.CommentsPlugin.noAuth',
      defaultMessage: `An authenticated user is required to edit comments.`,
    });
  } else if (!authUser.canViewAdComments(ad)) {
    alert = intl.formatMessage({
      id: 'components.CommentsPlugin.noReadPermissions',
      defaultMessage: `The selected user can not view comments.`,
    });
  } else if (!authUser.canModerateAdComments(ad)) {
    alert = intl.formatMessage({
      id: 'components.CommentsPlugin.noModeratePermissions',
      defaultMessage: `The selected user can not moderate comments.`,
    });
  }

  return (
    <div {...props} className={classNames(className, styles.container)}>
      <div className={styles.titleBar}>
        {alert ? (
          <Alert>{alert}</Alert>
        ) : (
          <Button
            appearance="secondary"
            leadingIcon={<SvgIcon size="lg" icon={Icons.commentsIcon} />}
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          >
            {isCommentsOpen ? (
              <FormattedMessage
                id="components.CommentsPlugin.closeCommentsButton"
                defaultMessage="Close comments"
              />
            ) : (
              <FormattedMessage
                id="components.CommentsPlugin.viewCommentsButton"
                defaultMessage="View comments"
              />
            )}
          </Button>
        )}
      </div>

      {isCommentsOpen ? <CommentList ad={ad} /> : null}
    </div>
  );
});

import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage, useIntl } from 'react-intl';
import { Checkbox, LoadingView } from 'draft-components';
import { AsyncActionStatus, CommentFilter as Filter } from '../../types';
import { Ad, Comment, CommentUpdate } from '../../stores/entities';
import { commentStore, uiStore } from '../../stores';
import { ErrorView } from '../error-view';
import { CommentControls } from './comment-controls';
import { CommentFilter } from './comment-filter';
import { CommentRow } from '../comment-row';
import styles from './comment-list.module.scss';

export interface CommentListProps {
  ad: Ad;
}

export const CommentList = mobxReact.observer(function CommentList({
  ad,
}: CommentListProps) {
  type SelectedIds = Record<Comment['id'], boolean>;

  const intl = useIntl();
  const [filter, setFilter] = React.useState(Filter.VISIBLE);
  const [
    selectedCommentIds,
    setSelectedCommentIds,
  ] = React.useState<SelectedIds>({});
  const filteredComments = commentStore.getCommentsOnAd(ad, filter);
  const selectedCommentCount = React.useMemo(() => {
    let count = 0;
    for (const comment of filteredComments) {
      if (selectedCommentIds[comment.id]) {
        count += 1;
      }
    }
    return count;
  }, [filteredComments, selectedCommentIds]);

  function onCommentSelect(id: Comment['id'], isSelected: boolean): void {
    setSelectedCommentIds((selectedCommentIds) => ({
      ...selectedCommentIds,
      [id]: isSelected,
    }));
  }

  function onCommentUpdate(
    id: Comment['id'],
    data: CommentUpdate['data']
  ): void {
    commentStore.updateCommentOnAd(ad, { commentId: id, data });
  }

  function updateComments(update: CommentUpdate['data']) {
    const updates = filteredComments
      .filter((comment) => selectedCommentIds[comment.id])
      .map((comment) => ({ commentId: comment.id, data: update }));
    commentStore.batchUpdateCommentsOnAd(ad, updates);
  }

  const loadStatus = commentStore.getLoadStatusOfCommentsOnAd(ad);
  const loadError = commentStore.getLoadErrorOfCommentsOnAd(ad);
  const updateStatus = commentStore.getUpdateStatusOfCommentsOnAd(ad);
  const updateError = commentStore.getUpdateErrorOfCommentsOnAd(ad);

  React.useEffect(() => {
    const loadStatus = commentStore.getLoadStatusOfCommentsOnAd(ad);
    if (
      loadStatus === AsyncActionStatus.idle ||
      loadStatus === AsyncActionStatus.error
    ) {
      commentStore.loadCommentsOnAd(ad);
    }
  }, [ad]);

  React.useEffect(() => {
    if (updateStatus === AsyncActionStatus.error && updateError) {
      console.error(updateError);
      uiStore.showFlashMessage({
        type: 'error',
        message: intl.formatMessage({
          id: 'components.CommentList.batchUpdateError',
          defaultMessage: `An unknown error occurred during comments updating. Try to refresh the page and retry the operation.`,
        }),
      });
    }
  }, [intl, updateStatus, updateError]);

  if (
    loadStatus === AsyncActionStatus.idle ||
    loadStatus === AsyncActionStatus.pending
  ) {
    return (
      <LoadingView padY="md">
        <FormattedMessage
          id="components.CommentList.loadAdComments"
          defaultMessage="Loading comments..."
        />
      </LoadingView>
    );
  }

  if (loadStatus === AsyncActionStatus.error && loadError) {
    return <ErrorView padY="md" error={loadError} />;
  }

  return (
    <section className={styles.container}>
      <header className={styles.toolbar}>
        <div className={styles.toolbarItems}>
          {filteredComments.length ? (
            <Checkbox
              isMixed={selectedCommentCount !== filteredComments.length}
              checked={!!selectedCommentCount}
              onChange={(event) => {
                const shouldSelectAllComments = event.target.checked;
                if (shouldSelectAllComments) {
                  const selectedIds: SelectedIds = {};
                  filteredComments.forEach((comment) => {
                    selectedIds[comment.id] = true;
                  });
                  setSelectedCommentIds(selectedIds);
                } else {
                  setSelectedCommentIds({});
                }
              }}
            />
          ) : null}
          {selectedCommentCount ? (
            <CommentControls
              isDisabled={updateStatus === AsyncActionStatus.pending}
              onShowButtonClick={() => updateComments({ isHidden: false })}
              onHideButtonClick={() => updateComments({ isHidden: true })}
            />
          ) : null}
        </div>
        <div className={styles.toolbarItems}>
          <CommentFilter
            filter={filter}
            onFilterChange={(filter) => {
              setSelectedCommentIds({});
              setFilter(filter);
            }}
          />
        </div>
      </header>

      <ul className={styles.comments}>
        {filteredComments.length ? (
          filteredComments.map((comment) => (
            <li key={comment.id}>
              <CommentRow
                comment={comment}
                isSelected={selectedCommentIds[comment.id]}
                onSelect={onCommentSelect}
                onUpdate={onCommentUpdate}
              />
            </li>
          ))
        ) : (
          <li className={styles.noCommentsMessage}>
            <FormattedMessage
              id="components.CommentList.noComments"
              defaultMessage="No comments found."
            />
          </li>
        )}
      </ul>
    </section>
  );
});

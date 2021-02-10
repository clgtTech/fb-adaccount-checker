import * as mobx from 'mobx';
import { AsyncActionStatus, CommentFilter } from '../types';
import { Ad, Comment, CommentApi, CommentUpdate } from './entities';

export class CommentStore {
  comments = new Map<Ad['id'], Comment>();
  commentsOnAd = new Map<Ad['id'], Comment['id'][]>();
  loadStatusOfCommentsOnAd = new Map<Ad['id'], AsyncActionStatus>();
  loadErrorOfCommentsOnAd = new Map<Ad['id'], Error | null>();
  updateStatusOfCommentsOnAd = new Map<Ad['id'], AsyncActionStatus>();
  updateErrorOfCommentsOnAd = new Map<Ad['id'], Error | null>();

  constructor(private commentApi: CommentApi) {
    mobx.makeAutoObservable(this);
  }

  clear() {
    this.comments = new Map();
    this.commentsOnAd = new Map();
    this.loadStatusOfCommentsOnAd = new Map();
    this.loadErrorOfCommentsOnAd = new Map();
    this.updateStatusOfCommentsOnAd = new Map();
    this.updateErrorOfCommentsOnAd = new Map();
  }

  getCommentsOnAd(
    ad: Ad,
    filter: CommentFilter = CommentFilter.ALL
  ): Comment[] {
    const commentIds = this.commentsOnAd.get(ad.id) ?? [];
    const commentsOnAd: Comment[] = [];
    const filterComment = (comment: Comment) => {
      switch (filter) {
        case CommentFilter.HIDDEN:
          return filter === CommentFilter.HIDDEN && comment.isHidden;
        case CommentFilter.VISIBLE:
          return filter === CommentFilter.VISIBLE && !comment.isHidden;
        default:
          return true;
      }
    };
    for (const commentId of commentIds) {
      const comment = this.comments.get(commentId);
      if (comment && filterComment(comment)) {
        commentsOnAd.push(comment);
      }
    }
    return commentsOnAd;
  }

  getLoadStatusOfCommentsOnAd(ad: Ad): AsyncActionStatus {
    return this.loadStatusOfCommentsOnAd.get(ad.id) ?? AsyncActionStatus.idle;
  }

  getLoadErrorOfCommentsOnAd(ad: Ad): Error | null {
    return this.loadErrorOfCommentsOnAd.get(ad.id) ?? null;
  }

  getUpdateStatusOfCommentsOnAd(ad: Ad): AsyncActionStatus {
    return this.updateStatusOfCommentsOnAd.get(ad.id) ?? AsyncActionStatus.idle;
  }

  getUpdateErrorOfCommentsOnAd(ad: Ad): Error | null {
    return this.updateErrorOfCommentsOnAd.get(ad.id) ?? null;
  }

  loadCommentsOnAd(ad: Ad): void {
    const creative = ad.creative;
    if (!creative || !creative.pageId || !creative.pagePostId) {
      return;
    }
    this.loadStatusOfCommentsOnAd.set(ad.id, AsyncActionStatus.pending);
    this.commentApi
      .getPostComments(creative.pageId, creative.pagePostId)
      .then((fetchedComments) => {
        const comments = new Map();
        const commentIds: Comment['id'][] = [];
        for (const fetchedComment of fetchedComments) {
          const comment = new Comment(fetchedComment);
          comments.set(comment.id, comment);
          commentIds.push(comment.id);
        }
        mobx.runInAction(() => {
          this.comments = new Map([...this.comments, ...comments]);
          this.commentsOnAd.set(ad.id, commentIds);
          this.loadErrorOfCommentsOnAd.delete(ad.id);
          this.loadStatusOfCommentsOnAd.set(ad.id, AsyncActionStatus.success);
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.loadErrorOfCommentsOnAd.set(ad.id, e);
          this.loadStatusOfCommentsOnAd.set(ad.id, AsyncActionStatus.error);
        });
      });
  }

  batchUpdateCommentsOnAd(ad: Ad, updates: CommentUpdate[]): void {
    const creative = ad.creative;
    if (!creative || !creative.pageId) {
      return;
    }

    const allowedUpdates: CommentUpdate[] = [];
    for (const update of updates) {
      const comment = this.comments.get(update.commentId);
      if (
        comment &&
        comment.updateStatus !== AsyncActionStatus.pending &&
        comment.isNeedUpdate(update.data)
      ) {
        comment.setUpdateStatus(AsyncActionStatus.pending);
        allowedUpdates.push(update);
      }
    }
    if (!allowedUpdates.length) {
      return;
    }

    this.updateStatusOfCommentsOnAd.set(ad.id, AsyncActionStatus.pending);
    this.commentApi
      .batchUpdateComments(creative.pageId, updates)
      .then((results) => {
        for (const result of results) {
          const comment = this.comments.get(result.commentId);
          if (!comment) {
            continue;
          }

          if (result.success) {
            comment.update(result.data);
            comment.setUpdateError(null);
            comment.setUpdateStatus(AsyncActionStatus.success);
          } else {
            comment.setUpdateError(result.error);
            comment.setUpdateStatus(AsyncActionStatus.error);
          }
        }

        mobx.runInAction(() => {
          this.updateErrorOfCommentsOnAd.delete(ad.id);
          this.updateStatusOfCommentsOnAd.set(ad.id, AsyncActionStatus.success);
        });
      })
      .catch((e) => {
        for (const update of allowedUpdates) {
          const comment = this.comments.get(update.commentId);
          comment?.setUpdateStatus(AsyncActionStatus.error);
        }
        mobx.runInAction(() => {
          this.updateErrorOfCommentsOnAd.set(ad.id, e);
          this.updateStatusOfCommentsOnAd.set(ad.id, AsyncActionStatus.error);
        });
      });
  }

  updateCommentOnAd(ad: Ad, update: CommentUpdate): void {
    const creative = ad.creative;
    if (!creative || !creative.pageId) {
      return;
    }

    const comment = this.comments.get(update.commentId);
    if (!comment || comment.updateStatus === AsyncActionStatus.pending) {
      return;
    }

    comment.setUpdateStatus(AsyncActionStatus.pending);
    this.commentApi
      .updateComment(creative.pageId, update)
      .then(() => {
        comment.update(update.data);
        comment.setUpdateError(null);
        comment.setUpdateStatus(AsyncActionStatus.success);
      })
      .catch((e) => {
        comment.setUpdateError(e);
        comment.setUpdateStatus(AsyncActionStatus.error);
      });
  }
}

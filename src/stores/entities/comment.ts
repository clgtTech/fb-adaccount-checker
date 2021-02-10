import * as mobx from 'mobx';
import { AsyncActionStatus } from '../../types';

export class CommentActor {
  id: string;
  name: string;
  pictureUrl?: string;

  constructor(commentActor: CommentActorDTO) {
    this.id = '' + commentActor.id;
    this.name = commentActor.name;
    this.pictureUrl = commentActor.pictureUrl ?? undefined;
  }
}

export class Comment {
  readonly id: string;
  readonly message: string;
  readonly createdTime: Date;
  readonly actor: CommentActor;
  isHidden: boolean;
  updateStatus: AsyncActionStatus = AsyncActionStatus.idle;
  updateError: Error | null = null;

  constructor(comment: CommentDTO) {
    mobx.makeAutoObservable(this, {
      id: false,
      actor: false,
      message: false,
      createdTime: false,
    });
    this.id = '' + comment.id;
    this.message = comment.message;
    this.createdTime = new Date(comment.createdTime);
    this.isHidden = comment.isHidden;
    this.actor = new CommentActor(comment.actor);
  }

  setUpdateStatus(updateStatus: AsyncActionStatus) {
    this.updateStatus = updateStatus;
  }

  setUpdateError(error: Error | null | undefined) {
    this.updateError = error ?? null;
  }

  isNeedUpdate(data: CommentUpdate['data']): boolean {
    return Object.keys(data).some(
      (key) =>
        this[key as keyof Comment] !== data[key as keyof CommentUpdate['data']]
    );
  }

  update(data: CommentUpdate['data']): void {
    Object.assign(this, data);
  }
}

export interface CommentActorDTO {
  id: number | string;
  name: string;
  pictureUrl?: string | null;
}

export interface CommentDTO {
  id: string | number;
  message: string;
  createdTime: Date | string | number;
  isHidden: boolean;
  actor: CommentActorDTO;
}

export interface CommentUpdate {
  commentId: Comment['id'];
  data: Partial<Pick<Comment, 'isHidden'>>;
}

export interface OperationResult {
  success: boolean;
}

export interface CommentUpdateResult extends CommentUpdate, OperationResult {
  error?: Error | null;
}

export interface CommentApi {
  getPostComments(
    pageId: string,
    postId: string,
    limit?: number
  ): Promise<CommentDTO[]>;
  updateComment(
    pageId: string,
    update: CommentUpdate
  ): Promise<OperationResult>;
  batchUpdateComments(
    pageId: string,
    updates: CommentUpdate[]
  ): Promise<CommentUpdateResult[]>;
}

import {
  AccountStatus,
  AccountDisableReason,
  AdEffectiveStatus,
  AdStatus,
  PageTask,
} from './enums';

export type User = {
  id: string;
  name: string;
  pictureUrl: string;
  accessToken: string;
};

export type Page = {
  id: string;
  name: string;
  accessToken: string;
  tasks: PageTask[];
};

export type UserCustomNames = {
  [userId: string]: string;
};

export type AdAccount = {
  id: string;
  accountId: string;
  name: string;
  status: AccountStatus;
  disableReason: AccountDisableReason;
  currency: string;
  spend: number;
};

export type Ad = {
  id: string;
  name: string;
  status: AdStatus;
  effectiveStatus: AdEffectiveStatus;
  deliveryStatus: string;
  reviewFeedback: {
    [definition: string]: string;
  };
  creativeBody: string;
  creativeThumbnailUrl: string;
  creativePagePostId: string;
  spend: number;
  stats?: {
    action: string;
    results: number;
    costPerResult: number;
  };
};

export type Comment = {
  id: string;
  message: string;
  permalinkUrl: string;
  isHidden: boolean;
  createdAt: string;
  from: {
    id: string;
    name: string;
    pictureUrl: string;
  };
};

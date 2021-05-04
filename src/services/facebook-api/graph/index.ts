import { UserGraphApi } from './user-grap-api';
import { adAccountGraphApi } from './ad-account-graph-api';
import { campaignGraphApi } from './campaign-graph-api';
import { adsetGraphApi } from './adset-graph-api';
import { adGraphApi } from './ad-graph-api';
import { CommentGraphApi } from './comment-graph-api';

export const user = new UserGraphApi();
export const adAccount = adAccountGraphApi;
export const campaign = campaignGraphApi;
export const adset = adsetGraphApi;
export const ad = adGraphApi;
export const comment = new CommentGraphApi();

import { UserGraphApi } from './user-grap-api';
import { AdAccountGraphApi } from './ad-account-graph-api';
import { CampaignGraphApi } from './campaign-graph-api';
import { AdsetGraphApi } from './adset-graph-api';
import { AdGraphApi } from './ad-graph-api';
import { CommentGraphApi } from './comment-graph-api';

export const user = new UserGraphApi();
export const adAccount = new AdAccountGraphApi();
export const campaign = new CampaignGraphApi();
export const adset = new AdsetGraphApi();
export const ad = new AdGraphApi();
export const comment = new CommentGraphApi();

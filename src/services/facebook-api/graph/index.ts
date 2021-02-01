import { UserGraphApi } from './user';
import { AdAccountGraphApi } from './ad-account';
import { CampaignGraphApi } from './campaign';
import { AdsetGraphApi } from './adset';
import { AdGraphApi } from './ad';

export const user = new UserGraphApi();
export const adAccount = new AdAccountGraphApi();
export const campaign = new CampaignGraphApi();
export const adset = new AdsetGraphApi();
export const ad = new AdGraphApi();

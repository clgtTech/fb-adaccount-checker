import * as mobx from 'mobx';
import { AdEffectiveStatus, Status } from '../../types';
import { AdAccount } from './ad-account';
import { Insights, InsightsDTO } from './insights';

export class AdCreative {
  readonly id: string;
  readonly effectiveObjectStoryId: string;
  readonly thumbnailUrl: string;
  readonly title?: string;
  readonly body?: string;

  constructor(adCreative: AdCreativeDTO) {
    this.id = '' + adCreative.id;
    this.effectiveObjectStoryId = adCreative.effectiveObjectStoryId;
    this.thumbnailUrl = adCreative.thumbnailUrl;
    this.title = adCreative.title;
    this.body = adCreative.body;
  }

  get pageId(): string {
    return this.effectiveObjectStoryId.split('_')[0] || '';
  }

  get postId(): string {
    return this.effectiveObjectStoryId.split('_')[1] || '';
  }
}

export class Ad {
  readonly id: string;
  readonly adAccountId: string;
  readonly campaignId: string;
  readonly adsetId: string;
  readonly effectiveStatus: AdEffectiveStatus;
  status: Status;
  name: string;
  readonly deliveryStatus?: string;
  readonly reviewFeedback?: Record<string, string>;
  readonly creative?: AdCreative;
  readonly insights?: Insights;

  constructor(ad: AdDTO) {
    mobx.makeAutoObservable(this);
    this.id = '' + ad.id;
    this.adAccountId = '' + ad.adAccountId;
    this.campaignId = '' + ad.campaignId;
    this.adsetId = '' + ad.adsetId;
    this.effectiveStatus = ad.effectiveStatus;
    this.status = ad.status;
    this.name = ad.name;
    this.deliveryStatus = ad.deliveryStatus;
    this.reviewFeedback = ad.reviewFeedback;
    this.creative = ad.creative && new AdCreative(ad.creative);
    this.insights = ad.insights && new Insights(ad.insights);
  }
}

export interface AdApi {
  getAdAccountAds(
    adAccountId: AdAccount['id'],
    limit?: number
  ): Promise<AdDTO[]>;
}

export interface AdDTO {
  id: number | string;
  adAccountId: number | string;
  campaignId: number | string;
  adsetId: number | string;
  effectiveStatus: AdEffectiveStatus;
  status: Status;
  name: string;
  deliveryStatus?: string;
  reviewFeedback?: Record<string, string>;
  creative?: AdCreativeDTO;
  insights?: InsightsDTO;
}

export interface AdCreativeDTO {
  id: number | string;
  effectiveObjectStoryId: string;
  thumbnailUrl: string;
  title?: string;
  body?: string;
}

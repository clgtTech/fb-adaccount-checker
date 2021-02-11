import * as mobx from 'mobx';
import { AdEffectiveStatus, OperationResult, Status } from '../../types';
import { AdAccount } from './ad-account';
import { Insights, InsightsDTO } from './insights';

export class AdCreative {
  readonly id: string;
  readonly pagePostId?: string;
  readonly thumbnailUrl: string;
  readonly title?: string;
  readonly body?: string;

  constructor(adCreative: AdCreativeDTO) {
    this.id = '' + adCreative.id;
    this.pagePostId = adCreative.pagePostId ?? undefined;
    this.thumbnailUrl = adCreative.thumbnailUrl;
    this.title = adCreative.title;
    this.body = adCreative.body;
  }

  get pageId(): string | undefined {
    return this.pagePostId ? this.pagePostId.split('_')[0] : undefined;
  }

  get postId(): string | undefined {
    return this.pagePostId ? this.pagePostId.split('_')[1] : undefined;
  }
}

export class Ad {
  private adApi: AdApi;

  readonly id: string;
  readonly adAccountId: string;
  readonly campaignId: string;
  readonly adsetId: string;
  readonly effectiveStatus: AdEffectiveStatus;
  readonly name: string;
  readonly deliveryStatus?: string;
  readonly reviewFeedback?: Record<string, string>;
  readonly creative?: AdCreative;
  readonly insights?: Insights;

  status: Status;
  isStatusUpdating: boolean = false;
  statusUpdateError: Error | null = null;

  constructor(ad: AdDTO, adApi: AdApi) {
    mobx.makeAutoObservable(this, {
      id: false,
      adAccountId: false,
      campaignId: false,
      adsetId: false,
      effectiveStatus: false,
      name: false,
      deliveryStatus: false,
      reviewFeedback: false,
      insights: false,
    });

    this.adApi = adApi;

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

  canUpdate(adAccount: AdAccount): boolean {
    return (
      adAccount.isAdRunningOrInReview() &&
      this.effectiveStatus !== AdEffectiveStatus.ARCHIVED &&
      this.effectiveStatus !== AdEffectiveStatus.DELETED
    );
  }

  async updateStatus(status: Status) {
    const oldStatus = this.status;

    this.isStatusUpdating = true;
    this.status = status;
    try {
      await this.adApi.updateAd(this.id, { status });
      mobx.runInAction(() => {
        this.statusUpdateError = null;
        this.isStatusUpdating = false;
      });
    } catch (e) {
      mobx.runInAction(() => {
        this.status = oldStatus;
        this.statusUpdateError = e;
        this.isStatusUpdating = false;
      });
    }
  }
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
  pagePostId?: string | null;
  thumbnailUrl: string;
  title?: string;
  body?: string;
}

export interface AdUpdate {
  adId: Ad['id'];
  data: {
    status?: Status;
  };
}

export interface AdApi {
  getAdAccountAds(
    adAccountId: AdAccount['id'],
    limit?: number
  ): Promise<AdDTO[]>;
  updateAd(id: Ad['id'], update: AdUpdate['data']): Promise<OperationResult>;
}

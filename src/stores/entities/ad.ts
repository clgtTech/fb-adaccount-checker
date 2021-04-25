import * as mobx from 'mobx';
import {
  AdEffectiveStatus,
  DatePreset,
  OperationResult,
  Status,
} from '../../types';
import { AdAccount } from './ad-account';
import { Insights, InsightsDTO } from './insights';
import { DeliveryStatus, DeliveryStatusDTO } from './delivery-status';

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
  readonly deliveryStatus?: DeliveryStatus;
  readonly effectiveStatus: AdEffectiveStatus;
  readonly name: string;
  readonly deliveryInfoStatus?: string;
  readonly reviewFeedback?: Record<string, string>;
  readonly creative?: AdCreative;

  status: Status;
  isStatusUpdating: boolean = false;
  statusUpdateError: Error | null = null;

  insights?: Insights;

  constructor(adDTO: AdDTO, adApi: AdApi) {
    mobx.makeAutoObservable(this, {
      id: false,
      adAccountId: false,
      campaignId: false,
      adsetId: false,
      effectiveStatus: false,
      name: false,
      deliveryInfoStatus: false,
      reviewFeedback: false,
    });

    this.adApi = adApi;

    this.id = '' + adDTO.id;
    this.adAccountId = '' + adDTO.adAccountId;
    this.campaignId = '' + adDTO.campaignId;
    this.adsetId = '' + adDTO.adsetId;
    this.deliveryStatus = adDTO.deliveryStatus
      ? new DeliveryStatus(adDTO.deliveryStatus)
      : undefined;
    this.effectiveStatus = adDTO.effectiveStatus;
    this.status = adDTO.status;
    this.name = adDTO.name;
    this.deliveryInfoStatus = adDTO.deliveryInfoStatus;
    this.reviewFeedback = adDTO.reviewFeedback;
    this.creative = adDTO.creative && new AdCreative(adDTO.creative);
    this.insights = adDTO.insights && new Insights(adDTO.insights);
  }

  setInsights(insights: AdDTO['insights']) {
    this.insights = insights ? new Insights(insights) : undefined;
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
  deliveryStatus?: DeliveryStatusDTO | null;
  effectiveStatus: AdEffectiveStatus;
  status: Status;
  name: string;
  deliveryInfoStatus?: string;
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
    params?: { insightsDatePreset?: DatePreset; limit?: number }
  ): Promise<AdDTO[]>;
  getAdAccountAdsInsights(
    adAccountId: AdAccount['id'],
    params?: { datePreset: DatePreset; limit?: number }
  ): Promise<Map<Ad['id'], InsightsDTO>>;
  updateAd(id: Ad['id'], update: AdUpdate['data']): Promise<OperationResult>;
}

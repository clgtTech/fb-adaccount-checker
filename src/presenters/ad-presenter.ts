import { AdAccount, Ad, AdCreative } from '../stores/entities';
import { Formatters } from '../services/intl';
import { InsightsPresenter } from './insights-presenter';
import { DeliveryStatusPresenter } from './delivery-status-presenter';

export interface DisapprovalReason {
  title: string;
  description: string;
}

export interface CreativePreview {
  thumbnailUrl: string;
  title?: string;
  description?: string;
  pagePostLink?: string;
}

export class AdPresenter {
  id: string;
  name: string;
  deliveryStatus?: DeliveryStatusPresenter;
  effectiveStatus: string;
  deliveryInfoStatus?: string;
  creativePreview?: CreativePreview;
  disapprovalReasons?: DisapprovalReason[];
  insights?: InsightsPresenter;

  constructor(ad: Ad, adAccount: AdAccount) {
    this.id = ad.id;
    this.name = ad.name;
    this.deliveryStatus = ad.deliveryStatus
      ? new DeliveryStatusPresenter(ad.deliveryStatus, 'ad')
      : undefined;
    this.effectiveStatus = Formatters.formatEnumValue(ad.effectiveStatus);
    this.deliveryInfoStatus = ad.deliveryInfoStatus
      ? Formatters.formatEnumValue(ad.deliveryInfoStatus)
      : undefined;
    this.creativePreview = ad.creative
      ? AdPresenter.creativeToCreativePreview(ad.creative)
      : undefined;
    this.disapprovalReasons = ad.reviewFeedback
      ? AdPresenter.reviewFeedbackToDisapprovalReasons(ad.reviewFeedback)
      : undefined;
    this.insights = ad.insights
      ? new InsightsPresenter(ad.insights, adAccount)
      : undefined;
  }

  static creativeToCreativePreview(adCreative: AdCreative): CreativePreview {
    return {
      thumbnailUrl: adCreative.thumbnailUrl,
      title: adCreative.title,
      description: adCreative.body,
      pagePostLink:
        adCreative.pageId && adCreative.postId
          ? `https://www.facebook.com/${adCreative.pageId}/posts/${adCreative.postId}`
          : undefined,
    };
  }

  static reviewFeedbackToDisapprovalReasons(
    rawReviewFeedback: Record<string, string>
  ): DisapprovalReason[] {
    return Object.entries(rawReviewFeedback).map(([key, description]) => {
      return {
        title: key,
        description: description
          .replace(/(See Details\.?|Подробнее\.?)$/i, '')
          .replace(/(\p{Ll})(\p{Lu})/gu, '$1. $2')
          .replace(/(\p{L}\.)(\p{L})/gu, '$1 $2'),
      };
    });
  }
}

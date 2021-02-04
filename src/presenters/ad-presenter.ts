import { AdAccount, Ad, AdCreative } from '../stores/entities';
import { Formatters } from '../services/intl';
import { InsightsPresenter } from './insights-presenter';

export interface DisapprovalReason {
  title: string;
  description: string;
}

export interface CreativePreview {
  postLink: string;
  thumbnailUrl: string;
  title?: string;
  description?: string;
}

export class AdPresenter {
  id: string;
  name: string;
  effectiveStatus: string;
  deliveryStatus?: string;
  creativePreview?: CreativePreview;
  disapprovalReasons?: DisapprovalReason[];
  insights?: InsightsPresenter;

  constructor(ad: Ad, adAccount: AdAccount) {
    this.id = ad.id;
    this.name = ad.name;
    this.effectiveStatus = ad.effectiveStatus.toUpperCase();
    this.deliveryStatus = ad.deliveryStatus
      ? Formatters.formatEnumValue(ad.deliveryStatus)
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
      postLink: `https://www.facebook.com/${adCreative.pageId}/posts/${adCreative.postId}`,
      thumbnailUrl: adCreative.thumbnailUrl,
      title: adCreative.title,
      description: adCreative.body,
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

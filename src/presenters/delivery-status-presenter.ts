import { DeliveryStatus } from '../stores/entities';
import { IntlFactory, DeliverySubstatusTexts } from '../services/intl';

type AdLevel = 'campaign' | 'adset' | 'ad';

export class DeliveryStatusPresenter {
  status: string;
  substatus?: string;

  constructor(deliveryStatus: DeliveryStatus, level: AdLevel) {
    this.status = deliveryStatus.status;
    this.substatus = deliveryStatus.substatus
      ? DeliveryStatusPresenter.getSubstatusText(
          deliveryStatus.substatus,
          level
        )
      : undefined;
  }

  static getSubstatusText(substatus: string, level: AdLevel) {
    switch (substatus) {
      case 'aaa_bid_limited':
        return IntlFactory._(DeliverySubstatusTexts.bidLimited);
      case 'account_closed':
        return IntlFactory._(DeliverySubstatusTexts.accountClosed);
      case 'account_disabled':
        return IntlFactory._(DeliverySubstatusTexts.accountDisabled);
      case 'account_needs_credit':
        return IntlFactory._(DeliverySubstatusTexts.accountError);
      case 'account_needs_tax_number':
        return IntlFactory._(DeliverySubstatusTexts.accountError);
      case 'account_spend_limit_reached':
        return IntlFactory._(DeliverySubstatusTexts.accountError);
      case 'active':
        return IntlFactory._(DeliverySubstatusTexts.active);
      case 'ad_limit_reached':
        return IntlFactory._(DeliverySubstatusTexts.adLimitReached);
      case 'ad_not_approved':
        return IntlFactory._(DeliverySubstatusTexts.adNotApproved);
      case 'ad_partial_active':
        return IntlFactory._(DeliverySubstatusTexts.active);
      case 'ad_set_affected_by_cbo_bid_strategy_change':
        return IntlFactory._(DeliverySubstatusTexts.notDelivering);
      case 'ad_set_completed':
        return IntlFactory._(DeliverySubstatusTexts.completed);
      case 'ad_set_holdout_learning_exit':
        return IntlFactory._(DeliverySubstatusTexts.active);
      case 'ad_set_in_learning_phase':
        return IntlFactory._(DeliverySubstatusTexts.learning);
      case 'ad_set_inconsistent_bid_strategy_in_cbo':
        return level === 'ad'
          ? IntlFactory._(DeliverySubstatusTexts.notDelivering)
          : IntlFactory._(DeliverySubstatusTexts.deliveryError);
      case 'ad_set_learning_exit_unsuccessfully':
        return IntlFactory._(DeliverySubstatusTexts.learningLimited);
      case 'ad_set_off':
        return IntlFactory._(DeliverySubstatusTexts.adSetOff);
      case 'ad_set_scheduled':
        return IntlFactory._(DeliverySubstatusTexts.scheduled);
      case 'ad_set_unsupported_event':
        return IntlFactory._(DeliverySubstatusTexts.unsupportedEvent);
      case 'ad_set_unsupported_event_dynamic_ads':
        return IntlFactory._(DeliverySubstatusTexts.unsupportedEvent);
      case 'ad_set_with_issues':
        return IntlFactory._(DeliverySubstatusTexts.deliveryError);
      case 'all_ad_sets_completed':
        return IntlFactory._(DeliverySubstatusTexts.completed);
      case 'all_ad_sets_in_error':
        return IntlFactory._(DeliverySubstatusTexts.allAdSetsInError);
      case 'all_ad_sets_in_updating_conversion_event':
        return IntlFactory._(DeliverySubstatusTexts.updatingEvents);
      case 'all_ads_in_error':
        return IntlFactory._(DeliverySubstatusTexts.allAdsInError);
      case 'all_ads_in_updating_conversion_event':
        return IntlFactory._(DeliverySubstatusTexts.updatingEvents);
      case 'archived':
        return IntlFactory._(DeliverySubstatusTexts.deleted);
      case 'auction_overlap_limited_learning_fail':
        return IntlFactory._(DeliverySubstatusTexts.learningLimited);
      case 'bid_limited':
        return IntlFactory._(DeliverySubstatusTexts.bidLimited);
      case 'bid_limited_learning_fail':
        return IntlFactory._(DeliverySubstatusTexts.learningLimited);
      case 'bid_limited_learning_success':
        return IntlFactory._(DeliverySubstatusTexts.bidLimited);
      case 'budget_limited_learning_fail':
        return IntlFactory._(DeliverySubstatusTexts.learningLimited);
      case 'campaign_inconsistent_bid_strategy_change':
        return IntlFactory._(DeliverySubstatusTexts.allAdSetsInError);
      case 'campaign_off':
        return IntlFactory._(DeliverySubstatusTexts.campaignOff);
      case 'campaign_with_issues':
        return IntlFactory._(DeliverySubstatusTexts.deliveryError);
      case 'completed':
        return IntlFactory._(DeliverySubstatusTexts.completed);
      case 'cost_limited_learning_fail':
        return IntlFactory._(DeliverySubstatusTexts.learningLimited);
      case 'cost_limited_learning_success':
        return IntlFactory._(DeliverySubstatusTexts.costLimited);
      case 'creative_fatigue':
        return IntlFactory._(DeliverySubstatusTexts.creativeFatigue);
      case 'deleted':
        return IntlFactory._(DeliverySubstatusTexts.deleted);
      case 'draft_validation_error':
        return IntlFactory._(DeliverySubstatusTexts.draftValidationError);
      case 'dynamic_ads_no_valid_items':
        return IntlFactory._(DeliverySubstatusTexts.dynamicAdsNoValidItems);
      case 'has_ad_creative_fatigue':
        return IntlFactory._(DeliverySubstatusTexts.creativeFatigue);
      case 'has_ad_in_review':
        return IntlFactory._(DeliverySubstatusTexts.inReview);
      case 'has_ad_set_scheduled':
        return IntlFactory._(DeliverySubstatusTexts.scheduled);
      case 'holdout_learning_exit':
        return IntlFactory._(DeliverySubstatusTexts.active);
      case 'in_draft':
        return IntlFactory._(DeliverySubstatusTexts.inDraft);
      case 'in_learning_phase':
        return IntlFactory._(DeliverySubstatusTexts.learning);
      case 'in_review':
        return IntlFactory._(DeliverySubstatusTexts.inReview);
      case 'invalid_iterative_split_test':
        return IntlFactory._(DeliverySubstatusTexts.invalidSplitTest);
      case 'invalid_split_test':
        return IntlFactory._(DeliverySubstatusTexts.invalidSplitTest);
      case 'ios_campaign_in_cooldown':
        return IntlFactory._(DeliverySubstatusTexts.iosCampaignInCooldown);
      case 'is_ad_farm_penalized':
        return IntlFactory._(DeliverySubstatusTexts.isAdFarmPenalized);
      case 'is_clickbait_penalized':
        return IntlFactory._(DeliverySubstatusTexts.lowQuality);
      case 'is_engagement_bait_penalized':
        return IntlFactory._(DeliverySubstatusTexts.lowQuality);
      case 'is_lqwe_penalized':
        return IntlFactory._(DeliverySubstatusTexts.isLqwePenalized);
      case 'is_sensationalism_penalized':
        return IntlFactory._(DeliverySubstatusTexts.lowQuality);
      case 'learning_exit_unsuccessfully':
        return IntlFactory._(DeliverySubstatusTexts.learningLimited);
      case 'mmp_conversion_bits_need_update':
        return IntlFactory._(DeliverySubstatusTexts.updatingEvents);
      case 'multi_all_ad_sets_off':
        return IntlFactory._(DeliverySubstatusTexts.multiAllAdSetsOff);
      case 'multi_all_ads_off':
        return IntlFactory._(DeliverySubstatusTexts.multiAllAdsOff);
      case 'no_active_ad':
        return IntlFactory._(DeliverySubstatusTexts.noActiveAd);
      case 'no_active_ad_set':
        return IntlFactory._(DeliverySubstatusTexts.noActiveAdSet);
      case 'no_ads':
        return IntlFactory._(DeliverySubstatusTexts.noAds);
      case 'off':
        return IntlFactory._(DeliverySubstatusTexts.off);
      case 'over_ios_campaign_limit':
        return IntlFactory._(DeliverySubstatusTexts.overIosCampaignLimit);
      case 'partial_active':
        return IntlFactory._(DeliverySubstatusTexts.active);
      case 'pending_process':
        return IntlFactory._(DeliverySubstatusTexts.pendingProcess);
      case 'reach_and_frequency_underdelivering_pacing_off_track':
        return IntlFactory._(DeliverySubstatusTexts.underDelivery);
      case 'reach_and_frequency_underdelivering_pacing_on_track':
        return IntlFactory._(DeliverySubstatusTexts.underDelivery);
      case 'scheduled':
        return IntlFactory._(DeliverySubstatusTexts.scheduled);
      case 'signal_diagnostic_issue':
        return IntlFactory._(DeliverySubstatusTexts.signalDiagnosticIssue);
      case 'single_all_ad_off':
        return IntlFactory._(DeliverySubstatusTexts.singleAllAdOff);
      case 'single_all_ad_set_off':
        return IntlFactory._(DeliverySubstatusTexts.singleAllAdSetOff);
      case 'soft_error_validation':
        return IntlFactory._(DeliverySubstatusTexts.softErrorValidation);
      case 'text_penalty':
        return IntlFactory._(DeliverySubstatusTexts.tooMuchText);
      case 'text_penalty_high':
        return IntlFactory._(DeliverySubstatusTexts.tooMuchText);
      case 'updating_conversion_event':
        return IntlFactory._(DeliverySubstatusTexts.updatingEvents);
      case 'with_issues':
        return IntlFactory._(DeliverySubstatusTexts.deliveryError);
      default:
        return substatus
          .split(/[_-]/)
          .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
    }
  }
}

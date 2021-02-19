import {
  BidStrategy,
  BuyingType,
  Objective,
  ActionType,
  CommentFilter,
  BudgetType,
  DatePreset,
} from '../../../types';
import { defineMessage } from 'react-intl';

export const BidStrategies = {
  [BidStrategy.LOWEST_COST_WITHOUT_CAP]: defineMessage({
    id: `enums.BidStrategy.LOWEST_COST_WITHOUT_CAP`,
    defaultMessage: `Lowest cost`,
  }),
  [BidStrategy.LOWEST_COST_WITH_BID_CAP]: defineMessage({
    id: `enums.BidStrategy.LOWEST_COST_WITH_BID_CAP`,
    defaultMessage: `Bid cap`,
  }),
  [BidStrategy.COST_CAP]: defineMessage({
    id: `enums.BidStrategy.COST_CAP`,
    defaultMessage: `Cost cap`,
  }),
  [BidStrategy.LOWEST_COST_WITH_MIN_ROAS]: defineMessage({
    id: `enums.BidStrategy.LOWEST_COST_WITH_MIN_ROAS`,
    defaultMessage: `Minimal ROAS`,
  }),
};

export const BuyingTypes = {
  [BuyingType.AUCTION]: defineMessage({
    id: `enums.BuyingType.AUCTION`,
    defaultMessage: `Auction`,
  }),
  [BuyingType.RESERVED]: defineMessage({
    id: `enums.BuyingType.RESERVED`,
    defaultMessage: `Reserved`,
  }),
};

export const Objectives = {
  [Objective.BRAND_AWARENESS]: defineMessage({
    id: `enums.Objective.BRAND_AWARENESS`,
    defaultMessage: `Brand awareness`,
  }),
  [Objective.REACH]: defineMessage({
    id: `enums.Objective.REACH`,
    defaultMessage: `Reach`,
  }),
  [Objective.LINK_CLICKS]: defineMessage({
    id: `enums.Objective.LINK_CLICKS`,
    defaultMessage: `Traffic`,
  }),
  [Objective.SOCIAL_INTERACTION]: defineMessage({
    id: `enums.Objective.SOCIAL_INTERACTION`,
    defaultMessage: `Engagement`,
  }),
  [Objective.APP_INSTALLS]: defineMessage({
    id: `enums.Objective.APP_INSTALLS`,
    defaultMessage: `App installs`,
  }),
  [Objective.VIDEO_VIEWS]: defineMessage({
    id: `enums.Objective.VIDEO_VIEWS`,
    defaultMessage: `Video views`,
  }),
  [Objective.LEAD_GENERATION]: defineMessage({
    id: `enums.Objective.LEAD_GENERATION`,
    defaultMessage: `Lead generation`,
  }),
  [Objective.MESSAGES]: defineMessage({
    id: `enums.Objective.MESSAGES`,
    defaultMessage: `Messages`,
  }),
  [Objective.CONVERSIONS]: defineMessage({
    id: `enums.Objective.CONVERSIONS`,
    defaultMessage: `Conversions`,
  }),
  [Objective.PRODUCT_CATALOG_SALES]: defineMessage({
    id: `enums.Objective.PRODUCT_CATALOG_SALES`,
    defaultMessage: `Catalog Sales`,
  }),
  [Objective.STORE_VISITS]: defineMessage({
    id: `enums.Objective.STORE_VISITS`,
    defaultMessage: `Store traffic`,
  }),
  [Objective.EVENT_RESPONSES]: defineMessage({
    id: `enums.Objective.EVENT_RESPONSES`,
    defaultMessage: `Event Responses`,
  }),
  [Objective.LOCAL_AWARENESS]: defineMessage({
    id: `enums.Objective.LOCAL_AWARENESS`,
    defaultMessage: `Local awareness`,
  }),
  [Objective.OFFER_CLAIMS]: defineMessage({
    id: `enums.Objective.OFFER_CLAIMS`,
    defaultMessage: `Offer claims`,
  }),
  [Objective.PAGE_LIKES]: defineMessage({
    id: `enums.Objective.PAGE_LIKES`,
    defaultMessage: `Page likes`,
  }),
  [Objective.POST_ENGAGEMENT]: defineMessage({
    id: `enums.Objective.POST_ENGAGEMENT`,
    defaultMessage: `Page post engagement`,
  }),
};

export const ActionTypes = {
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ACHIEVEMENT_UNLOCKED]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ACHIEVEMENT_UNLOCKED`,
    defaultMessage: `Mobile App Achievements Unlocked`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ACTIVATE_APP]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ACTIVATE_APP`,
    defaultMessage: `Mobile App Sessions`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_PAYMENT_INFO]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_PAYMENT_INFO`,
    defaultMessage: `Mobile App Adds of Payment Info`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_CART]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_CART`,
    defaultMessage: `Mobile App Adds to Cart`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_WISHLIST]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_WISHLIST`,
    defaultMessage: `Mobile App Adds to Wishlist`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_COMPLETE_REGISTRATION]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_COMPLETE_REGISTRATION`,
    defaultMessage: `Mobile App Registrations Completed`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_CONTENT_VIEW]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_CONTENT_VIEW`,
    defaultMessage: `Mobile App Content Views`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_INITIATED_CHECKOUT]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_INITIATED_CHECKOUT`,
    defaultMessage: `Mobile App Checkouts Initiated`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_LEVEL_ACHIEVED]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_LEVEL_ACHIEVED`,
    defaultMessage: `Mobile App Levels Completed`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_RATE]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_RATE`,
    defaultMessage: `Mobile App Ratings Submitted`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_SEARCH]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_SEARCH`,
    defaultMessage: `Mobile App Searches`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_SPENT_CREDITS]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_SPENT_CREDITS`,
    defaultMessage: `Mobile App Credits Spent`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_TUTORIAL_COMPLETION]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_FB_MOBILE_TUTORIAL_COMPLETION`,
    defaultMessage: `Mobile App Tutorials Completed`,
  }),
  [ActionType.APP_CUSTOM_EVENT_OTHER]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT_OTHER`,
    defaultMessage: `Other Mobile App Actions`,
  }),
  [ActionType.APP_INSTALL]: defineMessage({
    id: `enums.ActionType.APP_INSTALL`,
    defaultMessage: `Desktop App Installs`,
  }),
  [ActionType.APP_USE]: defineMessage({
    id: `enums.ActionType.APP_USE`,
    defaultMessage: `Desktop App Uses`,
  }),
  [ActionType.CHECKIN]: defineMessage({
    id: `enums.ActionType.CHECKIN`,
    defaultMessage: `Check-Ins`,
  }),
  [ActionType.POST_COMMENT]: defineMessage({
    id: `enums.ActionType.POST_COMMENT`,
    defaultMessage: `Post Comments`,
  }),
  [ActionType.CREDIT_SPENT]: defineMessage({
    id: `enums.ActionType.CREDIT_SPENT`,
    defaultMessage: `Desktop App Credit Spends`,
  }),
  [ActionType.GAME_PLAYS]: defineMessage({
    id: `enums.ActionType.GAME_PLAYS`,
    defaultMessage: `Game Plays`,
  }),
  [ActionType.LANDING_PAGE_VIEW]: defineMessage({
    id: `enums.ActionType.LANDING_PAGE_VIEW`,
    defaultMessage: `Landing Page Views`,
  }),
  [ActionType.LIKE]: defineMessage({
    id: `enums.ActionType.LIKE`,
    defaultMessage: `Page likes`,
  }),
  [ActionType.LINK_CLICK]: defineMessage({
    id: `enums.ActionType.LINK_CLICK`,
    defaultMessage: `Link Clicks`,
  }),
  [ActionType.MOBILE_APP_INSTALL]: defineMessage({
    id: `enums.ActionType.MOBILE_APP_INSTALL`,
    defaultMessage: `Mobile App Installs`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_PAYMENT_INFO]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_PAYMENT_INFO`,
    defaultMessage: `Offline Adds of Payment Info`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_CART]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_CART`,
    defaultMessage: `Offline Adds to Cart`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_WISHLIST]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_WISHLIST`,
    defaultMessage: `Offline Adds to Wishlist`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_COMPLETE_REGISTRATION]: defineMessage(
    {
      id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_COMPLETE_REGISTRATION`,
      defaultMessage: `Offline Registrations Completed`,
    }
  ),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_CUSTOM]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_CUSTOM`,
    defaultMessage: `Custom pixel events`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_INITIATE_CHECKOUT]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_INITIATE_CHECKOUT`,
    defaultMessage: `Website Checkouts Initiated`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_LEAD]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_LEAD`,
    defaultMessage: `Website Leads`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_PURCHASE]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_PURCHASE`,
    defaultMessage: `Website Purchases`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_SEARCH]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_SEARCH`,
    defaultMessage: `Website Searches`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_VIEW_CONTENT]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION_FB_PIXEL_VIEW_CONTENT`,
    defaultMessage: `Website Content Views`,
  }),
  [ActionType.ONSITE_CONVERSION_FLOW_COMPLETE]: defineMessage({
    id: `enums.ActionType.ONSITE_CONVERSION_FLOW_COMPLETE`,
    defaultMessage: `On-Facebook Workflow Completions`,
  }),
  [ActionType.ONSITE_CONVERSION_MESSAGING_BLOCK]: defineMessage({
    id: `enums.ActionType.ONSITE_CONVERSION_MESSAGING_BLOCK`,
    defaultMessage: `Blocked Messaging Connections`,
  }),
  [ActionType.ONSITE_CONVERSION_MESSAGING_CONVERSATION_STARTED_7D]: defineMessage(
    {
      id: `enums.ActionType.ONSITE_CONVERSION_MESSAGING_CONVERSATION_STARTED_7D`,
      defaultMessage: `Messaging Conversations Started`,
    }
  ),
  [ActionType.ONSITE_CONVERSION_MESSAGING_FIRST_REPLY]: defineMessage({
    id: `enums.ActionType.ONSITE_CONVERSION_MESSAGING_FIRST_REPLY`,
    defaultMessage: `New Messaging Connections`,
  }),
  [ActionType.ONSITE_CONVERSION_POST_SAVE]: defineMessage({
    id: `enums.ActionType.ONSITE_CONVERSION_POST_SAVE`,
    defaultMessage: `Post Saves`,
  }),
  [ActionType.ONSITE_CONVERSION_PURCHASE]: defineMessage({
    id: `enums.ActionType.ONSITE_CONVERSION_PURCHASE`,
    defaultMessage: `On-Facebook Purchases`,
  }),
  [ActionType.OUTBOUND_CLICK]: defineMessage({
    id: `enums.ActionType.OUTBOUND_CLICK`,
    defaultMessage: `Outbound Clicks`,
  }),
  [ActionType.PHOTO_VIEW]: defineMessage({
    id: `enums.ActionType.PHOTO_VIEW`,
    defaultMessage: `Photo Views`,
  }),
  [ActionType.POST]: defineMessage({
    id: `enums.ActionType.POST`,
    defaultMessage: `Post Shares`,
  }),
  [ActionType.POST_REACTION]: defineMessage({
    id: `enums.ActionType.POST_REACTION`,
    defaultMessage: `Post Reactions`,
  }),
  [ActionType.RSVP]: defineMessage({
    id: `enums.ActionType.RSVP`,
    defaultMessage: `Event Responses`,
  }),
  [ActionType.VIDEO_VIEW]: defineMessage({
    id: `enums.ActionType.VIDEO_VIEW`,
    defaultMessage: `3-Second Video Views`,
  }),
  [ActionType.PAGE_ENGAGEMENT]: defineMessage({
    id: `enums.ActionType.PAGE_ENGAGEMENT`,
    defaultMessage: `Page Engagements`,
  }),
  [ActionType.POST_ENGAGEMENT]: defineMessage({
    id: `enums.ActionType.POST_ENGAGEMENT`,
    defaultMessage: `Post Engagements`,
  }),
  [ActionType.OFFSITE_CONVERSION]: defineMessage({
    id: `enums.ActionType.OFFSITE_CONVERSION`,
    defaultMessage: `Website Conversions`,
  }),
  [ActionType.ONSITE_CONVERSION]: defineMessage({
    id: `enums.ActionType.ONSITE_CONVERSION`,
    defaultMessage: `On-Facebook Conversions`,
  }),
  [ActionType.APP_CUSTOM_EVENT]: defineMessage({
    id: `enums.ActionType.APP_CUSTOM_EVENT`,
    defaultMessage: `Mobile App Actions`,
  }),
  [ActionType.ADD_TO_CART]: defineMessage({
    id: `enums.ActionType.ADD_TO_CART`,
    defaultMessage: `Adds to Cart`,
  }),
  [ActionType.COMPLETE_REGISTRATION]: defineMessage({
    id: `enums.ActionType.COMPLETE_REGISTRATION`,
    defaultMessage: `Registrations Completed`,
  }),
  [ActionType.PURCHASE]: defineMessage({
    id: `enums.ActionType.PURCHASE`,
    defaultMessage: `Purchases`,
  }),
  [ActionType.ONSITE_CONVERSION_LEAD_GROUPED]: defineMessage({
    id: `enums.ActionType.ONSITE_CONVERSION_LEAD_GROUPED`,
    defaultMessage: `All On-Facebook Leads`,
  }),
  [ActionType.VIEW_CONTENT]: defineMessage({
    id: `enums.ActionType.VIEW_CONTENT`,
    defaultMessage: `Content Views`,
  }),
  [ActionType.INITIATE_CHECKOUT]: defineMessage({
    id: `enums.ActionType.INITIATE_CHECKOUT`,
    defaultMessage: `Checkouts Initiated`,
  }),
  [ActionType.ADD_PAYMENT_INFO]: defineMessage({
    id: `enums.ActionType.ADD_PAYMENT_INFO`,
    defaultMessage: `Adds of Payment Info`,
  }),
  [ActionType.ADD_TO_WISHLIST]: defineMessage({
    id: `enums.ActionType.ADD_TO_WISHLIST`,
    defaultMessage: `Adds to Wishlist`,
  }),
  [ActionType.LEAD]: defineMessage({
    id: `enums.ActionType.LEAD`,
    defaultMessage: `Leads`,
  }),
  [ActionType.LEADGEN_GROUPED]: defineMessage({
    id: `enums.ActionType.LEADGEN_GROUPED`,
    defaultMessage: `Leads (Form)`,
  }),
  [ActionType.OMNI_APP_INSTALL]: defineMessage({
    id: `enums.ActionType.OMNI_APP_INSTALL`,
    defaultMessage: `App Installs`,
  }),
  [ActionType.OMNI_PURCHASE]: defineMessage({
    id: `enums.ActionType.OMNI_PURCHASE`,
    defaultMessage: `Purchases`,
  }),
  [ActionType.OMNI_ADD_TO_CART]: defineMessage({
    id: `enums.ActionType.OMNI_ADD_TO_CART`,
    defaultMessage: `Adds to Cart`,
  }),
  [ActionType.OMNI_COMPLETE_REGISTRATION]: defineMessage({
    id: `enums.ActionType.OMNI_COMPLETE_REGISTRATION`,
    defaultMessage: `Registrations Completed`,
  }),
  [ActionType.OMNI_VIEW_CONTENT]: defineMessage({
    id: `enums.ActionType.OMNI_VIEW_CONTENT`,
    defaultMessage: `Content Views`,
  }),
  [ActionType.OMNI_SEARCH]: defineMessage({
    id: `enums.ActionType.OMNI_SEARCH`,
    defaultMessage: `Searches`,
  }),
  [ActionType.OMNI_INITIATED_CHECKOUT]: defineMessage({
    id: `enums.ActionType.OMNI_INITIATED_CHECKOUT`,
    defaultMessage: `Checkouts Initiated`,
  }),
  [ActionType.OMNI_ACHIEVEMENT_UNLOCKED]: defineMessage({
    id: `enums.ActionType.OMNI_ACHIEVEMENT_UNLOCKED`,
    defaultMessage: `Achievements Unlocked`,
  }),
  [ActionType.OMNI_ACTIVATE_APP]: defineMessage({
    id: `enums.ActionType.OMNI_ACTIVATE_APP`,
    defaultMessage: `App Activations`,
  }),
  [ActionType.OMNI_LEVEL_ACHIEVED]: defineMessage({
    id: `enums.ActionType.OMNI_LEVEL_ACHIEVED`,
    defaultMessage: `Levels Achieved`,
  }),
  [ActionType.OMNI_RATE]: defineMessage({
    id: `enums.ActionType.OMNI_RATE`,
    defaultMessage: `Ratings Submitted`,
  }),
  [ActionType.OMNI_SPEND_CREDITS]: defineMessage({
    id: `enums.ActionType.OMNI_SPEND_CREDITS`,
    defaultMessage: `Credit Spends`,
  }),
  [ActionType.OMNI_TUTORIAL_COMPLETION]: defineMessage({
    id: `enums.ActionType.OMNI_TUTORIAL_COMPLETION`,
    defaultMessage: `Tutorials Completed`,
  }),
  [ActionType.OMNI_CUSTOM]: defineMessage({
    id: `enums.ActionType.OMNI_CUSTOM`,
    defaultMessage: `Custom Events`,
  }),
  [ActionType.SUBSCRIBE]: defineMessage({
    id: `enums.ActionType.SUBSCRIBE`,
    defaultMessage: `Subscriptions`,
  }),
};

export const CommentFilters = {
  [CommentFilter.ALL]: defineMessage({
    id: 'enums.CommentFilter.ALL',
    defaultMessage: `All`,
  }),
  [CommentFilter.VISIBLE]: defineMessage({
    id: 'enums.CommentFilter.VISIBLE',
    defaultMessage: `Visible`,
  }),
  [CommentFilter.HIDDEN]: defineMessage({
    id: 'enums.CommentFilter.HIDDEN',
    defaultMessage: `Hidden`,
  }),
};

export const BudgetTypes = {
  [BudgetType.DAILY]: defineMessage({
    id: 'enums.BudgetType.DAILY',
    defaultMessage: `Daily`,
  }),
  [BudgetType.LIFETIME]: defineMessage({
    id: 'enums.BudgetType.LIFETIME',
    defaultMessage: `Lifetime`,
  }),
};

export const DatePresets = {
  [DatePreset.LIFETIME]: defineMessage({
    id: 'enums.DatePreset.LIFETIME',
    defaultMessage: `Lifetime`,
  }),
  [DatePreset.TODAY]: defineMessage({
    id: 'enums.DatePreset.TODAY',
    defaultMessage: `Today`,
  }),
  [DatePreset.YESTERDAY]: defineMessage({
    id: 'enums.DatePreset.YESTERDAY',
    defaultMessage: `Yesterday`,
  }),
  [DatePreset.LAST_3D]: defineMessage({
    id: 'enums.DatePreset.LAST_3D',
    defaultMessage: `Last 3 days`,
  }),
  [DatePreset.LAST_7D]: defineMessage({
    id: 'enums.DatePreset.LAST_7D',
    defaultMessage: `Last 7 days`,
  }),
  [DatePreset.LAST_14D]: defineMessage({
    id: 'enums.DatePreset.LAST_14D',
    defaultMessage: `Last 14 days`,
  }),
  [DatePreset.LAST_28D]: defineMessage({
    id: 'enums.DatePreset.LAST_28D',
    defaultMessage: `Last 28 days`,
  }),
  [DatePreset.LAST_30D]: defineMessage({
    id: 'enums.DatePreset.LAST_30D',
    defaultMessage: `Last 30 days`,
  }),
  [DatePreset.LAST_90D]: defineMessage({
    id: 'enums.DatePreset.LAST_90D',
    defaultMessage: `Last 90 days`,
  }),
  [DatePreset.THIS_WEEK_SUN_TODAY]: defineMessage({
    id: 'enums.DatePreset.THIS_WEEK_SUN_TODAY',
    defaultMessage: `This week`,
  }),
  [DatePreset.LAST_WEEK_SUN_SAT]: defineMessage({
    id: 'enums.DatePreset.LAST_WEEK_SUN_SAT',
    defaultMessage: `Last week`,
  }),
  [DatePreset.THIS_WEEK_MON_TODAY]: defineMessage({
    id: 'enums.DatePreset.THIS_WEEK_MON_TODAY',
    defaultMessage: `This week`,
  }),
  [DatePreset.LAST_WEEK_MON_SUN]: defineMessage({
    id: 'enums.DatePreset.LAST_WEEK_MON_SUN',
    defaultMessage: `Last week`,
  }),
  [DatePreset.THIS_MONTH]: defineMessage({
    id: 'enums.DatePreset.THIS_MONTH',
    defaultMessage: `This month`,
  }),
  [DatePreset.LAST_MONTH]: defineMessage({
    id: 'enums.DatePreset.LAST_MONTH',
    defaultMessage: `Last month`,
  }),
  [DatePreset.THIS_QUARTER]: defineMessage({
    id: 'enums.DatePreset.THIS_QUARTER',
    defaultMessage: `This quarter`,
  }),
  [DatePreset.LAST_QUARTER]: defineMessage({
    id: 'enums.DatePreset.LAST_QUARTER',
    defaultMessage: `Last quarter`,
  }),
  [DatePreset.THIS_YEAR]: defineMessage({
    id: 'enums.DatePreset.THIS_YEAR',
    defaultMessage: `This year`,
  }),
  [DatePreset.LAST_YEAR]: defineMessage({
    id: 'enums.DatePreset.LAST_YEAR',
    defaultMessage: `Last year`,
  }),
};

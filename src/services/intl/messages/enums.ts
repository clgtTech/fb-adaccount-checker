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

export const BidStrategyTexts = {
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

export const BuyingTypeTexts = {
  [BuyingType.AUCTION]: defineMessage({
    id: `enums.BuyingType.AUCTION`,
    defaultMessage: `Auction`,
  }),
  [BuyingType.RESERVED]: defineMessage({
    id: `enums.BuyingType.RESERVED`,
    defaultMessage: `Reserved`,
  }),
};

export const ObjectiveTexts = {
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

export const ActionTypeTexts = {
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
  [ActionType.CONTACT_TOTAL]: defineMessage({
    id: 'enums.ActionType.CONTACT_TOTAL',
    defaultMessage: `Contacts`,
  }),
  [ActionType.CONTACT_WEBSITE]: defineMessage({
    id: 'enums.ActionType.CONTACT_WEBSITE',
    defaultMessage: `Website Contacts`,
  }),
  [ActionType.CONTACT_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.CONTACT_MOBILE_APP',
    defaultMessage: `Mobile App Contacts`,
  }),
  [ActionType.CONTACT_OFFLINE]: defineMessage({
    id: 'enums.ActionType.CONTACT_OFFLINE',
    defaultMessage: `Offline Contacts`,
  }),
  [ActionType.CUSTOMIZE_PRODUCT_TOTAL]: defineMessage({
    id: 'enums.ActionType.CUSTOMIZE_PRODUCT_TOTAL',
    defaultMessage: `Products Customized`,
  }),
  [ActionType.CUSTOMIZE_PRODUCT_WEBSITE]: defineMessage({
    id: 'enums.ActionType.CUSTOMIZE_PRODUCT_WEBSITE',
    defaultMessage: `Website Products Customized`,
  }),
  [ActionType.CUSTOMIZE_PRODUCT_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.CUSTOMIZE_PRODUCT_MOBILE_APP',
    defaultMessage: `Mobile App Products Customized`,
  }),
  [ActionType.CUSTOMIZE_PRODUCT_OFFLINE]: defineMessage({
    id: 'enums.ActionType.CUSTOMIZE_PRODUCT_OFFLINE',
    defaultMessage: `Offline Products Customized`,
  }),
  [ActionType.DONATE_TOTAL]: defineMessage({
    id: 'enums.ActionType.DONATE_TOTAL',
    defaultMessage: `Donations`,
  }),
  [ActionType.DONATE_WEBSITE]: defineMessage({
    id: 'enums.ActionType.DONATE_WEBSITE',
    defaultMessage: `Website Donations`,
  }),
  [ActionType.DONATE_ON_FACEBOOK]: defineMessage({
    id: 'enums.ActionType.DONATE_ON_FACEBOOK',
    defaultMessage: `On Facebook Donations`,
  }),
  [ActionType.DONATE_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.DONATE_MOBILE_APP',
    defaultMessage: `Mobile App Donations`,
  }),
  [ActionType.DONATE_OFFLINE]: defineMessage({
    id: 'enums.ActionType.DONATE_OFFLINE',
    defaultMessage: `Offline Donations`,
  }),
  [ActionType.FIND_LOCATION_TOTAL]: defineMessage({
    id: 'enums.ActionType.FIND_LOCATION_TOTAL',
    defaultMessage: `Location Searches`,
  }),
  [ActionType.FIND_LOCATION_WEBSITE]: defineMessage({
    id: 'enums.ActionType.FIND_LOCATION_WEBSITE',
    defaultMessage: `Website Location Searches`,
  }),
  [ActionType.FIND_LOCATION_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.FIND_LOCATION_MOBILE_APP',
    defaultMessage: `Mobile App Location Searches`,
  }),
  [ActionType.FIND_LOCATION_OFFLINE]: defineMessage({
    id: 'enums.ActionType.FIND_LOCATION_OFFLINE',
    defaultMessage: `Offline Location Searches`,
  }),
  [ActionType.SCHEDULE_TOTAL]: defineMessage({
    id: 'enums.ActionType.SCHEDULE_TOTAL',
    defaultMessage: `Appointments Scheduled`,
  }),
  [ActionType.SCHEDULE_WEBSITE]: defineMessage({
    id: 'enums.ActionType.SCHEDULE_WEBSITE',
    defaultMessage: `Website Appointments Scheduled`,
  }),
  [ActionType.SCHEDULE_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.SCHEDULE_MOBILE_APP',
    defaultMessage: `Mobile App Appointments Scheduled`,
  }),
  [ActionType.SCHEDULE_OFFLINE]: defineMessage({
    id: 'enums.ActionType.SCHEDULE_OFFLINE',
    defaultMessage: `Offline Appointments Scheduled`,
  }),
  [ActionType.START_TRIAL_TOTAL]: defineMessage({
    id: 'enums.ActionType.START_TRIAL_TOTAL',
    defaultMessage: `Trials Started`,
  }),
  [ActionType.START_TRIAL_WEBSITE]: defineMessage({
    id: 'enums.ActionType.START_TRIAL_WEBSITE',
    defaultMessage: `Website Trials Started`,
  }),
  [ActionType.START_TRIAL_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.START_TRIAL_MOBILE_APP',
    defaultMessage: `Mobile App Trials Started`,
  }),
  [ActionType.START_TRIAL_OFFLINE]: defineMessage({
    id: 'enums.ActionType.START_TRIAL_OFFLINE',
    defaultMessage: `Offline Trials Started`,
  }),
  [ActionType.SUBMIT_APPLICATION_TOTAL]: defineMessage({
    id: 'enums.ActionType.SUBMIT_APPLICATION_TOTAL',
    defaultMessage: `Applications Submitted`,
  }),
  [ActionType.SUBMIT_APPLICATION_WEBSITE]: defineMessage({
    id: 'enums.ActionType.SUBMIT_APPLICATION_WEBSITE',
    defaultMessage: `Website Applications Submitted`,
  }),
  [ActionType.SUBMIT_APPLICATION_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.SUBMIT_APPLICATION_MOBILE_APP',
    defaultMessage: `Mobile App Applications Submitted`,
  }),
  [ActionType.SUBMIT_APPLICATION_OFFLINE]: defineMessage({
    id: 'enums.ActionType.SUBMIT_APPLICATION_OFFLINE',
    defaultMessage: `Offline Applications Submitted`,
  }),
  [ActionType.SUBMIT_APPLICATION_ON_FACEBOOK]: defineMessage({
    id: 'enums.ActionType.SUBMIT_APPLICATION_ON_FACEBOOK',
    defaultMessage: `On Facebook Applications Submitted`,
  }),
  [ActionType.SUBSCRIBE_TOTAL]: defineMessage({
    id: 'enums.ActionType.SUBSCRIBE_TOTAL',
    defaultMessage: `Subscriptions`,
  }),
  [ActionType.SUBSCRIBE_WEBSITE]: defineMessage({
    id: 'enums.ActionType.SUBSCRIBE_WEBSITE',
    defaultMessage: `Website Subscriptions`,
  }),
  [ActionType.SUBSCRIBE_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.SUBSCRIBE_MOBILE_APP',
    defaultMessage: `Mobile App Subscriptions`,
  }),
  [ActionType.SUBSCRIBE_OFFLINE]: defineMessage({
    id: 'enums.ActionType.SUBSCRIBE_OFFLINE',
    defaultMessage: `Offline Subscriptions`,
  }),
  [ActionType.RECURRING_SUBSCRIPTION_PAYMENT_TOTAL]: defineMessage({
    id: 'enums.ActionType.RECURRING_SUBSCRIPTION_PAYMENT_TOTAL',
    defaultMessage: `Recurring Subscription Payments`,
  }),
  [ActionType.RECURRING_SUBSCRIPTION_PAYMENT_WEBSITE]: defineMessage({
    id: 'enums.ActionType.RECURRING_SUBSCRIPTION_PAYMENT_WEBSITE',
    defaultMessage: `Website Recurring Subscription Payments`,
  }),
  [ActionType.RECURRING_SUBSCRIPTION_PAYMENT_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.RECURRING_SUBSCRIPTION_PAYMENT_MOBILE_APP',
    defaultMessage: `Mobile App Recurring Subscription Payments`,
  }),
  [ActionType.RECURRING_SUBSCRIPTION_PAYMENT_OFFLINE]: defineMessage({
    id: 'enums.ActionType.RECURRING_SUBSCRIPTION_PAYMENT_OFFLINE',
    defaultMessage: `Offline Mobile App Recurring Subscription Payments`,
  }),
  [ActionType.CANCEL_SUBSCRIPTION_TOTAL]: defineMessage({
    id: 'enums.ActionType.CANCEL_SUBSCRIPTION_TOTAL',
    defaultMessage: `Canceled Subscriptions`,
  }),
  [ActionType.CANCEL_SUBSCRIPTION_WEBSITE]: defineMessage({
    id: 'enums.ActionType.CANCEL_SUBSCRIPTION_WEBSITE',
    defaultMessage: `Website Canceled Subscriptions`,
  }),
  [ActionType.CANCEL_SUBSCRIPTION_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.CANCEL_SUBSCRIPTION_MOBILE_APP',
    defaultMessage: `Mobile App Canceled Subscriptions`,
  }),
  [ActionType.CANCEL_SUBSCRIPTION_OFFLINE]: defineMessage({
    id: 'enums.ActionType.CANCEL_SUBSCRIPTION_OFFLINE',
    defaultMessage: `Offline Canceled Subscriptions`,
  }),
  [ActionType.AD_CLICK_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.AD_CLICK_MOBILE_APP',
    defaultMessage: `In-App Ad Clicks`,
  }),
  [ActionType.AD_IMPRESSION_MOBILE_APP]: defineMessage({
    id: 'enums.ActionType.AD_IMPRESSION_MOBILE_APP',
    defaultMessage: `In-App Ad Impressions`,
  }),
  [ActionType.CLICK_TO_CALL_CALL_CONFIRM]: defineMessage({
    id: 'enums.ActionType.CLICK_TO_CALL_CALL_CONFIRM',
    defaultMessage: `Call Confirmation Clicks`,
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

export const CostPerActionTypeTexts = {
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ACHIEVEMENT_UNLOCKED]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_ACHIEVEMENT_UNLOCKED`,
    defaultMessage: `Cost per Mobile App Achievement Unlocked`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ACTIVATE_APP]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_ACTIVATE_APP`,
    defaultMessage: `Cost per Mobile App Session`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_PAYMENT_INFO]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_PAYMENT_INFO`,
    defaultMessage: `Cost per Mobile App Add of Payment Info`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_CART]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_CART`,
    defaultMessage: `Cost per Mobile App Add to Cart`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_WISHLIST]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_ADD_TO_WISHLIST`,
    defaultMessage: `Cost per Mobile App Add to Wishlist`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_COMPLETE_REGISTRATION]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_COMPLETE_REGISTRATION`,
    defaultMessage: `Cost per Mobile App Registration Completed`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_CONTENT_VIEW]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_CONTENT_VIEW`,
    defaultMessage: `Cost per Mobile App Content View`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_INITIATED_CHECKOUT]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_INITIATED_CHECKOUT`,
    defaultMessage: `Cost per Mobile App Checkout Initiated`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_LEVEL_ACHIEVED]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_LEVEL_ACHIEVED`,
    defaultMessage: `Cost per Mobile App Level Completed`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_RATE]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_RATE`,
    defaultMessage: `Cost per Mobile App Rating Submitted`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_SEARCH]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_SEARCH`,
    defaultMessage: `Cost per Mobile App Search`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_SPENT_CREDITS]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_SPENT_CREDITS`,
    defaultMessage: `Cost per Mobile App Credit Spend`,
  }),
  [ActionType.APP_CUSTOM_EVENT_FB_MOBILE_TUTORIAL_COMPLETION]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_FB_MOBILE_TUTORIAL_COMPLETION`,
    defaultMessage: `Cost per Mobile App Tutorial Completed`,
  }),
  [ActionType.APP_CUSTOM_EVENT_OTHER]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT_OTHER`,
    defaultMessage: `Cost per Other Mobile App Action`,
  }),
  [ActionType.APP_INSTALL]: defineMessage({
    id: `enums.CostPerActionType.APP_INSTALL`,
    defaultMessage: `Cost per Desktop App Install`,
  }),
  [ActionType.APP_USE]: defineMessage({
    id: `enums.CostPerActionType.APP_USE`,
    defaultMessage: `Cost per Desktop App Use`,
  }),
  [ActionType.CHECKIN]: defineMessage({
    id: `enums.CostPerActionType.CHECKIN`,
    defaultMessage: `Cost per Check-In`,
  }),
  [ActionType.POST_COMMENT]: defineMessage({
    id: `enums.CostPerActionType.POST_COMMENT`,
    defaultMessage: `Cost per Post Comment`,
  }),
  [ActionType.CREDIT_SPENT]: defineMessage({
    id: `enums.CostPerActionType.CREDIT_SPENT`,
    defaultMessage: `Cost per Desktop App Credit Spend`,
  }),
  [ActionType.GAME_PLAYS]: defineMessage({
    id: `enums.CostPerActionType.GAME_PLAYS`,
    defaultMessage: `Cost per Game Play`,
  }),
  [ActionType.LANDING_PAGE_VIEW]: defineMessage({
    id: `enums.CostPerActionType.LANDING_PAGE_VIEW`,
    defaultMessage: `Cost per Landing Page View`,
  }),
  [ActionType.LIKE]: defineMessage({
    id: `enums.CostPerActionType.LIKE`,
    defaultMessage: `Cost per Page like`,
  }),
  [ActionType.LINK_CLICK]: defineMessage({
    id: `enums.CostPerActionType.LINK_CLICK`,
    defaultMessage: `Cost per Link Click`,
  }),
  [ActionType.MOBILE_APP_INSTALL]: defineMessage({
    id: `enums.CostPerActionType.MOBILE_APP_INSTALL`,
    defaultMessage: `Cost per Mobile App Install`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_PAYMENT_INFO]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_PAYMENT_INFO`,
    defaultMessage: `Cost per Offline Add of Payment Info`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_CART]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_CART`,
    defaultMessage: `Cost per Offline Add to Cart`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_WISHLIST]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_ADD_TO_WISHLIST`,
    defaultMessage: `Cost per Offline Add to Wishlist`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_COMPLETE_REGISTRATION]: defineMessage(
    {
      id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_COMPLETE_REGISTRATION`,
      defaultMessage: `Cost per Offline Registration Completed`,
    }
  ),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_CUSTOM]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_CUSTOM`,
    defaultMessage: `Cost per Custom pixel event`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_INITIATE_CHECKOUT]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_INITIATE_CHECKOUT`,
    defaultMessage: `Cost per Website Checkout Initiated`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_LEAD]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_LEAD`,
    defaultMessage: `Cost per Website Lead`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_PURCHASE]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_PURCHASE`,
    defaultMessage: `Cost per Website Purchase`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_SEARCH]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_SEARCH`,
    defaultMessage: `Cost per Website Search`,
  }),
  [ActionType.OFFSITE_CONVERSION_FB_PIXEL_VIEW_CONTENT]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION_FB_PIXEL_VIEW_CONTENT`,
    defaultMessage: `Cost per Website Content View`,
  }),
  [ActionType.ONSITE_CONVERSION_FLOW_COMPLETE]: defineMessage({
    id: `enums.CostPerActionType.ONSITE_CONVERSION_FLOW_COMPLETE`,
    defaultMessage: `Cost per On-Facebook Workflow Completion`,
  }),
  [ActionType.ONSITE_CONVERSION_MESSAGING_BLOCK]: defineMessage({
    id: `enums.CostPerActionType.ONSITE_CONVERSION_MESSAGING_BLOCK`,
    defaultMessage: `Cost per Blocked Messaging Connection`,
  }),
  [ActionType.ONSITE_CONVERSION_MESSAGING_CONVERSATION_STARTED_7D]: defineMessage(
    {
      id: `enums.CostPerActionType.ONSITE_CONVERSION_MESSAGING_CONVERSATION_STARTED_7D`,
      defaultMessage: `Cost per Messaging Conversation Started`,
    }
  ),
  [ActionType.ONSITE_CONVERSION_MESSAGING_FIRST_REPLY]: defineMessage({
    id: `enums.CostPerActionType.ONSITE_CONVERSION_MESSAGING_FIRST_REPLY`,
    defaultMessage: `Cost per New Messaging Connection`,
  }),
  [ActionType.ONSITE_CONVERSION_POST_SAVE]: defineMessage({
    id: `enums.CostPerActionType.ONSITE_CONVERSION_POST_SAVE`,
    defaultMessage: `Cost per Post Save`,
  }),
  [ActionType.ONSITE_CONVERSION_PURCHASE]: defineMessage({
    id: `enums.CostPerActionType.ONSITE_CONVERSION_PURCHASE`,
    defaultMessage: `Cost per On-Facebook Purchase`,
  }),
  [ActionType.OUTBOUND_CLICK]: defineMessage({
    id: `enums.CostPerActionType.OUTBOUND_CLICK`,
    defaultMessage: `Cost per Outbound Click`,
  }),
  [ActionType.PHOTO_VIEW]: defineMessage({
    id: `enums.CostPerActionType.PHOTO_VIEW`,
    defaultMessage: `Cost per Photo View`,
  }),
  [ActionType.POST]: defineMessage({
    id: `enums.CostPerActionType.POST`,
    defaultMessage: `Cost per Post Share`,
  }),
  [ActionType.POST_REACTION]: defineMessage({
    id: `enums.CostPerActionType.POST_REACTION`,
    defaultMessage: `Cost per Post Reaction`,
  }),
  [ActionType.RSVP]: defineMessage({
    id: `enums.CostPerActionType.RSVP`,
    defaultMessage: `Cost per Event Response`,
  }),
  [ActionType.VIDEO_VIEW]: defineMessage({
    id: `enums.CostPerActionType.VIDEO_VIEW`,
    defaultMessage: `Cost per 3-Second Video View`,
  }),
  [ActionType.CONTACT_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.CONTACT_TOTAL',
    defaultMessage: `Cost per Contact`,
  }),
  [ActionType.CONTACT_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.CONTACT_WEBSITE',
    defaultMessage: `Cost per Website Contact`,
  }),
  [ActionType.CONTACT_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.CONTACT_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Contact`,
  }),
  [ActionType.CONTACT_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.CONTACT_OFFLINE',
    defaultMessage: `Cost per Offline Contact`,
  }),
  [ActionType.CUSTOMIZE_PRODUCT_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.CUSTOMIZE_PRODUCT_TOTAL',
    defaultMessage: `Cost per Customize Product`,
  }),
  [ActionType.CUSTOMIZE_PRODUCT_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.CUSTOMIZE_PRODUCT_WEBSITE',
    defaultMessage: `Cost per Website Customize Product`,
  }),
  [ActionType.CUSTOMIZE_PRODUCT_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.CUSTOMIZE_PRODUCT_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Customize Product`,
  }),
  [ActionType.CUSTOMIZE_PRODUCT_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.CUSTOMIZE_PRODUCT_OFFLINE',
    defaultMessage: `Cost per Offline Customize Product`,
  }),
  [ActionType.DONATE_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.DONATE_TOTAL',
    defaultMessage: `Cost per Donation`,
  }),
  [ActionType.DONATE_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.DONATE_WEBSITE',
    defaultMessage: `Cost per Website Donation`,
  }),
  [ActionType.DONATE_ON_FACEBOOK]: defineMessage({
    id: 'enums.CostPerActionType.DONATE_ON_FACEBOOK',
    defaultMessage: `Cost per On Facebook Donation`,
  }),
  [ActionType.DONATE_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.DONATE_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Donation`,
  }),
  [ActionType.DONATE_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.DONATE_OFFLINE',
    defaultMessage: `Cost per Offline Donation`,
  }),
  [ActionType.FIND_LOCATION_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.FIND_LOCATION_TOTAL',
    defaultMessage: `Cost per Find Location`,
  }),
  [ActionType.FIND_LOCATION_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.FIND_LOCATION_WEBSITE',
    defaultMessage: `Cost per Website Find Location`,
  }),
  [ActionType.FIND_LOCATION_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.FIND_LOCATION_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Find Location`,
  }),
  [ActionType.FIND_LOCATION_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.FIND_LOCATION_OFFLINE',
    defaultMessage: `Cost per Offline Find Location`,
  }),
  [ActionType.SCHEDULE_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.SCHEDULE_TOTAL',
    defaultMessage: `Cost per Schedule`,
  }),
  [ActionType.SCHEDULE_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.SCHEDULE_WEBSITE',
    defaultMessage: `Cost per Website Schedule`,
  }),
  [ActionType.SCHEDULE_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.SCHEDULE_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Schedule`,
  }),
  [ActionType.SCHEDULE_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.SCHEDULE_OFFLINE',
    defaultMessage: `Cost per Offline Schedule`,
  }),
  [ActionType.START_TRIAL_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.START_TRIAL_TOTAL',
    defaultMessage: `Cost per Start Trial`,
  }),
  [ActionType.START_TRIAL_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.START_TRIAL_WEBSITE',
    defaultMessage: `Cost per Website Start Trial`,
  }),
  [ActionType.START_TRIAL_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.START_TRIAL_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Start Trial`,
  }),
  [ActionType.START_TRIAL_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.START_TRIAL_OFFLINE',
    defaultMessage: `Cost per Offline Start Trial`,
  }),
  [ActionType.SUBMIT_APPLICATION_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.SUBMIT_APPLICATION_TOTAL',
    defaultMessage: `Cost per Submit Application`,
  }),
  [ActionType.SUBMIT_APPLICATION_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.SUBMIT_APPLICATION_WEBSITE',
    defaultMessage: `Cost per Website Submit Application`,
  }),
  [ActionType.SUBMIT_APPLICATION_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.SUBMIT_APPLICATION_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Submit Application`,
  }),
  [ActionType.SUBMIT_APPLICATION_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.SUBMIT_APPLICATION_OFFLINE',
    defaultMessage: `Cost per Offline Submit Application`,
  }),
  [ActionType.SUBMIT_APPLICATION_ON_FACEBOOK]: defineMessage({
    id: 'enums.CostPerActionType.SUBMIT_APPLICATION_ON_FACEBOOK',
    defaultMessage: `Cost per On Facebook Submit Application`,
  }),
  [ActionType.SUBSCRIBE_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.SUBSCRIBE_TOTAL',
    defaultMessage: `Cost per Subscription`,
  }),
  [ActionType.SUBSCRIBE_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.SUBSCRIBE_WEBSITE',
    defaultMessage: `Cost per Website Subscription`,
  }),
  [ActionType.SUBSCRIBE_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.SUBSCRIBE_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Subscription`,
  }),
  [ActionType.SUBSCRIBE_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.SUBSCRIBE_OFFLINE',
    defaultMessage: `Cost per Offline Subscription`,
  }),
  [ActionType.RECURRING_SUBSCRIPTION_PAYMENT_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.RECURRING_SUBSCRIPTION_PAYMENT_TOTAL',
    defaultMessage: `Cost per Recurring Subscription Payment`,
  }),
  [ActionType.RECURRING_SUBSCRIPTION_PAYMENT_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.RECURRING_SUBSCRIPTION_PAYMENT_WEBSITE',
    defaultMessage: `Cost per Website Recurring Subscription Payment`,
  }),
  [ActionType.RECURRING_SUBSCRIPTION_PAYMENT_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.RECURRING_SUBSCRIPTION_PAYMENT_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Recurring Subscription Payment`,
  }),
  [ActionType.RECURRING_SUBSCRIPTION_PAYMENT_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.RECURRING_SUBSCRIPTION_PAYMENT_OFFLINE',
    defaultMessage: `Cost per Offline Mobile App Recurring Subscription Payment`,
  }),
  [ActionType.CANCEL_SUBSCRIPTION_TOTAL]: defineMessage({
    id: 'enums.CostPerActionType.CANCEL_SUBSCRIPTION_TOTAL',
    defaultMessage: `Cost per Cancel Subscription`,
  }),
  [ActionType.CANCEL_SUBSCRIPTION_WEBSITE]: defineMessage({
    id: 'enums.CostPerActionType.CANCEL_SUBSCRIPTION_WEBSITE',
    defaultMessage: `Cost per Website Cancel Subscription`,
  }),
  [ActionType.CANCEL_SUBSCRIPTION_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.CANCEL_SUBSCRIPTION_MOBILE_APP',
    defaultMessage: `Cost per Mobile App Cancel Subscription`,
  }),
  [ActionType.CANCEL_SUBSCRIPTION_OFFLINE]: defineMessage({
    id: 'enums.CostPerActionType.CANCEL_SUBSCRIPTION_OFFLINE',
    defaultMessage: `Cost per Offline Cancel Subscription`,
  }),
  [ActionType.AD_CLICK_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.AD_CLICK_MOBILE_APP',
    defaultMessage: `Cost per In-App Ad Click`,
  }),
  [ActionType.AD_IMPRESSION_MOBILE_APP]: defineMessage({
    id: 'enums.CostPerActionType.AD_IMPRESSION_MOBILE_APP',
    defaultMessage: `Cost per 1,000 In-App Ad Impressions`,
  }),
  [ActionType.CLICK_TO_CALL_CALL_CONFIRM]: defineMessage({
    id: 'enums.CostPerActionType.CLICK_TO_CALL_CALL_CONFIRM',
    defaultMessage: `Cost per Call Confirmation Click`,
  }),
  [ActionType.PAGE_ENGAGEMENT]: defineMessage({
    id: `enums.CostPerActionType.PAGE_ENGAGEMENT`,
    defaultMessage: `Cost per Page Engagement`,
  }),
  [ActionType.POST_ENGAGEMENT]: defineMessage({
    id: `enums.CostPerActionType.POST_ENGAGEMENT`,
    defaultMessage: `Cost per Post Engagement`,
  }),
  [ActionType.OFFSITE_CONVERSION]: defineMessage({
    id: `enums.CostPerActionType.OFFSITE_CONVERSION`,
    defaultMessage: `Cost per Website Conversion`,
  }),
  [ActionType.ONSITE_CONVERSION]: defineMessage({
    id: `enums.CostPerActionType.ONSITE_CONVERSION`,
    defaultMessage: `Cost per On-Facebook Conversion`,
  }),
  [ActionType.APP_CUSTOM_EVENT]: defineMessage({
    id: `enums.CostPerActionType.APP_CUSTOM_EVENT`,
    defaultMessage: `Cost per Mobile App Action`,
  }),
  [ActionType.ADD_TO_CART]: defineMessage({
    id: `enums.CostPerActionType.ADD_TO_CART`,
    defaultMessage: `Cost per Add to Cart`,
  }),
  [ActionType.COMPLETE_REGISTRATION]: defineMessage({
    id: `enums.CostPerActionType.COMPLETE_REGISTRATION`,
    defaultMessage: `Cost per Registration Completed`,
  }),
  [ActionType.PURCHASE]: defineMessage({
    id: `enums.CostPerActionType.PURCHASE`,
    defaultMessage: `Cost per Purchase`,
  }),
  [ActionType.ONSITE_CONVERSION_LEAD_GROUPED]: defineMessage({
    id: `enums.CostPerActionType.ONSITE_CONVERSION_LEAD_GROUPED`,
    defaultMessage: `Cost per On-Facebook Lead`,
  }),
  [ActionType.VIEW_CONTENT]: defineMessage({
    id: `enums.CostPerActionType.VIEW_CONTENT`,
    defaultMessage: `Cost per Content View`,
  }),
  [ActionType.INITIATE_CHECKOUT]: defineMessage({
    id: `enums.CostPerActionType.INITIATE_CHECKOUT`,
    defaultMessage: `Cost per Checkout Initiated`,
  }),
  [ActionType.ADD_PAYMENT_INFO]: defineMessage({
    id: `enums.CostPerActionType.ADD_PAYMENT_INFO`,
    defaultMessage: `Cost per Add of Payment Info`,
  }),
  [ActionType.ADD_TO_WISHLIST]: defineMessage({
    id: `enums.CostPerActionType.ADD_TO_WISHLIST`,
    defaultMessage: `Cost per Add to Wishlist`,
  }),
  [ActionType.LEAD]: defineMessage({
    id: `enums.CostPerActionType.LEAD`,
    defaultMessage: `Cost per Lead`,
  }),
  [ActionType.LEADGEN_GROUPED]: defineMessage({
    id: `enums.CostPerActionType.LEADGEN_GROUPED`,
    defaultMessage: `Cost per Lead (Form)`,
  }),
  [ActionType.OMNI_APP_INSTALL]: defineMessage({
    id: `enums.CostPerActionType.OMNI_APP_INSTALL`,
    defaultMessage: `Cost per App Install`,
  }),
  [ActionType.OMNI_PURCHASE]: defineMessage({
    id: `enums.CostPerActionType.OMNI_PURCHASE`,
    defaultMessage: `Cost per Purchase`,
  }),
  [ActionType.OMNI_ADD_TO_CART]: defineMessage({
    id: `enums.CostPerActionType.OMNI_ADD_TO_CART`,
    defaultMessage: `Cost per Add to Cart`,
  }),
  [ActionType.OMNI_COMPLETE_REGISTRATION]: defineMessage({
    id: `enums.CostPerActionType.OMNI_COMPLETE_REGISTRATION`,
    defaultMessage: `Cost per Registration Completed`,
  }),
  [ActionType.OMNI_VIEW_CONTENT]: defineMessage({
    id: `enums.CostPerActionType.OMNI_VIEW_CONTENT`,
    defaultMessage: `Cost per Content View`,
  }),
  [ActionType.OMNI_SEARCH]: defineMessage({
    id: `enums.CostPerActionType.OMNI_SEARCH`,
    defaultMessage: `Cost per Search`,
  }),
  [ActionType.OMNI_INITIATED_CHECKOUT]: defineMessage({
    id: `enums.CostPerActionType.OMNI_INITIATED_CHECKOUT`,
    defaultMessage: `Cost per Checkout Initiated`,
  }),
  [ActionType.OMNI_ACHIEVEMENT_UNLOCKED]: defineMessage({
    id: `enums.CostPerActionType.OMNI_ACHIEVEMENT_UNLOCKED`,
    defaultMessage: `Cost per Achievement Unlocked`,
  }),
  [ActionType.OMNI_ACTIVATE_APP]: defineMessage({
    id: `enums.CostPerActionType.OMNI_ACTIVATE_APP`,
    defaultMessage: `Cost per App Activation`,
  }),
  [ActionType.OMNI_LEVEL_ACHIEVED]: defineMessage({
    id: `enums.CostPerActionType.OMNI_LEVEL_ACHIEVED`,
    defaultMessage: `Cost per Level Achieved`,
  }),
  [ActionType.OMNI_RATE]: defineMessage({
    id: `enums.CostPerActionType.OMNI_RATE`,
    defaultMessage: `Cost per Rating Submitted`,
  }),
  [ActionType.OMNI_SPEND_CREDITS]: defineMessage({
    id: `enums.CostPerActionType.OMNI_SPEND_CREDITS`,
    defaultMessage: `Cost per Credit Spend`,
  }),
  [ActionType.OMNI_TUTORIAL_COMPLETION]: defineMessage({
    id: `enums.CostPerActionType.OMNI_TUTORIAL_COMPLETION`,
    defaultMessage: `Cost per Tutorial Completed`,
  }),
  [ActionType.OMNI_CUSTOM]: defineMessage({
    id: `enums.CostPerActionType.OMNI_CUSTOM`,
    defaultMessage: `Cost per Custom Event`,
  }),
  [ActionType.SUBSCRIBE]: defineMessage({
    id: `enums.CostPerActionType.SUBSCRIBE`,
    defaultMessage: `Cost per Subscription`,
  }),
};

export const CommentFilterTexts = {
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

export const BudgetTypeTexts = {
  [BudgetType.DAILY]: defineMessage({
    id: 'enums.BudgetType.DAILY',
    defaultMessage: `Daily`,
  }),
  [BudgetType.LIFETIME]: defineMessage({
    id: 'enums.BudgetType.LIFETIME',
    defaultMessage: `Lifetime`,
  }),
};

export const DatePresetTexts = {
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

export const EnumTexts = {
  BidStrategy: BidStrategyTexts,
  BuyingType: BuyingTypeTexts,
  Objective: ObjectiveTexts,
  ActionType: ActionTypeTexts,
  CostPerActionType: CostPerActionTypeTexts,
  CommentFilter: CommentFilterTexts,
  BudgetType: BudgetTypeTexts,
  DatePreset: DatePresetTexts,
};
